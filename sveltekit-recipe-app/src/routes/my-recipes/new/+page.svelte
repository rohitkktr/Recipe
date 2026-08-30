<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import RecipeForm from '$lib/RecipeForm.svelte';
  import { myRecipes } from '$lib/stores/myRecipes.svelte.js';

  function handleCreate(draft) {
    const recipe = myRecipes.create(draft);
    goto(`${base}/recipe/${recipe.id}`);
  }
</script>

<svelte:head>
  <title>New Recipe · NAGP Recipe Finder</title>
</svelte:head>

<section class="narrow">
  <h1>Create a recipe</h1>
  <RecipeForm onSubmit={handleCreate} submitLabel="Create recipe" />
</section>

<style>
  .narrow {
    max-width: 640px;
  }
</style>
