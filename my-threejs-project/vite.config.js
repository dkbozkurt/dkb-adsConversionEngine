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
    assetsInlineLimit: 0, // Ensure all assets are inlined
  },
  assetsInclude: ['**/*.glb', '**/*.mp3', '**/*.png'],
});
