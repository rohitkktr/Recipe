<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { planner } from '$lib/stores/planner.svelte.js';
  import { favorites } from '$lib/stores/favorites.svelte.js';

  let pickingDay = $state(null);

  function openPicker(day) {
    pickingDay = day;
  }

  function assign(recipe) {
    planner.assign(pickingDay, recipe);
    pickingDay = null;
  }

  function clear(day) {
    planner.clear(day);
  }

  function onCardSelect(e) {
    goto(`${base}/recipe/${e.detail.recipeId}`);
  }
</script>

<svelte:head>
  <title>Weekly Planner · NAGP Recipe Finder</title>
</svelte:head>

<section>
  <div class="header-row">
    <h1>Weekly meal plan</h1>
    <button class="btn secondary" onclick={() => planner.clearAll()}>Clear week</button>
  </div>

  <div class="week">
    {#each planner.days as { day, recipe }}
      <rk-day-slot
        day={day}
        empty={!recipe}
        onaddmeal={() => openPicker(day)}
        onclearmeal={() => clear(day)}
      >
        {#if recipe}
          <rk-recipe-card
            recipeId={recipe.id}
            heading={recipe.title}
            image={recipe.image}
            subtitle={recipe.category ?? ''}
            hideFavorite={true}
            oncardselect={onCardSelect}
          ></rk-recipe-card>
        {/if}
      </rk-day-slot>
    {/each}
  </div>

  {#if pickingDay}
    <div class="picker-backdrop" onclick={() => (pickingDay = null)}>
      <div class="picker" onclick={(e) => e.stopPropagation()}>
        <h3>Assign a recipe to {pickingDay}</h3>
        {#if favorites.list.length === 0}
          <p class="state-msg">
            You have no favorites yet. <a href={base + '/'}>Browse recipes</a> and favorite a few first,
            or come back here after adding some.
          </p>
        {:else}
          <div class="grid">
            {#each favorites.list as r (r.id)}
              <rk-recipe-card
                recipeId={r.id}
                heading={r.title}
                image={r.image}
                subtitle={r.category ?? ''}
                hideFavorite={true}
                oncardselect={() => assign(r)}
              ></rk-recipe-card>
            {/each}
          </div>
        {/if}
        <button class="btn secondary" onclick={() => (pickingDay = null)}>Cancel</button>
      </div>
    </div>
  {/if}
</section>

<style>
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .week {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.9rem;
    margin-top: 1rem;
  }
  .picker-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(28, 25, 23, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 100;
  }
  .picker {
    background: white;
    border-radius: 14px;
    padding: 1.25rem;
    width: min(700px, 100%);
    max-height: 85vh;
    overflow-y: auto;
  }
</style>
