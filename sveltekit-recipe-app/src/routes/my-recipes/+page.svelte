<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { myRecipes } from '$lib/stores/myRecipes.svelte.js';

  function onCardSelect(e) {
    goto(`${base}/recipe/${e.detail.recipeId}`);
  }
</script>

<svelte:head>
  <title>My Recipes · NAGP Recipe Finder</title>
</svelte:head>

<section>
  <div class="header-row">
    <h1>My recipes</h1>
    <a class="btn" href={base + '/my-recipes/new'}>+ New recipe</a>
  </div>

  {#if myRecipes.list.length === 0}
    <div class="empty-state">You haven't created any recipes yet.</div>
  {:else}
    <div class="grid">
      {#each myRecipes.list as r (r.id)}
        <rk-recipe-card
          recipeId={r.id}
          heading={r.title}
          image={r.image}
          subtitle={r.category ?? ''}
          hideFavorite={true}
          oncardselect={onCardSelect}
        ></rk-recipe-card>
      {/each}
    </div>
  {/if}
</section>

<style>
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
