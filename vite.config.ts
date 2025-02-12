import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
    outDir: 'dist',
    // manifest: true,
  },
  plugins: [react()],
});
