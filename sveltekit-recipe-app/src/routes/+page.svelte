<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { searchRecipes, filterByCategory, filterByArea } from '$lib/api/mealdb.js';
  import { favorites } from '$lib/stores/favorites.svelte.js';
  import { cart } from '$lib/stores/cart.svelte.js';

  let { data } = $props();

  let recipes = $state(data.recipes);
  let loading = $state(false);
  let error = $state('');
  let category = $state('');
  let area = $state('');
  let query = $state('');

  async function runQuery() {
    loading = true;
    error = '';
    try {
      if (category) {
        recipes = await filterByCategory(category);
      } else if (area) {
        recipes = await filterByArea(area);
      } else {
        recipes = await searchRecipes(query);
      }
    } catch (e) {
      error = 'Could not load recipes. Please try again.';
    } finally {
      loading = false;
    }
  }

  function onSearch(e) {
    query = e.detail.query;
    category = '';
    area = '';
    runQuery();
  }

  function onCategoryChange(e) {
    category = e.target.value;
    area = '';
    query = '';
    runQuery();
  }

  function onAreaChange(e) {
    area = e.target.value;
    category = '';
    query = '';
    runQuery();
  }

  function onCardSelect(e) {
    goto(`${base}/recipe/${e.detail.recipeId}`);
  }

  function onFavoriteToggle(e, recipe) {
    favorites.toggle(recipe);
  }
</script>

<svelte:head>
  <title>Discover Recipes · NAGP Recipe Finder</title>
</svelte:head>

<section>
  <h1>Discover recipes</h1>
  <p class="state-msg">Search TheMealDB, or browse by category / cuisine.</p>

  <rk-search-bar placeholder="Try “chicken”, “pasta”, “curry”…" onsearch={onSearch}></rk-search-bar>

  <div class="filters">
    <select value={category} onchange={onCategoryChange}>
      <option value="">All categories</option>
      {#each data.categories as c}
        <option value={c}>{c}</option>
      {/each}
    </select>
    <select value={area} onchange={onAreaChange}>
      <option value="">All cuisines</option>
      {#each data.areas as a}
        <option value={a}>{a}</option>
      {/each}
    </select>
  </div>

  {#if loading}
    <p class="state-msg">Loading recipes…</p>
  {:else if error}
    <p class="state-msg">{error}</p>
  {:else if recipes.length === 0}
    <div class="empty-state">No recipes found. Try a different search or filter.</div>
  {:else}
    <div class="grid">
      {#each recipes as r (r.id)}
        <div class="card-wrap">
          <rk-recipe-card
            recipeId={r.id}
            heading={r.title}
            image={r.image}
            subtitle={r.category ?? ''}
            favorite={favorites.isFavorite(r.id)}
            oncardselect={onCardSelect}
            onfavoritetoggle={(e) => onFavoriteToggle(e, r)}
          ></rk-recipe-card>
          <button
            class="btn secondary cart-btn"
            class:in-cart={cart.has(r.id)}
            onclick={() => cart.toggle(r)}
          >
            {cart.has(r.id) ? '🛒 In cart — remove' : '🛒 Add to cart'}
          </button>
        </div>
      {/each}
    </div>
  {/if}
</section>

<style>
  .card-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .cart-btn {
    width: 100%;
  }
  .cart-btn.in-cart {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }
</style>
