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

This is a living project, not a one-shot publication. Every page now carries real content, but most
of it sits at *introduction depth* (roughly 500–800 words, prose + one static diagram + glossary):
the reader learns **that** a mechanism exists and why, without ever seeing it up close. The current
phase is therefore **deepening**, not filling in blanks — see "Depth kit" below. The USD path
(Rozdział 11 + Dodatki B, C, S) is the worked reference for what a deepened topic looks like; copy
its shape rather than inventing a new one. Don't build rigid generated structures (e.g.
auto-generated index files) that would need manual rebuilding on every content change.

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
assets/interactive.js                      — `.vec[data-tip]` tooltips, detail modals, plus
                                             `toggleLayer()` (chips switching SVG diagram layers)
                                             and `revealAnswer()` (.exercise). Pages that use any
                                             of it must link the script themselves.
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
  diagrams. Toggleable layers use `toggleLayer()`: wrap each layer in `<g class="ray-group"
  data-layer="x">` and add `<button class="chip" data-layer="x" aria-pressed="true">` in a
  `.legend` below the SVG. Without JS every layer stays lit, so the diagram must read statically.
- Color tokens: **amber = artist-facing data and artifacts, cyan = mechanism/tool/code, violet =
  metadata, variants, tracking**; `--raster` is reserved for the "before/without pipeline" side of
  a comparison and for diagnostics. Pages written before this rule (most of the book) still use the
  colors ad hoc — align them when you touch a page, don't sweep separately.

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

## Depth kit — how a topic goes past its introduction

Six devices, all of which have ready CSS in `assets/style.css`. Pick what the topic needs; a page
past introduction depth usually carries three or four. Worked examples of all six: `rozdzialy/
rozdzial-11-usd.html` and `dodatki/dodatek-b-usd-w-glebi.html`.

1. **Real artifact** (`.listing` + `.listing-label`, spans `.c` comment / `.s` string / `.k`
   keyword) — an actual file fragment (`.usda`, `package.py`, an OCIO config, a farm job JSON),
   never a paraphrase. Every new syntax token gets explained in the prose next to it; the hardest
   two or three also get `.vec[data-tip]` tooltips.
2. **Running example** (`.worked`) — the book's canonical shot is `show DEMO / seq010 / shot0100 /
   asset hero_char`; reuse it instead of inventing new names. `.worked` walks one concrete case
   step by step and ends with `.result` plus a `.check` line naming the command that verifies it.
3. **Failure and diagnosis** (`.panel.debug`, with `.symptom` / `.cause` / `.check` per `.case`) —
   what breaks, the real command that identifies it, the actual cause. Aim for failures readers
   have already hit.
4. **Decision and trade-off** (`.table-wrap` > `.compare-table`, `.table-note`) — including an
   explicit "when NOT to use this". Every table must sit inside `.table-wrap` so it scrolls itself.
5. **Interactive diagram** (`.legend` + `.chip[data-layer]` + `toggleLayer()`).
6. **Depth navigation** (`.inline-deeper`, `.deeper`).

Two more, unused so far but ready: `.exercise` + `.reveal-btn[data-answer]` + `.answer` (used in
Dodatek B) and `.diagram-controls` (sliders, nothing uses it yet).

Claims of fact — dates, product names, who built what — get verified (WebSearch) before they go in.
Performance numbers that can't be sourced are written as an explicitly labelled illustration of
proportion, never as a measurement.

## Navigation system

Same layers as raytracing-book, hand-authored per page, no generation script:

- **`.site-nav`**: rozdziały get `Spis treści` + `← Poprzedni` / `Następny →` in chapter order;
  dodatki get `← Spis treści` + an `↑` link up to the rozdział named in their `EXT OF`.
- **`.series-nav`**: Dodatki O–S ("Studia w praktyce") get a "Część 1–5" strip. Every part except
  the current one must be a real `<a>` link to the sibling file (current part stays a non-link
  `<span class="current">`).
- **`.deeper`** / **`.inline-deeper`**: in use on the USD path. `.inline-deeper` goes inline right
  where a chapter deliberately simplifies ("↓ Dodatek B: …"); the `.deeper` block goes after the
  glossary and lists every page that extends this one. Add both whenever a page grows past
  introduction depth.

## Git workflow

Commit and push right after making a change in this repo, without asking for confirmation each
time — same established preference as raytracing-book. Still use judgment for anything unusually
large or risky, and never force-push or rewrite history without asking. Commit messages in this
repo avoid Polish diacritics (ASCII-safe) to sidestep Windows console/heredoc encoding issues —
page *content* always uses full, correct Polish diacritics regardless.
