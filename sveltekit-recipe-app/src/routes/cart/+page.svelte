<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { cart } from '$lib/stores/cart.svelte.js';

  function onCardSelect(e) {
    goto(`${base}/recipe/${e.detail.recipeId}`);
  }
</script>

<svelte:head>
  <title>Cart · NAGP Recipe Finder</title>
</svelte:head>

<section>
  <div class="header-row">
    <h1>Your cart</h1>
    {#if cart.list.length > 0}
      <button class="btn secondary" onclick={() => cart.clear()}>Clear cart</button>
    {/if}
  </div>

  {#if cart.list.length === 0}
    <div class="empty-state">
      Your cart is empty. Open a recipe and tap <strong>Add to cart</strong>, or use the
      button under any recipe on <a href={base + '/'}>Discover</a>.
    </div>
  {:else}
    <p class="state-msg">{cart.count} recipe{cart.count === 1 ? '' : 's'} in your cart.</p>
    <div class="grid">
      {#each cart.list as r (r.id)}
        <div class="card-wrap">
          <rk-recipe-card
            recipeId={r.id}
            heading={r.title}
            image={r.image}
            subtitle={r.category ?? ''}
            hideFavorite={true}
            oncardselect={onCardSelect}
          ></rk-recipe-card>
          <button class="btn secondary" onclick={() => cart.remove(r.id)}>Remove</button>
        </div>
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
  .card-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .card-wrap button {
    width: 100%;
  }
</style>
