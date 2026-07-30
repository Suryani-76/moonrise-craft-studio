import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";
import { handleVideoUpload, handleVideoDelete } from "./src/lib/video-api";

function webResponseToNode(res: ServerResponse, webRes: Response): void {
  res.writeHead(webRes.status, Object.fromEntries(webRes.headers.entries()));
  webRes.text().then((text) => res.end(text));
}

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function nodeReqToWeb(req: IncomingMessage, body: Buffer): Request {
  const host = req.headers.host ?? "localhost";
  const url = new URL(req.url ?? "/", `http://${host}`);
  return new Request(url.toString(), {
    method: req.method,
    headers: req.headers as Record<string, string>,
    body: body.length > 0 ? body : null,
  });
}

function videoApiPlugin() {
  return {
    name: "video-api",
    configureServer(server: import("vite").ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/upload-video" && req.method === "POST") {
          const body = await readBody(req);
          const webRes = await handleVideoUpload(nodeReqToWeb(req, body));
          webResponseToNode(res, webRes);
          return;
        }
        if (req.url === "/api/delete-video" && req.method === "POST") {
          const body = await readBody(req);
          const webRes = await handleVideoDelete(nodeReqToWeb(req, body));
          webResponseToNode(res, webRes);
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    videoApiPlugin(),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
  ],
});

