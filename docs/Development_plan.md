# Development Plan

Status: **draft for review.** Technical details (architecture, data model, APIs) belong in [Technical_documentation.md](Technical_documentation.md). Ideas beyond version 1 live in [Roadmap.md](Roadmap.md).

**How to read the checkboxes.** Every planned item has a checkbox. `- [ ]` means planned or in progress, and `- [x]` means implemented. A box is ticked in the same change that implements the feature, never earlier. Section 2 lists _what_ version 1 contains (each item is tagged with its milestone, for example `(M3)`), and section 4 lists _when_ each piece is built. Tick an item in both places.

## 1. Vision

**whatisfordinner** is a personal recipe app for friends and family. Each person has their own kitchen, fridge, pantry and recipe library, and can ask one question: **"What can I have for dinner?"** The app answers from the user's own recipes and from free online recipe sources, based on what they have, what they like and how much time they have.

### Principles

- **Free only.** Every service is open source or has a good free tier. No paid services.
- **Private by default.** Everyone sees only their own data, plus recipes friends have shared with them.
- **Bilingual.** English (US) and Bulgarian, for both the interface and recipe content.
- **Tested.** Every feature ships with tests (Vitest, 80% coverage).
- **Standards-based.** Recipes use the schema.org `Recipe` format so they stay compatible with recipe websites and other tools.
- **American English** in all code, documents and text.

## 2. Version 1 scope

### 2.1 Accounts and profile

- [ ] Sign up and sign in with email and password, a magic link or code, and social login (Clerk). (M2)
- [ ] **Profile**, with every field optional. (M6)
  - [ ] Diet: vegetarian, vegan, pescatarian, halal, kosher, gluten-free, dairy-free, low-carb and similar.
  - [ ] Allergies and intolerances.
  - [ ] Disliked ingredients, and ingredients that must never appear.
  - [ ] Liked ingredients and cuisines.
  - [ ] Cooking methods to avoid (for example, no fried food) and preferred methods.
  - [ ] Spice level.
  - [ ] Maximum prep time and maximum total time (for example, 45 minutes or less).
  - [ ] Cooking skill level.
  - [ ] Household size and default servings.
  - [ ] Calorie and macro goals (optional).
  - [ ] Unit system (metric or imperial) and interface language.
- [ ] Profile preferences filter recipe suggestions. Any filter can be switched off for a single search. (M7)

### 2.2 My kitchen

- [ ] **Equipment:** oven, stove, grill or barbecue, air fryer, microwave, mixer, food processor, blender, slow cooker, pressure cooker and more, plus custom items. (M5)
- [ ] **Fridge** and **pantry** (and optionally freezer): items with an optional quantity, unit and expiry date. (M5)
  - [ ] Add items by typing.
  - [ ] Add items by picking from a categorized ingredient list.
  - [ ] Add items by scanning a barcode with Open Food Facts (later in v1, if time allows; see the open decisions).
- [ ] Recipes that need equipment the user does not have are hidden or flagged. (M7)

### 2.3 Recipe library

- [ ] **Save** recipes found online into the user's own library, so they can be viewed again without searching. (M7)
- [ ] **Add by URL:** the server reads the page's schema.org JSON-LD and imports the recipe, including a local copy of the main image. (M4)
  - [ ] Duplicate URLs are detected.
  - [ ] When a site blocks the server, the user can paste the page HTML instead.
- [ ] **Add manually:** a form covering all fields of the schema.org `Recipe` type, with sensible grouping so it is not overwhelming (basics, ingredients, steps, times, nutrition, media). (M3)
- [ ] Favorites, search, and filters (time, diet, cuisine, equipment, ingredients). (M3)
- [ ] A rich recipe page: large photo, ingredient list with servings scaling, numbered steps, times, nutrition, and source link. Video is a later feature. (M3)
- [ ] Nutrition for each recipe (imported, or calculated from ingredients). (M9)

### 2.4 "What can I have for dinner?"

- [ ] The user picks the source of ingredients: **fridge and pantry**, **a custom list**, or both. (M7)
- [ ] The app searches the user's own library and online sources and ranks recipes by how many ingredients the user already has and which ones are missing. (M7)
- [ ] Filters from the profile apply (diet, dislikes, time, equipment). The user can change them per search. (M7)
- [ ] Results show "you have 8 of 10 ingredients" with the missing items listed, and recipes can be saved to the library with one click. (M7)

### 2.5 Languages

- [ ] Interface in English (US) and Bulgarian, switchable at any time. (M2)
- [ ] Recipe content can be machine-translated on demand and cached. The original text is always kept, translated text is labeled, and the user can edit it. (M9)

### 2.6 Friends and sharing

- [ ] Send a friend request by email or username; the recipient **accepts or rejects** it. (M8)
- [ ] Share a recipe with a friend. The friend sees it read-only. (M8)
- [ ] When a friend wants to change a shared recipe, the app creates **their own copy** ("copy on edit"). The original is never changed. A copy shows "Based on [friend name]'s recipe". (M8)
- [ ] A snapshot is taken at the moment of sharing, so a share survives if the original is later deleted. (M8)

### 2.7 Help section

An in-app help center (a page inside the signed-in app, and a public version for visitors) that explains each feature and how to use it. (M10)

- [ ] Getting started tour, and a short "first five minutes" checklist.
- [ ] One guide per feature: profile, kitchen, adding recipes (URL, manual), "What can I have for dinner?", friends and sharing, languages.
- [ ] Searchable, with a sidebar of topics, step-by-step guides with screenshots or short illustrations, tips and callouts, and an FAQ.
- [ ] Available in both languages.
- [ ] Designed with the same creativity as the rest of the app. Exact layout to be agreed when we reach the design step.

### 2.8 Out of scope for version 1

- Meal planning over weeks or months.
- Recipe videos (embedding is planned for later).
- Native mobile apps (the site must work well on phones).
- Any paid service.

See [Roadmap.md](Roadmap.md) for later ideas.

## 3. Design direction

The look should feel warm, friendly and appetizing, not like an admin dashboard.

### What we learned from similar sites

- **whatsfordinner.com** (a recipe site; I read its homepage structure, not its colors): a clear promise ("find tonight's dinner in 3 clicks"), a quiz-style entry point for people who cannot decide, image-led recipe cards, several ways to browse (cuisine, course, ingredient, occasion, collections), and filters stored in the URL so results can be shared. Weaknesses to avoid: a very large menu (about 80 links) and features hidden behind sign-up.
- **Pantry-based apps** (SuperCook, Pantry: Recipe Manager, Whiskit, Half Lemons): show "you have X of Y ingredients", categorized ingredient pickers, and expiry reminders. These are the patterns our "What can I have for dinner?" should follow.

### Proposed design principles (to be confirmed)

- **Food photography first:** large images, image-led cards.
- **A bold, warm color palette:** **Fresh Basil** (herb green primary, tomato accent, cream background), plus dark mode. Decided in M1; the values are in [Technical_documentation.md](Technical_documentation.md#11-ui-and-design-system-implemented-in-m1-help-center-planned).
- **Fonts:** Rubik for headings and Nunito Sans for body text, both with Cyrillic support for Bulgarian.
- **Rounded shapes, generous spacing, friendly illustrations** for empty states and the help center.
- **One primary action per screen.** The home screen leads with the "What can I have for dinner?" action.
- **Mobile first.** The kitchen is a phone-in-hand place.
- **Accessible:** WCAG 2.1 AA contrast, keyboard use, labels, alt text.
- **Components:** shadcn/ui as the base, with blocks borrowed from third-party shadcn libraries where useful (restyled to our theme).

The palette and fonts were compared on a temporary preview in milestone M1 and approved before building screens.

## 4. Milestones

Each milestone is small enough to review and merge on its own. After a merge, the version in [CHANGELOG.md](CHANGELOG.md) and `package.json` is stepped up. A milestone is done when all of its boxes are ticked.

### M0: Setup and documentation (done, v0.0.2)

- [x] Project skeleton
- [x] Tests (Vitest, React Testing Library)
- [x] Husky, lint-staged and commitlint
- [x] Agent instructions
- [x] Documentation (development plan, technical documentation, changelog)

### M1: Design system and app shell (done, v0.0.3)

- [x] Color palette and fonts
- [x] shadcn/ui installed
- [x] Theme and dark mode
- [x] Layout: navigation, header, footer
- [x] Home page and placeholder pages

### M2: Foundation: i18n, auth and database

- [ ] `next-intl` (English and Bulgarian) and a language switcher in the header
- [ ] Clerk sign-up and sign-in, with the sign-in control in the header
- [ ] Neon + Drizzle connection and the first migration
- [ ] Users table synced with Clerk (signed webhook)
- [ ] `.env.example`
- [ ] Bulgarian spell-check dictionary (`@cspell/dict-bg-bg`) installed and configured

### M3: Recipe library (manual)

- [ ] Recipes and ingredients tables
- [ ] Manual add and edit form (schema.org `Recipe`)
- [ ] List and detail pages
- [ ] Favorites
- [ ] Cloudinary image upload

### M4: URL importer

- [ ] Server-side import from JSON-LD with SSRF protection
- [ ] Image copy
- [ ] Duplicate detection
- [ ] "Paste page HTML" fallback
- [ ] Ingredient parsing

### M5: Kitchen

- [ ] Equipment
- [ ] Fridge and pantry (items, quantities, expiry)
- [ ] Canonical ingredient dictionary in English and Bulgarian

### M6: Profile

- [ ] All optional profile fields and preferences
- [ ] Preferences used as filters

### M7: "What can I have for dinner?"

- [ ] Matching over the user's library
- [ ] Online sources (TheMealDB, Spoonacular) with caching
- [ ] Ranking
- [ ] Missing-ingredient display
- [ ] Save to library

### M8: Friends and sharing

- [ ] Friend requests (accept or reject)
- [ ] Sharing
- [ ] Snapshots
- [ ] Copy on edit

### M9: Translation and nutrition

- [ ] Machine translation of recipes with caching
- [ ] Nutrition calculation
- [ ] Attribution

### M10: Help center

- [ ] Searchable help pages in both languages
- [ ] Getting-started tour

### M11: Polish and release v1

- [ ] Accessibility pass
- [ ] Performance
- [ ] Error pages
- [ ] Security review
- [ ] Final documentation
- [ ] Tag `v1.0.0`

Order can change. M10 (help) can move earlier if useful, and the profile (M6) may be split so the filters most needed by M7 come first.

## 5. Definition of done (every milestone)

- `pnpm typecheck`, `pnpm lint` and `pnpm test:run` pass; coverage stays at 80% or more.
- Interface strings exist in both English (US) and Bulgarian.
- Authentication and ownership are checked on every **user-facing** server action and route handler. Webhook handlers (for example, Clerk) have no user session; they verify the provider's signature before processing instead.
- New environment variables are in `.env.example`.
- [CHANGELOG.md](CHANGELOG.md) is updated, and [Technical_documentation.md](Technical_documentation.md) is updated if behavior or architecture changed.
- The design is responsive and accessible.
- The checkboxes for the finished work are ticked in sections 2 and 4 of this plan.

## 6. Risks and mitigations

| Risk                                                                                  | Mitigation                                                                                                       |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Free-tier limits (Spoonacular, Edamam, translation, Neon, Cloudinary)                 | Cache aggressively, prefer the user's own library and TheMealDB, monitor usage, keep providers behind interfaces |
| Recipe sites block server requests (for example Cloudflare)                           | "Paste page HTML" fallback; later, a bookmarklet                                                                 |
| Spoonacular and Edamam terms limit storage and require attribution                    | Fine for a private app; re-check before opening the app to the public                                            |
| Ingredient matching is hard ("chicken breast" vs "chicken", plurals, Bulgarian names) | Canonical ingredient dictionary with synonyms, tests with real-world examples                                    |
| Machine translation quality                                                           | Show a "machine translated" label, allow edits, compare providers on real recipes                                |
| Imported pages are untrusted (XSS, SSRF)                                              | Zod validation, sanitization, URL restrictions (see the security instructions)                                   |
| Free hosting limits (Vercel Hobby is non-commercial)                                  | Acceptable for a private friends-and-family app; revisit if it grows                                             |

## 7. Open decisions

- Translation provider: Azure Translator first; compare Bulgarian quality with DeepL on real recipes (M9).
- Nutrition source: Edamam (needs attribution, limited free tier) or USDA FoodData Central (free, more work) (M9).
- Ingredient parsing: an npm library or the Spoonacular endpoint (M4).
- How friends find each other: email only, or also a username (M8).
- Whether barcode scanning is in v1 or moves to the Roadmap (M5).

## 8. Decisions already made

| Area           | Decision                                          |
| -------------- | ------------------------------------------------- |
| Framework      | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| UI library     | shadcn/ui                                         |
| Visual design  | Fresh Basil palette, Rubik + Nunito Sans fonts    |
| Authentication | Clerk                                             |
| Database       | Postgres on Neon, Drizzle ORM                     |
| Images         | Cloudinary                                        |
| Languages      | English (US) and Bulgarian, `next-intl`           |
| Recipe format  | schema.org `Recipe` (JSON-LD)                     |
| Sharing        | Copy on edit, snapshot at share time              |
| Testing        | Vitest and React Testing Library, 80% coverage    |
| Hosting        | Vercel (Hobby)                                    |
| Folder layout  | No `src/` folder                                  |
