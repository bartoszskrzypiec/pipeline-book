# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

"Pipeline dla Artystów Technicznych" — a Polish-language static HTML book teaching VFX/animation
production pipelines to technical artists, not programmers writing tools from scratch. It assumes
the reader already works inside a studio pipeline (Maya/Houdini/Nuke, ShotGrid, a farm) and wants
to understand the mechanism underneath: repositories, version control, publishing, custom tools,
and how top studios (Weta Digital, ILM, Framestore, Pixar, DNEG/MPC, Animal Logic, and others)
actually build this. 22 numbered main chapters (rozdziały) build linearly on each other; 22
lettered appendices (dodatki A–V) go deeper into specific topics, including a five-part "Studia w
praktyce" (studios in practice) case-study series (Dodatki O–S); one practical companion
(pomocnik) walks through building a minimal real pipeline tool step by step. Sibling project to
[raytracing-book](https://bartoszskrzypiec.github.io/raytracing-book/), reusing its visual system.
Live at https://bartoszskrzypiec.github.io/pipeline-book/.

This is a living project, not a one-shot publication. As of the initial commit, the full table of
contents and file structure exist, but **every chapter and appendix is a stub** (title + one-line
hook + a "not written yet" status panel) — content gets written session by session. Don't build
rigid generated structures (e.g. auto-generated index files) that would need manual rebuilding on
every content change.

## No build system

Pure static HTML/CSS with inline SVG diagrams — no npm, no package.json, no bundler, no test
suite, no linter. To "run" the site, open any `.html` file directly in a browser, or serve the
repo root with any static file server. Deployed via GitHub Pages (Settings → Pages → Deploy from
branch → `main` / `/(root)`).

## Structure

```
index.html                                 — table of contents (spis treści), root only
rozdzialy/rozdzial-NN-slug.html            — 22 main chapters, NN zero-padded 01–22
dodatki/dodatek-x-slug.html                — 22 lettered appendices, x = a–v. Letters O–S form
                                             "Wykład: Studia w praktyce" — a five-part case-study
                                             series (ILM, Pixar, Weta, Framestore/MPC/DNEG, Animal
                                             Logic) with its own highlighted block in index.html.
podstawy/podstawy-narzedziowe.html         — "Zanim zaczniesz" primer: repo/terminal/env var
                                             vocabulary for readers with no CLI background. The one
                                             content page outside rozdzialy/dodatki/pomocnik — any
                                             repo-wide script must glob it explicitly.
pomocnik/pomocnik-mini-pipeline-tom-1.html — practical companion: build a minimal publish
                                             script + hook + PySide window, covers R.4, 7, 9, 15–16
assets/style.css                           — single shared stylesheet (dark theme), copied from
                                             raytracing-book and evolving independently from here
assets/interactive.js                      — formula modals + `.vec[data-tip]` tooltips, copied
                                             as-is; not yet used by any pipeline-book page
```

Every page links `assets/style.css` plus keeps its own Google Fonts `<link>` inline, exactly like
raytracing-book.

## Visual system — reused, revocabularied

Same CSS mechanics as raytracing-book (`.viewport-readout`, `.panel`, `.eyebrow`,
`.diagram-frame`, `.site-nav`, `.formula`, colors `--amber/--cyan/--violet/--raster`). Only the
*vocabulary* inside these components changes, chapter by chapter, to fit pipeline topics instead
of rendering:

- `.viewport-readout` (top HUD bar) → production context instead of camera state, e.g.
  `SHOW · AVR2` `SEQ · 010` `SHOT · 0100` `TASK · LIGHTING` `PUBLISH · v012` — or, for a Git
  chapter, `BRANCH ·` / `STATUS ·` tokens instead. Pick per chapter, don't force one template.
- `.eyebrow` "Pass: X" → "Etap: X" or another label that fits the specific chapter — a per-chapter
  judgment call, not a fixed rule.
- `.diagram-hud` (label above a diagram, e.g. "Scene.preview") → names that read like a pipeline
  tool's own UI: "Publish.trace", "Dependency.graph", "Farm.queue".
- Inline SVG diagrams: directory trees, dependency graphs (DAGs) for USD/asset builds, publish
  version timelines, farm queue visualizations, branch/merge diagrams — instead of ray-bounce
  diagrams. `interactive.js`'s `toggleRay()`-style pattern (see raytracing-book chapter 1's inline
  script) should be renamed to something generic like `toggleLayer()` when the first real diagram
  with toggleable layers is written here.
- Color tokens (`--amber/--cyan/--violet/--raster`) stay as accents; a consistent semantic mapping
  (e.g. amber = artist-facing data, cyan = tool/code, violet = tracking/metadata) should be decided
  once, when the first real chapter is written — not per-page ad hoc.

## Content authoring rules

- **Never rename/reletter dodatki (A–V) without asking**, even if the ordering looks imperfect.
  Renumbering breaks prose cross-references ("Dodatek B", "Rozdział 11", …) scattered by name
  across *other* files — a much bigger, riskier change than it first appears.
- **Every dodatek's `.viewport-readout`** carries an `EXT OF` token naming which rozdział it
  extends (see the generated stubs for the current mapping) — this is the source of truth for
  cross-linking, don't infer relationships from titles alone.
- **Formulas/code blocks must define their terms.** When introducing pipeline-specific jargon
  (a config key, an API call, a term like "composition arc"), explain what it means in the
  surrounding prose the first time it appears in a given page.
- **File names and in-text numbering are decoupled.** Renaming a file must never change prose
  references like "Rozdział 5" or "Dodatek K" — those describe the book's structure, not the file
  on disk.
- **Stub → real chapter**: when writing a stub's real content, replace the `.panel.practice`
  "status" block entirely (don't leave "not written yet" language anywhere), keep the existing
  `.site-nav` (and `.series-nav` for O–S) as-is unless the structure itself changes, and keep the
  hook sentence in `index.html` and the chapter's own `.subtitle` in sync if it's reworded.

## Navigation system

Same layers as raytracing-book, hand-authored per page, no generation script:

- **`.site-nav`**: rozdziały get `Spis treści` + `← Poprzedni` / `Następny →` in chapter order;
  dodatki get `← Spis treści` + an `↑` link up to the rozdział named in their `EXT OF`.
- **`.series-nav`**: Dodatki O–S ("Studia w praktyce") get a "Część 1–5" strip. Every part except
  the current one must be a real `<a>` link to the sibling file (current part stays a non-link
  `<span class="current">`).
- **`.deeper`** / **`.inline-deeper`**: not yet added anywhere (no real chapter content exists
  yet to anchor them to) — add these only once a chapter's actual prose has a natural anchor
  point, per raytracing-book's convention.

## Git workflow

Commit and push right after making a change in this repo, without asking for confirmation each
time — same established preference as raytracing-book. Still use judgment for anything unusually
large or risky, and never force-push or rewrite history without asking. Commit messages in this
repo avoid Polish diacritics (ASCII-safe) to sidestep Windows console/heredoc encoding issues —
page *content* always uses full, correct Polish diacritics regardless.
