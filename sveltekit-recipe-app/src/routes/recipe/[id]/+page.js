import { error } from '@sveltejs/kit';
import { getRecipeById } from '$lib/api/mealdb.js';

// Recipe ids are only known at runtime — render client-side via the SPA fallback.
export const prerender = false;
import { myRecipes } from '$lib/stores/myRecipes.svelte.js';

export async function load({ params, fetch }) {
  if (params.id.startsWith('local-')) {
    const recipe = myRecipes.get(params.id);
    if (!recipe) throw error(404, 'Recipe not found');
    return { recipe };
  }

  const recipe = await getRecipeById(params.id, fetch);
  if (!recipe) throw error(404, 'Recipe not found');
  return { recipe };
}
