import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const DEFAULT_PORT = 3005;
const OUT_DIR = path.resolve(process.cwd(), "out");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

if (!fs.existsSync(OUT_DIR)) {
  console.error("Error: The 'out' directory does not exist. Please run 'pnpm build' first.");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split("?")[0]);
  if (reqPath === "/") reqPath = "/index.html";

  let filePath = path.join(OUT_DIR, reqPath);
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + ".html")) {
    filePath += ".html";
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Content-Length": stat.size,
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // Fallback to 404.html if available
    const notFoundPath = path.join(OUT_DIR, "404.html");
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      fs.createReadStream(notFoundPath).pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  }
});

server.listen(DEFAULT_PORT, () => {
  console.log(`\n======================================================`);
  console.log(`✓ Static export production server running at:`);
  console.log(`  http://localhost:${DEFAULT_PORT}`);
  console.log(`======================================================\n`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${DEFAULT_PORT} in use, trying port ${DEFAULT_PORT + 1}...`);
    server.listen(DEFAULT_PORT + 1);
  } else {
    console.error("Server error:", err);
  }
});
