import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'./tests',
 use:{baseURL:'http://127.0.0.1:5174/koffeeshop/',launchOptions:{channel:'chrome'}},
 webServer:{command:'npm run preview -- --port 5174 --strictPort',url:'http://127.0.0.1:5174/koffeeshop/',reuseExistingServer:!process.env.CI},
});

