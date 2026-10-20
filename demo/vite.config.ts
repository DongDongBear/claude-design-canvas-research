import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  server: { host: "127.0.0.1", port: 5173, strictPort: true },
  build: {
    rolldownOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        guest: fileURLToPath(new URL("./guest.html", import.meta.url)),
      },
    },
  },
  test: { environment: "jsdom", include: ["src/**/*.test.ts"] },
});
