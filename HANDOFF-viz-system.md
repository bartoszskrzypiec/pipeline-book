# Shared graphics/i18n toolkit

The interactive-widget engine, bilingual EN/PL toggle, formula-tooltip
system, and SVG+slider diagram pattern are maintained in a shared repo, not
duplicated here:

**`C:\Users\barte\Documents\VSCODE\learning-materials`** — read
`docs/INTEGRATION.md` there before copying anything into this book's
`assets/`.

## This book's own notes

- Currently Polish-only (`<html lang="pl">`), no i18n scaffolding at all.
  Adopting the shared `i18n.js` means setting
  `data-i18n-storage="pib-lang"` (or similar, just make it distinct from
  the other three books' keys) and `data-i18n-default="pl"` on `<html>`.
- `assets/interactive.js` (formula modals + `.vec[data-tip]` tooltips) is
  already present in this repo, copied from `raytracing-book` — but it's
  **not wired into any page yet** (zero `<script>` tags reference it, zero
  matching markup exists anywhere in the repo). The shared repo's copy is
  the same file; if you start actually using it, prefer re-copying from
  `learning-materials/assets/js/interactive.js` going forward so future
  updates are traceable via its `CHANGELOG.md`, rather than continuing to
  carry the untracked copy that's here now.
- No canvas/WebGL/SVG-slider interactivity exists anywhere in this book yet
  — every diagram so far is static inline SVG. This book's own `CLAUDE.md`
  already flags this as deferred work, referencing `raytracing-book`'s
  `toggleRay()`-style pattern as the model to eventually generalize — see
  `learning-materials/patterns/svg-slider-widget.md` for that same pattern,
  now documented generically rather than needing to be reverse-engineered
  from `raytracing-book`'s source.
- The most recent commit here ("Add sticky top toolbar to every page")
  already mirrors `pxrsurface-guide`'s topnav pattern — the same
  `.topnav`/`.topnav__brand` convention the shared `.lang-switch` markup
  expects, so no renaming needed if/when bilingual support is added.
- No specific pilot chapter identified yet for this book — pick one when
  the first real widget gets built here, following the same "port the
  widget, rewrite the prose" approach used for `lookdev_book`'s own
  handoff note.
