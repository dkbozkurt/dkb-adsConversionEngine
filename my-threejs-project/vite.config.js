import { defineConfig } from 'vite';
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    rollupOptions: {
      input: 'index.html',
    },
    target: 'esnext',
    inlineDynamicImports: true,
  },
});
