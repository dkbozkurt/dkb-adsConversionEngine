import { defineConfig } from 'vite';
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [viteSingleFile({ removeViteModuleLoader: true })],
  build: {
    rollupOptions: {
      input: 'index.html',
    },
    target: 'esnext',
    inlineDynamicImports: true,
  },
  assetsInclude: ['**/*.glb', '**/*.mp3'],
});
