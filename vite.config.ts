import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
    outDir: 'dist',
    manifest: true,
    minify: 'esbuild', // 'esbuild' or 'terser'
    rollupOptions: {
      external: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      // output: {
      //   // Split vendor chunks out of node_modules
      //   manualChunks(id) {
      //     if (id.includes('node_modules')) {
      //       return id.toString().split('node_modules/')[1].split('/')[0];
      //     }
      //   },
      // },
    },
  },
  plugins: [
    react(),
    visualizer({
      open: false,
      filename: 'bundle-report/bundle-analysis.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
