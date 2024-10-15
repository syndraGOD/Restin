import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@components", replacement: "/src/components" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@style", replacement: "/src/style" },
      { find: "@api", replacement: "/src/api" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@store", replacement: "/src/store" },
    ],
  },
});
