import { browser } from '$app/environment';

const STORAGE_KEY = 'rfmp.planner.v1';

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function emptyWeek() {
  return Object.fromEntries(DAYS.map((d) => [d, null]));
}

function load() {
  if (!browser) return emptyWeek();
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return saved ? { ...emptyWeek(), ...saved } : emptyWeek();
  } catch {
    return emptyWeek();
  }
}

class PlannerStore {
  week = $state(load());

  get days() {
    return DAYS.map((day) => ({ day, recipe: this.week[day] }));
  }

  assign(day, recipe) {
    this.week = { ...this.week, [day]: { id: recipe.id, title: recipe.title, image: recipe.image, category: recipe.category } };
    this.persist();
  }

  clear(day) {
    this.week = { ...this.week, [day]: null };
    this.persist();
  }

  clearAll() {
    this.week = emptyWeek();
    this.persist();
  }

  persist() {
    if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(this.week));
  }
}

export const planner = new PlannerStore();
