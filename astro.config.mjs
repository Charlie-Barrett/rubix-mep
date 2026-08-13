import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rubixmep.com',
  trailingSlash: 'never',
  build: { format: 'file' }
});
