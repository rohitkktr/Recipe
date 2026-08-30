// Register the Stencil web components from the library's `dist-custom-elements`
// build. Each module self-defines its element on import, and Vite bundles the
// code directly (no runtime chunk fetching), which is what makes it work on a
// static host like GitHub Pages under a base path.
import '@rohitkumar/recipe-ui-kit/dist/components/rk-recipe-card.js';
import '@rohitkumar/recipe-ui-kit/dist/components/rk-search-bar.js';
import '@rohitkumar/recipe-ui-kit/dist/components/rk-star-rating.js';
import '@rohitkumar/recipe-ui-kit/dist/components/rk-day-slot.js';
import '@rohitkumar/recipe-ui-kit/dist/components/rk-modal.js';
import '@rohitkumar/recipe-ui-kit/dist/components/rk-tag.js';
