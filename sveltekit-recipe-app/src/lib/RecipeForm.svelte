<script>
  import { validateRecipe } from '$lib/stores/myRecipes.svelte.js';

  let { initial = null, onSubmit, submitLabel = 'Save recipe' } = $props();

  let title = $state(initial?.title ?? '');
  let category = $state(initial?.category ?? '');
  let area = $state(initial?.area ?? '');
  let image = $state(initial?.image ?? '');
  let instructions = $state(initial?.instructions ?? '');
  let ingredients = $state(
    initial?.ingredients?.length ? [...initial.ingredients.map((i) => ({ ...i }))] : [{ name: '', measure: '' }]
  );
  let errors = $state({});

  function addIngredientRow() {
    ingredients = [...ingredients, { name: '', measure: '' }];
  }

  function removeIngredientRow(idx) {
    ingredients = ingredients.filter((_, i) => i !== idx);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const draft = { title, category, area, image, instructions, ingredients };
    const validation = validateRecipe(draft);
    errors = validation;
    if (Object.keys(validation).length === 0) {
      onSubmit(draft);
    }
  }
</script>

<form onsubmit={handleSubmit} novalidate>
  <div class="field">
    <label for="title">Title *</label>
    <input id="title" bind:value={title} placeholder="e.g. Grandma's Lasagna" />
    {#if errors.title}<span class="error">{errors.title}</span>{/if}
  </div>

  <div class="two-col">
    <div class="field">
      <label for="category">Category *</label>
      <input id="category" bind:value={category} placeholder="e.g. Dinner, Dessert" />
      {#if errors.category}<span class="error">{errors.category}</span>{/if}
    </div>
    <div class="field">
      <label for="area">Cuisine (optional)</label>
      <input id="area" bind:value={area} placeholder="e.g. Italian" />
    </div>
  </div>

  <div class="field">
    <label for="image">Image URL (optional)</label>
    <input id="image" bind:value={image} placeholder="https://…" />
    {#if errors.image}<span class="error">{errors.image}</span>{/if}
  </div>

  <div class="field">
    <label>Ingredients *</label>
    {#each ingredients as ing, idx}
      <div class="ingredient-row">
        <input placeholder="Ingredient" bind:value={ing.name} />
        <input placeholder="Amount" bind:value={ing.measure} />
        <button type="button" class="btn secondary" onclick={() => removeIngredientRow(idx)}>✕</button>
      </div>
    {/each}
    <button type="button" class="btn secondary" onclick={addIngredientRow}>+ Add ingredient</button>
    {#if errors.ingredients}<span class="error">{errors.ingredients}</span>{/if}
  </div>

  <div class="field">
    <label for="instructions">Instructions *</label>
    <textarea id="instructions" rows="6" bind:value={instructions} placeholder="Step-by-step instructions…"></textarea>
    {#if errors.instructions}<span class="error">{errors.instructions}</span>{/if}
  </div>

  <button type="submit" class="btn">{submitLabel}</button>
</form>

<style>
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .ingredient-row {
    display: grid;
    grid-template-columns: 2fr 1fr auto;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .ingredient-row input {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.5rem 0.6rem;
    font-size: 0.88rem;
  }
</style>
