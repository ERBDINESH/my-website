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

function resolveStaticFilePath(outDir, urlPath) {
  let reqPath = decodeURI(urlPath.split("?")[0]);
  if (reqPath === "/") reqPath = "/index.html";

  let targetPath = path.join(outDir, reqPath);

  // 1. Direct file match
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
    return targetPath;
  }

  // 2. Exact file with .html appended (e.g. /projects/launchproof -> /projects/launchproof.html)
  if (fs.existsSync(targetPath + ".html") && fs.statSync(targetPath + ".html").isFile()) {
    return targetPath + ".html";
  }

  // 3. Directory with index.html (e.g. /projects/launchproof/ -> /projects/launchproof/index.html)
  const indexPath = path.join(targetPath, "index.html");
  if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
    return indexPath;
  }

  // 4. Clean URL trailing slash handling (e.g. /projects/launchproof/ -> /projects/launchproof.html)
  if (reqPath.endsWith("/")) {
    const strippedPath = path.join(outDir, reqPath.slice(0, -1));
    if (fs.existsSync(strippedPath + ".html") && fs.statSync(strippedPath + ".html").isFile()) {
      return strippedPath + ".html";
    }
  }

  return null;
}

const server = http.createServer((req, res) => {
  const filePath = resolveStaticFilePath(OUT_DIR, req.url);

  if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
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

let currentPort = DEFAULT_PORT;

function startListening(port) {
  server.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`✓ Next.js Static Export Production Preview Running`);
    console.log(`  Root:             http://localhost:${port}`);
    console.log(`  LaunchProof:      http://localhost:${port}/projects/launchproof`);
    console.log(`  Personal AI Agent: http://localhost:${port}/projects/personal-ai-agent`);
    console.log(`  Resume PDF:       http://localhost:${port}/Dineshbabu-Elumalai-Resume.pdf`);
    console.log(`======================================================\n`);
  });
}

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    currentPort += 1;
    console.log(`Port in use, trying http://localhost:${currentPort}...`);
    startListening(currentPort);
  } else {
    console.error("Server error:", err);
  }
});

startListening(currentPort);
