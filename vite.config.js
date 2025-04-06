import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compress from "vite-plugin-compress";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compress({
      // Enable Brotli compression for modern browsers
      brotli: true,
      // Enable Gzip compression for fallback
      gzip: true,
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // FastAPI server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    // Minify JS, CSS, and HTML during production build
    minify: "esbuild", // Default minification with esbuild
    // Split code into smaller chunks to optimize bundle size
    chunkSizeWarningLimit: 500, // Adjust to your bundle size preferences
    // Enable tree shaking for unused code elimination
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Example: Split libraries into separate chunks
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  // Add the `css` configuration for better performance in production
  css: {
    // Enable CSS minification
    minify: true,
  },
});
