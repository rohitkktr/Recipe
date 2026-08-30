import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    // The component library is a linked local package (file:../stencil-recipe-ui),
    // so its built files live outside this app's root. Allow Vite to serve them.
    fs: {
      allow: ['..']
    }
  }
});
