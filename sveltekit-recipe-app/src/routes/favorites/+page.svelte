<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { favorites } from '$lib/stores/favorites.svelte.js';

  function onCardSelect(e) {
    goto(`${base}/recipe/${e.detail.recipeId}`);
  }

  function onFavoriteToggle(e) {
    favorites.remove(e.detail.recipeId);
  }
</script>

<svelte:head>
  <title>Favorites · NAGP Recipe Finder</title>
</svelte:head>

<section>
  <h1>Your favorites</h1>

  {#if favorites.list.length === 0}
    <div class="empty-state">
      No favorites yet. Head to <a href={base + '/'}>Discover</a> and tap the heart on a recipe.
    </div>
  {:else}
    <div class="grid">
      {#each favorites.list as r (r.id)}
        <rk-recipe-card
          recipeId={r.id}
          heading={r.title}
          image={r.image}
          subtitle={r.category ?? ''}
          favorite={true}
          oncardselect={onCardSelect}
          onfavoritetoggle={onFavoriteToggle}
        ></rk-recipe-card>
      {/each}
    </div>
  {/if}
</section>
