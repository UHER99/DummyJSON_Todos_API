import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES 
    ? "/DummyJSON_Todos_API/" 
    : "/",
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
});
