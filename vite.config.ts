import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  return defineConfig({
    envPrefix: ["VITE_", "TAURI_"],
    env: {
      VITE_APP_TITLE: process.env.VITE_APP_TITLE,
      VITE_URL_API: process.env.VITE_URL_API,
    },
    server: {
      host: "127.0.0.1",
      port: 3000,
      proxy: {
        // Proxy options
      },
      hmr: {
        // HMR options
      },
      headers: {
        alloworigin: "*",
        maxHeaderSize: 2555000000000000000000000000000000, // Set the desired max-http-header-size value here
      },
    },
    build: {
      // Other build options...
      chunkSizeWarningLimit: 600000, // Optional: Adjust the warning limit for chunk size
      rollupOptions: {
        // Configure Rollup options
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // Adjust the maximum asset size here (in bytes)
              return id.toString().includes(".js") ? "vendor" : "common";
            }
          },
        },
      },
    },
    plugins: [react()],
  });
};
