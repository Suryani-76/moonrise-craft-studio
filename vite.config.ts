import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlify from "@netlify/vite-plugin-tanstack-start";
import path from "path";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";

const VIDEOS_DIR = path.join(process.cwd(), "public", "videos");
const AWARDS_IMG_DIR = path.join(process.cwd(), "public", "awards");

/** Helper: parse a multipart body and return { filename, fileBuffer } for a given fieldName */
async function parseMultipart(req: import("http").IncomingMessage, fieldName: string) {
  const chunks: Buffer[] = [];
  await new Promise<void>((resolve, reject) => {
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", resolve);
    req.on("error", reject);
  });
  const body = Buffer.concat(chunks);
  const ct = (req.headers["content-type"] as string) ?? "";
  const bm = ct.match(/boundary=(.+)$/);
  if (!bm) return null;
  const sep = Buffer.from(`--${bm[1]}`);
  const parts: Buffer[] = [];
  let start = 0;
  for (let i = 0; i <= body.length - sep.length; i++) {
    if (body.subarray(i, i + sep.length).equals(sep)) {
      if (start > 0) parts.push(body.subarray(start, i - 2));
      start = i + sep.length + 2;
    }
  }
  for (const part of parts) {
    const he = part.indexOf("\r\n\r\n");
    if (he === -1) continue;
    const header = part.subarray(0, he).toString();
    const data = part.subarray(he + 4);
    if (header.includes(`name="${fieldName}"`) && header.includes("filename=")) {
      const fnMatch = header.match(/filename="([^"]+)"/);
      const rawName = fnMatch ? fnMatch[1] : "file";
      const ext = rawName.split(".").pop()?.toLowerCase() ?? "jpg";
      const safe = rawName.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_\- ]/g, "").trim().replace(/\s+/g, "_").slice(0, 60);
      return { filename: `${Date.now()}_${safe}.${ext}`, fileBuffer: data };
    }
  }
  return null;
}

/** Vite plugin that registers /api/upload-video, /api/delete-video, /api/upload-award-image, /api/delete-award-image */
function videoApiPlugin() {
  return {
    name: "video-api",
    configureServer(server: import("vite").ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        /* ── POST /api/upload-video ── */
        if (req.method === "POST" && req.url === "/api/upload-video") {
          try {
            if (!existsSync(VIDEOS_DIR)) await mkdir(VIDEOS_DIR, { recursive: true });
            const result = await parseMultipart(req, "video");
            if (!result) { res.writeHead(400); res.end(JSON.stringify({ error: "No file found" })); return; }
            await writeFile(path.join(VIDEOS_DIR, result.filename), result.fileBuffer);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ path: `/videos/${result.filename}`, filename: result.filename }));
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

        /* ── POST /api/upload-award-image ── */
        if (req.method === "POST" && req.url === "/api/upload-award-image") {
          try {
            if (!existsSync(AWARDS_IMG_DIR)) await mkdir(AWARDS_IMG_DIR, { recursive: true });
            const result = await parseMultipart(req, "image");
            if (!result) { res.writeHead(400); res.end(JSON.stringify({ error: "No file found" })); return; }
            await writeFile(path.join(AWARDS_IMG_DIR, result.filename), result.fileBuffer);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ path: `/awards/${result.filename}`, filename: result.filename }));
          } catch (err) {
            console.error("Award image upload error:", err);
            res.writeHead(500); res.end(JSON.stringify({ error: "Upload failed" }));
          }
          return;
        }

        /* ── POST /api/delete-award-image ── */
        if (req.method === "POST" && req.url === "/api/delete-award-image") {
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
              const fp = path.join(AWARDS_IMG_DIR, safe);
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
    netlify(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

