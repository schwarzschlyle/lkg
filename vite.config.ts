import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      /*
       * This project lives on /mnt/c, the Windows filesystem mounted into
       * WSL2. inotify events do not cross that mount, so Vite's file watcher
       * never fires: edits land on disk but the dev server keeps serving the
       * module it cached at startup, with no error to say so.
       *
       * Polling is the reliable fix while the project stays on /mnt/c. If it
       * ever moves onto the WSL filesystem (~/...), delete this block — native
       * inotify is both faster and cheaper.
       */
      usePolling: true,
      interval: 300,
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
