import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    port: 3501,
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: "./build",
  },
});
