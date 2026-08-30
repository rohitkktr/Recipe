import { browser } from '$app/environment';

const STORAGE_KEY = 'rfmp.myRecipes.v1';

function load() {
  if (!browser) return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function makeId() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function validateRecipe(draft) {
  const errors = {};
  if (!draft.title || !draft.title.trim()) errors.title = 'Title is required.';
  if (!draft.category || !draft.category.trim()) errors.category = 'Category is required.';
  const ingredients = (draft.ingredients || []).filter((i) => i.name?.trim());
  if (ingredients.length === 0) errors.ingredients = 'Add at least one ingredient.';
  if (!draft.instructions || draft.instructions.trim().length < 10) {
    errors.instructions = 'Instructions must be at least 10 characters.';
  }
  if (draft.image && draft.image.trim() && !/^https?:\/\/\S+$/i.test(draft.image.trim())) {
    errors.image = 'Image must be a valid URL (http/https).';
  }
  return errors;
}

class MyRecipesStore {
  items = $state(load());

  get list() {
    return this.items;
  }

  get(id) {
    return this.items.find((r) => r.id === id) ?? null;
  }

  create(draft) {
    const recipe = {
      id: makeId(),
      title: draft.title.trim(),
      category: draft.category.trim(),
      area: draft.area?.trim() || 'Custom',
      image: draft.image?.trim() || '',
      ingredients: (draft.ingredients || []).filter((i) => i.name?.trim()),
      instructions: draft.instructions.trim(),
      tags: draft.tags || [],
      isCustom: true,
      createdAt: Date.now(),
    };
    this.items = [recipe, ...this.items];
    this.persist();
    return recipe;
  }

  update(id, draft) {
    this.items = this.items.map((r) =>
      r.id === id
        ? {
            ...r,
            title: draft.title.trim(),
            category: draft.category.trim(),
            area: draft.area?.trim() || 'Custom',
            image: draft.image?.trim() || '',
            ingredients: (draft.ingredients || []).filter((i) => i.name?.trim()),
            instructions: draft.instructions.trim(),
            tags: draft.tags || [],
          }
        : r
    );
    this.persist();
  }

  remove(id) {
    this.items = this.items.filter((r) => r.id !== id);
    this.persist();
  }

  persist() {
    if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }
}

export const myRecipes = new MyRecipesStore();
