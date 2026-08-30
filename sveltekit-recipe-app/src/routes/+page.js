import { searchRecipes, listCategories, listAreas } from '$lib/api/mealdb.js';

export async function load({ fetch }) {
  const [recipes, categories, areas] = await Promise.all([
    searchRecipes('', fetch),
    listCategories(fetch),
    listAreas(fetch),
  ]);
  return { recipes, categories, areas };
}
