import { defineConfig } from 'vite';
export default defineConfig({base:'/koffeeshop/',build:{rollupOptions:{output:{manualChunks:{animation:['gsap']}}}}});
