# NAGP Recipe Finder & Meal Planner

A recipe discovery and weekly meal-planning app. You can search recipes from
[TheMealDB](https://www.themealdb.com/api.php), open a recipe to see its
ingredients and steps, keep a list of favourites, add your own recipes, drop
recipes into a shopping cart, and plan meals for each day of the week.

**Live app:** https://rohitkktr.github.io/Recipe/

The project is split into two parts:

| Folder | What it is |
| --- | --- |
| `stencil-recipe-ui/` | A StencilJS web-component library (recipe card, search bar, star rating, tag, modal, day slot). Built once and reused by the app. |
| `sveltekit-recipe-app/` | The SvelteKit 5 app. It consumes the component library as a package and holds all the pages, routing and state. |

The app talks to the library the way a normal consumer would: it imports the
built package (not the source files), passes data in through component
properties, listens to the custom events the components emit, and uses slots
where it makes sense.

---

## Running it on your machine

You'll need **Node 20 or newer** (I use Node 22). Everything below is just
`npm`, no other tooling required.

### 1. Build the component library first

The app links to the library from disk, so the library has to be built before
the app can pick it up.

```bash
cd stencil-recipe-ui
npm install
npm run build
```

That produces `dist/` and `loader/` inside `stencil-recipe-ui/`. You only need
to repeat this step when you change something in the library.

### 2. Start the app

Open a second terminal (or just `cd ..` back out):

```bash
cd sveltekit-recipe-app
npm install
npm run dev
```

Vite prints a local URL, usually **http://localhost:5173/**. Open that and
you're running the whole thing locally.

### Handy extra commands

Run these from inside `sveltekit-recipe-app/`:

```bash
npm run build     # production build into ./build (this is what gets deployed)
npm run preview   # serve that production build locally to sanity-check it
```

If you ever see a blank page after changing the library, rebuild the library
(step 1) and restart `npm run dev`.

---

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the library,
builds the app with the right base path, and publishes `sveltekit-recipe-app/build`
to GitHub Pages at https://rohitkktr.github.io/Recipe/.

Feature branches get a build check and an auto-opened PR via
`.github/workflows/pr.yaml`.

---

## Notes and assumptions

- **Recipe data** comes from TheMealDB's free public API. No key is needed.
- **Your data stays in the browser.** Favourites, custom recipes, the cart and
  the weekly plan are all saved to `localStorage` — there's no backend. Clearing
  site data resets them, and they don't sync between devices.
- **The app runs as a single-page app** (`ssr = false`). The component library
  is client-only (custom elements), and the stored data lives in the browser, so
  there's nothing useful to render on a server. Known routes are pre-rendered as
  static shells and unknown ones fall back to `404.html`, which is what makes
  deep links work on GitHub Pages.
- **The library is linked locally**, not published to npm. The app's
  `package.json` points at `file:../stencil-recipe-ui`. To publish it for real:
  rename the package to a scope you own (e.g. `@your-username/recipe-ui-kit`),
  run `npm run build`, `npm publish --access public`, then switch the app's
  dependency to the published version.
- **`npm run check`** (svelte-check) reports type errors because this is a
  plain-JS project with strict checking on. They don't affect the build or the
  app — left as-is on purpose.

---

## Repository

https://github.com/rohitkktr/Recipe
