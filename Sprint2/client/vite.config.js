import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set the default port to 3000. IMPORTANT BECAUSE GOOGLE LOGIN USES THIS PORT!
    open: true, // Automatically opens the browser
  },
});
