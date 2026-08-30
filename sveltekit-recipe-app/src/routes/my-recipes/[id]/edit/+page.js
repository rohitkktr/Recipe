import { error } from '@sveltejs/kit';
import { myRecipes } from '$lib/stores/myRecipes.svelte.js';

// User recipe ids exist only in the browser (localStorage) — SPA fallback handles this.
export const prerender = false;

export function load({ params }) {
  const recipe = myRecipes.get(params.id);
  if (!recipe) throw error(404, 'Recipe not found');
  return { recipe };
}
