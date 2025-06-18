/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import istanbul from 'vite-plugin-istanbul';


export default defineConfig({
  plugins: [
    react(),
    // Only add istanbul plugin if coverage is not explicitly disabled
    ...(process.env.DISABLE_COVERAGE !== 'true' ? [
      istanbul({
        cypress: true,
        requireEnv: false, // Enable coverage collection by default
        exclude: ['**/node_modules/**', '**/test/**', '**/*.cy.js', 'src/views/chat/**', 'src/views/main/**'],
        forceBuildInstrument: true, // Force instrumentation on build
        checkProd: true, // Check production build
      })
    ] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
