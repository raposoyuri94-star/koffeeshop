import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'Koffeeshop-future';

export default defineConfig({
  base: `/${repositoryName}/`,
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        seasonal: fileURLToPath(new URL('./bebidas-sazonais.html', import.meta.url)),
      },
    },
  },
});
