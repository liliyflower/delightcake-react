# DelightCake — React + Firebase

A rebuild of the original static DelightCake site (plain HTML/CSS/Tailwind CDN)
as a React single-page app, with a working cart, checkout, and contact form
backed by Firebase Firestore.

## What changed from the original site

- **One codebase, not six near-duplicate pages.** `cho.html`, `str.html`,
  `vani.html`, `cup.html`, `wedd.html`, `maco.html` are now a single
  `Category` page driven by data (`src/data/cakes.js`), reached at
  `/menu/:slug`. Same for the six broken `con*.html` order pages — replaced
  by one real `/checkout` flow.
- **A real cart**, not a dead link per cake. Add items from any product
  card or detail page, adjust quantities, and it persists in
  `localStorage` across reloads.
- **Firebase Firestore** for orders and contact messages, so submissions
  are actually saved somewhere instead of a `<form>` with no `action`.
  The catalog can optionally be managed in Firestore too (see "Seeding the
  catalog" below) — falls back to the local file if Firestore is empty or
  unconfigured, so the site is never in a broken state.
- Fixed the broken/duplicated `<html>`/`<body>`/`<nav>` markup that was in
  `conCho.html`, `conVani.html`, `conWedd.html`, and the mismatched nav
  links across pages.
- Mobile menu, focus states, alt text, and a bit of visual polish (fonts,
  color system, a cake-tier "scallop" section divider).

## Accounts (sign in / sign up / profile)

- `/login` — email + password sign in, with a toggle to switch to sign up.
- `/account` — signed-in profile page: shows email and member-since date,
  lets you edit your display name, and has a **Sign Out** button. It's
  behind `ProtectedRoute`, so visiting it while signed out redirects to
  `/login` and sends you back after you sign in.
- The navbar shows **Sign In** when signed out, or your name/**Account**
  (with a person icon on mobile) when signed in.

This uses **Firebase Authentication** (email/password), which is separate
from Firestore — no extra rules or collections needed for it. In the
Firebase console: **Authentication -> Sign-in method -> Email/Password ->
Enable**. Like the rest of the app, if Firebase isn't configured yet,
`/login` shows a notice instead of silently failing.

## Getting started

```bash
npm install
npm run dev
```

The site works immediately with no setup — it reads cakes from
`src/data/cakes.js` and simply logs orders/messages to the console if
Firebase isn't configured yet ("offline mode").

## Connecting Firebase (optional but recommended)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Add a **Web app** to the project and copy the config values it gives you.
3. In this folder, copy `.env.example` to `.env.local` and fill in the
   values:
   ```bash
   cp .env.example .env.local
   ```
4. In the Firebase console, enable **Authentication -> Sign-in method ->
   Email/Password** if you want the sign in / sign up / account pages to work.
5. Also create a **Firestore database** (production or
   test mode — test mode is fine for coursework).
6. Paste the rules from `firestore.rules` into Firestore's Rules tab (or
   deploy them with the Firebase CLI). They let anyone read the cake
   catalog and submit orders/messages, but not read other people's orders.
7. Restart `npm run dev`. Orders placed at `/checkout` and messages sent
   from `/contact` will now be saved to the `orders` and `messages`
   collections.

### Seeding the catalog into Firestore (optional)

By default the app reads cakes from `src/data/cakes.js`. If you'd rather
manage the catalog from the Firebase console instead of editing code, run:

```bash
npm run seed
```

This pushes every cake in `src/data/cakes.js` into a `cakes` collection.
Once that collection has documents, the app reads from Firestore instead.

## Project structure

```
src/
  components/   Navbar, Footer, CakeCard, Toast, ScrollToTop, ProtectedRoute
  context/      CartContext (cart + localStorage), AuthContext (sign in/up/out)
  data/         cakes.js — local catalog + category metadata
  lib/          firebase.js (init), store.js (Firestore reads/writes)
  pages/        Home, About, Menu, Category, CakeDetail, Cart, Checkout,
                Contact, Login, Account, NotFound
scripts/
  seedCakes.mjs  one-off script to push cakes.js into Firestore
firestore.rules  copy into the Firebase console
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```
# delightcake-react
