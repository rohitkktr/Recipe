export const ssr = false;

// Prerender a static shell for every statically-known route so GitHub Pages
// serves a real file at each URL (e.g. /cart, /favorites). Dynamic [id] routes
// opt out below and are handled by the 404.html SPA fallback.
export const prerender = true;
