import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import { handleCatalogApi } from "./server/catalog-api.mjs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "duman-api-dev",
      configureServer(server) {
        server.middlewares.use(async (request, response, next) => {
          if (!(request.url ?? "").startsWith("/api/")) {
            next();
            return;
          }

          await handleCatalogApi(request, response);
        });
      }
    }
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
