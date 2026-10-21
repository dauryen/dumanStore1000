import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { handleCatalogApi } from "./server/catalog-api.mjs";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const distDir = join(rootDir, "dist");
const publicDir = join(rootDir, "public");
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

async function serveFile(response, filePath) {
  const extension = extname(filePath).toLowerCase();
  response.writeHead(200, {
    "Content-Type": mimeTypes[extension] ?? "application/octet-stream"
  });
  createReadStream(filePath).pipe(response);
}

async function resolveStaticFile(urlPath) {
  const cleanPath = urlPath === "/" ? "/index.html" : urlPath;
  const normalizedPath = normalize(cleanPath).replace(/^([.][.][/\\])+/, "");
  const distPath = resolve(distDir, `.${normalizedPath}`);
  if (distPath.startsWith(distDir) && existsSync(distPath) && (await stat(distPath)).isFile()) {
    return distPath;
  }

  const publicPath = resolve(publicDir, `.${normalizedPath}`);
  if (publicPath.startsWith(publicDir) && existsSync(publicPath) && (await stat(publicPath)).isFile()) {
    return publicPath;
  }

  return null;
}

const server = createServer(async (request, response) => {
  if (await handleCatalogApi(request, response)) {
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Method not allowed.");
    return;
  }

  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "127.0.0.1"}`);
  const filePath = await resolveStaticFile(url.pathname);

  if (filePath) {
    await serveFile(response, filePath);
    return;
  }

  const indexPath = join(distDir, "index.html");
  if (existsSync(indexPath)) {
    await serveFile(response, indexPath);
    return;
  }

  response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Build output not found. Run npm run build first.");
});

server.listen(port, () => {
  console.log(`Duman server running on http://127.0.0.1:${port}`);
});
