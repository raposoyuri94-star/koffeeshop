import { defineConfig } from '@playwright/test';
import viteConfig from './vite.config.js';

const baseURL = `http://127.0.0.1:5175${viteConfig.base}`;

export default defineConfig({
  testDir: './tests',
  use: { baseURL, launchOptions: { channel: 'chrome' } },
  webServer: {
    command: 'npm run preview -- --port 5175 --strictPort',
    url: baseURL,
    reuseExistingServer: false,
  },
});

