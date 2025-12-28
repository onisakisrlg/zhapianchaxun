import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        // Ensure Service Worker is built/copied if referenced directly
      }
    }
  },
  // Ensure the 'public' folder behavior mimics root for these files if they aren't moved
  publicDir: 'public' 
});