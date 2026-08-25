# Pipeline dla Artystów Technicznych

Książka HTML o budowie pipeline'u VFX i animacyjnego, napisana z myślą o artystach technicznych —
nie o programistach piszących narzędzia od zera, tylko o osobach, które chcą rozumieć, jak w dużym
studiu (Weta Digital, ILM, Framestore, Pixar, DNEG/MPC i inni) tysiące osobnych plików zamieniają
się w jeden spójny film.

22 rozdziały główne prowadzą od podstaw (czym jest pipeline, anatomia produkcji) przez dane i
wersjonowanie, wymianę plików między programami, budowę customowych narzędzi, aż po skalowanie
produkcji i ludzi, którzy to wszystko utrzymują. Dodatki A–V rozwijają wybrane tematy głębiej niż
pozwala na to rozdział główny — łącznie z serią „Studia w praktyce" (Dodatki O–S), pokazującą, jak
te same problemy rozwiązały u siebie konkretne studia. Osobny pomocnik praktyczny prowadzi krok po
kroku przez budowę minimalnego, prawdziwego narzędzia pipeline'owego.

Siostrzany projekt [raytracing-book](https://bartoszskrzypiec.github.io/raytracing-book/) — ta
książka używa dokładnie tego samego systemu wizualnego, przemianowanego na słownictwo pipeline'u.

**Wersja live:** https://bartoszskrzypiec.github.io/pipeline-book/
*(jeśli link nie działa, GitHub Pages nie jest jeszcze włączone dla tego repo —
Settings → Pages → Deploy from a branch → `main` / `/ (root)`)*

## Jak to działa

To są czyste, statyczne pliki HTML z inline'owanym SVG i wspólnym arkuszem stylów w
`assets/style.css`. Zero zależności, zero build stepu, zero npm — otwierasz plik w przeglądarce
(lub całość na GitHub Pages) i działa.

```
index.html              — spis treści
podstawy/                — primer "Zanim zaczniesz" (repo, terminal, zmienna środowiskowa)
rozdzialy/                — rozdziały główne 1–22
dodatki/                 — dodatki A–V, każdy rozwija konkretny rozdział lub temat
pomocnik/                — pomocnik praktyczny: zbuduj mini-pipeline od zera
assets/style.css         — wspólny dark theme dla wszystkich stron
```

## Status projektu

To jest żywy projekt, nie jednorazowa publikacja — dokładnie jak raytracing-book. Na start istnieje
pełna struktura i spis treści: każdy rozdział i dodatek ma już ustalony tytuł, miejsce w książce i
jednozdaniową zajawkę, ale **treść jest dopiero pisana** — sesja po sesji, rozdział po rozdziale.
Jeśli otwierasz jakąś stronę i widzisz tylko panel „W przygotowaniu", to nie błąd — po prostu
jeszcze do niej nie doszliśmy.
