<script>
  import '../app.css';
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { favorites } from '$lib/stores/favorites.svelte.js';
  import { cart } from '$lib/stores/cart.svelte.js';

  let { children } = $props();

  const links = [
    { href: '/', label: 'Discover' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/planner', label: 'Planner' },
    { href: '/my-recipes', label: 'My Recipes' },
    { href: '/cart', label: 'Cart' },
  ];
</script>

<div class="shell">
  <header class="topbar">
    <a class="brand" href={base + '/'}>🍳 NAGP Recipe Finder</a>
    <nav>
      {#each links as link}
        <a href={base + link.href} class:active={$page.url.pathname === base + link.href}>
          {link.label}
          {#if link.href === '/favorites' && favorites.count > 0}
            <span class="badge">{favorites.count}</span>
          {/if}
          {#if link.href === '/cart' && cart.count > 0}
            <span class="badge">{cart.count}</span>
          {/if}
        </a>
      {/each}
    </nav>
  </header>

  <main>
    {@render children()}
  </main>

  <footer class="footer">
    Built with SvelteKit + StencilJS · Recipe data from
    <a href="https://www.themealdb.com/api.php" target="_blank" rel="noreferrer">TheMealDB</a>
  </footer>
</div>
