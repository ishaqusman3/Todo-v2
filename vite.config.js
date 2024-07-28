// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import dotenv from 'dotenv';

// // Load .env file if it exists
// dotenv.config();

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env': process.env,
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
