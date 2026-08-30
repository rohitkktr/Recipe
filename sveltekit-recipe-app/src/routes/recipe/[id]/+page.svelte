<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { favorites } from '$lib/stores/favorites.svelte.js';
  import { cart } from '$lib/stores/cart.svelte.js';
  import { planner, DAYS } from '$lib/stores/planner.svelte.js';
  import { myRecipes } from '$lib/stores/myRecipes.svelte.js';

  let { data } = $props();
  let recipe = $derived(data.recipe);
  let showPlanPicker = $state(false);

  function toggleFavorite() {
    favorites.toggle(recipe);
  }

  function toggleCart() {
    cart.toggle(recipe);
  }

  function assignDay(day) {
    planner.assign(day, recipe);
    showPlanPicker = false;
  }

  function deleteCustomRecipe() {
    if (confirm(`Delete "${recipe.title}"? This cannot be undone.`)) {
      myRecipes.remove(recipe.id);
      goto(`${base}/my-recipes`);
    }
  }
</script>

<svelte:head>
  <title>{recipe.title} · NAGP Recipe Finder</title>
</svelte:head>

<article class="detail">
  <div class="hero">
    {#if recipe.image}
      <img src={recipe.image} alt={recipe.title} />
    {/if}
    <div class="hero-info">
      <div class="tags">
        {#if recipe.category}<rk-tag variant="primary">{recipe.category}</rk-tag>{/if}
        {#if recipe.area}<rk-tag>{recipe.area}</rk-tag>{/if}
        {#if recipe.isCustom}<rk-tag>My Recipe</rk-tag>{/if}
      </div>
      <h1>{recipe.title}</h1>
      <div class="actions">
        <button class="btn secondary" onclick={toggleFavorite}>
          {favorites.isFavorite(recipe.id) ? '♥ Remove favorite' : '♡ Add favorite'}
        </button>
        <button class="btn" onclick={() => (showPlanPicker = !showPlanPicker)}>+ Add to meal plan</button>
        <button class="btn secondary" onclick={toggleCart}>
          {cart.has(recipe.id) ? '🛒 In cart — remove' : '🛒 Add to cart'}
        </button>
        {#if recipe.isCustom}
          <a class="btn secondary" href={`${base}/my-recipes/${recipe.id}/edit`}>Edit</a>
          <button class="btn danger" onclick={deleteCustomRecipe}>Delete</button>
        {/if}
      </div>

      {#if showPlanPicker}
        <div class="day-picker">
          {#each DAYS as day}
            <button class="btn secondary" onclick={() => assignDay(day)}>{day}</button>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <div class="content">
    <section>
      <h2>Ingredients</h2>
      <ul class="ingredients">
        {#each recipe.ingredients as ing}
          <li><strong>{ing.measure}</strong> {ing.name}</li>
        {/each}
      </ul>
    </section>

    <section>
      <h2>Instructions</h2>
      <p class="instructions">{recipe.instructions}</p>
      {#if recipe.source}
        <p><a href={recipe.source} target="_blank" rel="noreferrer">Original source ↗</a></p>
      {/if}
    </section>
  </div>
</article>

<style>
  .hero {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 700px) {
    .hero {
      grid-template-columns: 320px 1fr;
    }
  }
  .hero img {
    width: 100%;
    border-radius: 14px;
    object-fit: cover;
    aspect-ratio: 4/3;
  }
  .tags {
    display: flex;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }
  h1 {
    margin: 0 0 0.9rem;
  }
  .actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .day-picker {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.75rem;
  }
  .content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (min-width: 700px) {
    .content {
      grid-template-columns: 1fr 2fr;
    }
  }
  .ingredients {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .instructions {
    white-space: pre-line;
    line-height: 1.6;
  }
</style>
