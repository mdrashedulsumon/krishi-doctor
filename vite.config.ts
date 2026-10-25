import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import express from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './server/api.ts';

dotenv.config();

function expressApiPlugin(): Plugin {
  return {
    name: 'express-api-plugin',
    configureServer(server) {
      const app = express();
      app.use((req: any, res: any, next: any) => {
        if (req.body !== undefined || (req.method !== 'POST' && req.method !== 'PUT')) {
          return next();
        }
        let data = '';
        req.on('data', (chunk: any) => {
          data += chunk;
        });
        req.on('end', () => {
          try {
            req.body = data ? JSON.parse(data) : {};
          } catch {
            req.body = {};
          }
          next();
        });
      });
      app.use('/api', apiRouter);
      server.middlewares.use(app);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), expressApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

