import { browser } from '$app/environment';

const STORAGE_KEY = 'rfmp.cart.v1';

function load() {
  if (!browser) return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

class CartStore {
  items = $state(load());

  get list() {
    return Object.values(this.items);
  }

  get count() {
    return this.list.length;
  }

  has(id) {
    return !!this.items[id];
  }

  add(recipe) {
    if (this.items[recipe.id]) return;
    this.items = {
      ...this.items,
      [recipe.id]: {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        category: recipe.category ?? '',
        area: recipe.area ?? '',
      },
    };
    this.persist();
  }

  remove(id) {
    if (!this.items[id]) return;
    const { [id]: _removed, ...rest } = this.items;
    this.items = rest;
    this.persist();
  }

  toggle(recipe) {
    if (this.items[recipe.id]) this.remove(recipe.id);
    else this.add(recipe);
  }

  clear() {
    this.items = {};
    this.persist();
  }

  persist() {
    if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }
}

export const cart = new CartStore();
