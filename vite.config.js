import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  preview:{
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: process.env.API_BASE_URL || "http://localhost:8080",
        changeOrigin: true,
      },
    }
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: process.env.API_BASE_URL || "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@utils": "/src/utils",
    },
  },
  plugins: [react()],
});
