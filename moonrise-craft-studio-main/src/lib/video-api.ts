import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const VIDEOS_DIR = path.join(process.cwd(), "public", "videos");

export async function handleVideoUpload(request: Request): Promise<Response> {
  try {
    if (!existsSync(VIDEOS_DIR)) await mkdir(VIDEOS_DIR, { recursive: true });

    const body = Buffer.from(await request.arrayBuffer());

    const ct = request.headers.get("content-type") ?? "";
    const bm = ct.match(/boundary=(.+)$/);
    if (!bm) return new Response(JSON.stringify({ error: "No boundary" }), { status: 400, headers: { "content-type": "application/json" } });
    const boundary = bm[1];

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

    if (!fileBuffer || !filename) return new Response(JSON.stringify({ error: "No file found" }), { status: 400, headers: { "content-type": "application/json" } });

    await writeFile(path.join(VIDEOS_DIR, filename), fileBuffer);
    return new Response(JSON.stringify({ path: `/videos/${filename}`, filename }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: "Upload failed" }), { status: 500, headers: { "content-type": "application/json" } });
  }
}

export async function handleVideoDelete(request: Request): Promise<Response> {
  try {
    const { filename } = (await request.json()) as { filename?: string };
    if (filename) {
      const safe = filename.replace(/[^a-zA-Z0-9_\-. ]/g, "");
      const fp = path.join(VIDEOS_DIR, safe);
      if (existsSync(fp)) await unlink(fp);
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("Delete error:", err);
    return new Response(JSON.stringify({ error: "Delete failed" }), { status: 500, headers: { "content-type": "application/json" } });
  }
}

export function isVideoApiRoute(pathname: string): boolean {
  return pathname === "/api/upload-video" || pathname === "/api/delete-video";
}
