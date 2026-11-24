import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// On GitHub Pages the site lives at /p2p_latam/, locally at /
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/p2p_latam/" : "/",
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
