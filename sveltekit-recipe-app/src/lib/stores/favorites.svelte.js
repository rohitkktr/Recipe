import { browser } from '$app/environment';

const STORAGE_KEY = 'rfmp.favorites.v1';

function load() {
  if (!browser) return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

class FavoritesStore {
  items = $state(load());

  get list() {
    return Object.values(this.items);
  }

  get count() {
    return this.list.length;
  }

  isFavorite(id) {
    return !!this.items[id];
  }

  toggle(recipe) {
    const id = recipe.id;
    if (this.items[id]) {
      const { [id]: _removed, ...rest } = this.items;
      this.items = rest;
    } else {
      this.items = {
        ...this.items,
        [id]: { id, title: recipe.title, image: recipe.image, category: recipe.category, area: recipe.area },
      };
    }
    this.persist();
  }

  remove(id) {
    if (!this.items[id]) return;
    const { [id]: _removed, ...rest } = this.items;
    this.items = rest;
    this.persist();
  }

  persist() {
    if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }
}

export const favorites = new FavoritesStore();
