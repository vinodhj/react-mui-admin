import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
    outDir: 'dist',
    minify: 'esbuild', // 'esbuild' or 'terser'
    // rollupOptions: {
    //   output: {
    //     // Split vendor chunks out of node_modules
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.toString().split('node_modules/')[1].split('/')[0];
    //       }
    //     },
    //   },
    // },
    // manifest: true,
  },
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'local/bundle-analysis.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
