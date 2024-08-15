import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svg from "@neodx/svg/vite";

export default defineConfig({
  plugins: [
    react(),
    svg({
      root: "src/shared/assets",
      // All paths should be relative to cwd or absolute.
      // For example, 'public/sprites' is an equivalent of `path.resolve(__dirname, 'public/sprites')`
      resetColors: false,
      output: "public",
      metadata: {
        path: "src/shared/assets/sprite.gen.ts",
      },
      fileName: "{name}.{hash:8}.svg",
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
