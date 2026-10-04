import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'./tests',
 use:{baseURL:'http://127.0.0.1:5174/Template-Website/',launchOptions:{channel:'chrome'}},
 webServer:{command:'npm run preview -- --port 5174 --strictPort',url:'http://127.0.0.1:5174/Template-Website/',reuseExistingServer:!process.env.CI},
});

