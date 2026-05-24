import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { existsSync } from 'fs';

const dockerMountedEdwinPath = resolve(__dirname, 'edwin/lib/index.js');
const localRepoEdwinPath = resolve(__dirname, '../../source/lib/index.js');
const edwinPath = existsSync(dockerMountedEdwinPath) ? dockerMountedEdwinPath : localRepoEdwinPath;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      edwin: edwinPath,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './spec/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: ['node_modules/', 'spec/', 'edwin/'],
    },
  },
});
