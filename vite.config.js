import { defineConfig } from 'vite';
export default defineConfig({base:'/Template-Website/',build:{rollupOptions:{output:{manualChunks:{animation:['gsap']}}}}});
