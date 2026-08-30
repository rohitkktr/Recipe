const BASE = 'https://www.themealdb.com/api/json/v1/1';

function mapMeal(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: (measure || '').trim() });
    }
  }
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory || '',
    area: meal.strArea || '',
    instructions: meal.strInstructions || '',
    ingredients,
    tags: (meal.strTags || '').split(',').map((t) => t.trim()).filter(Boolean),
    source: meal.strSource || meal.strYoutube || null,
  };
}

export async function searchRecipes(query, fetchFn = fetch) {
  const q = query?.trim() || '';
  const url = `${BASE}/search.php?s=${encodeURIComponent(q)}`;
  const res = await fetchFn(url);
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  const data = await res.json();
  return (data.meals || []).map(mapMeal);
}

export async function getRecipeById(id, fetchFn = fetch) {
  const res = await fetchFn(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`Lookup failed: ${res.status}`);
  const data = await res.json();
  return data.meals ? mapMeal(data.meals[0]) : null;
}

export async function listCategories(fetchFn = fetch) {
  const res = await fetchFn(`${BASE}/list.php?c=list`);
  if (!res.ok) throw new Error(`Categories failed: ${res.status}`);
  const data = await res.json();
  return (data.meals || []).map((m) => m.strCategory);
}

export async function listAreas(fetchFn = fetch) {
  const res = await fetchFn(`${BASE}/list.php?a=list`);
  if (!res.ok) throw new Error(`Areas failed: ${res.status}`);
  const data = await res.json();
  return (data.meals || []).map((m) => m.strArea);
}

export async function filterByCategory(category, fetchFn = fetch) {
  const res = await fetchFn(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error(`Filter failed: ${res.status}`);
  const data = await res.json();
  return (data.meals || []).map((m) => ({ id: m.idMeal, title: m.strMeal, image: m.strMealThumb }));
}

export async function filterByArea(area, fetchFn = fetch) {
  const res = await fetchFn(`${BASE}/filter.php?a=${encodeURIComponent(area)}`);
  if (!res.ok) throw new Error(`Filter failed: ${res.status}`);
  const data = await res.json();
  return (data.meals || []).map((m) => ({ id: m.idMeal, title: m.strMeal, image: m.strMealThumb }));
}
