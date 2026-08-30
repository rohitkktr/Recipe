<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import RecipeForm from '$lib/RecipeForm.svelte';
  import { myRecipes } from '$lib/stores/myRecipes.svelte.js';

  let { data } = $props();

  function handleUpdate(draft) {
    myRecipes.update(data.recipe.id, draft);
    goto(`${base}/recipe/${data.recipe.id}`);
  }
</script>

<svelte:head>
  <title>Edit {data.recipe.title} · NAGP Recipe Finder</title>
</svelte:head>

<section class="narrow">
  <h1>Edit recipe</h1>
  <RecipeForm initial={data.recipe} onSubmit={handleUpdate} submitLabel="Save changes" />
</section>

<style>
  .narrow {
    max-width: 640px;
  }
</style>
