import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";

const VIDEOS_DIR = path.join(process.cwd(), "public", "videos");

/** Vite plugin that registers /api/upload-video and /api/delete-video */
function videoApiPlugin() {
  return {
    name: "video-api",
    configureServer(server: import("vite").ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        /* ── POST /api/upload-video ── */
        if (req.method === "POST" && req.url === "/api/upload-video") {
          try {
            if (!existsSync(VIDEOS_DIR)) await mkdir(VIDEOS_DIR, { recursive: true });

            const chunks: Buffer[] = [];
            await new Promise<void>((resolve, reject) => {
              req.on("data", (c: Buffer) => chunks.push(c));
              req.on("end", resolve);
              req.on("error", reject);
            });
            const body = Buffer.concat(chunks);

            // Parse multipart boundary from Content-Type header
            const ct = (req.headers["content-type"] as string) ?? "";
            const bm = ct.match(/boundary=(.+)$/);
            if (!bm) { res.writeHead(400); res.end(JSON.stringify({ error: "No boundary" })); return; }
            const boundary = bm[1];

            // Split parts
            const sep = Buffer.from(`--${boundary}`);
            const parts: Buffer[] = [];
            let start = 0;
            for (let i = 0; i <= body.length - sep.length; i++) {
              if (body.subarray(i, i + sep.length).equals(sep)) {
                if (start > 0) parts.push(body.subarray(start, i - 2));
                start = i + sep.length + 2;
              }
            }

            let filename = "";
            let fileBuffer: Buffer | null = null;

            for (const part of parts) {
              const headerEnd = part.indexOf("\r\n\r\n");
              if (headerEnd === -1) continue;
              const header = part.subarray(0, headerEnd).toString();
              const data = part.subarray(headerEnd + 4);
              if (header.includes('name="video"') && header.includes("filename=")) {
                const fnMatch = header.match(/filename="([^"]+)"/);
                const rawName = fnMatch ? fnMatch[1] : "video.mp4";
                const ext = rawName.split(".").pop()?.toLowerCase() ?? "mp4";
                const safe = rawName.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_\- ]/g, "").trim().replace(/\s+/g, "_").slice(0, 60);
                filename = `${Date.now()}_${safe}.${ext}`;
                fileBuffer = data;
              }
            }

            if (!fileBuffer || !filename) { res.writeHead(400); res.end(JSON.stringify({ error: "No file found" })); return; }

            await writeFile(path.join(VIDEOS_DIR, filename), fileBuffer);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ path: `/videos/${filename}`, filename }));
          } catch (err) {
            console.error("Upload error:", err);
            res.writeHead(500); res.end(JSON.stringify({ error: "Upload failed" }));
          }
          return;
        }

        /* ── POST /api/delete-video ── */
        if (req.method === "POST" && req.url === "/api/delete-video") {
          try {
            const chunks: Buffer[] = [];
            await new Promise<void>((resolve, reject) => {
              req.on("data", (c: Buffer) => chunks.push(c));
              req.on("end", resolve);
              req.on("error", reject);
            });
            const { filename } = JSON.parse(Buffer.concat(chunks).toString()) as { filename?: string };
            if (filename) {
              const safe = filename.replace(/[^a-zA-Z0-9_\-. ]/g, "");
              const fp = path.join(VIDEOS_DIR, safe);
              if (existsSync(fp)) await unlink(fp);
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            console.error("Delete error:", err);
            res.writeHead(500); res.end(JSON.stringify({ error: "Delete failed" }));
          }
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    videoApiPlugin(),
    tsconfigPaths(),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

