# WordLand

A playful, audio-first English-learning world for children aged 4–6
(see `WordLand_Project_Plan.pdf`).

## Run it

```bash
npm install
npm run dev      # opens http://localhost:5173
npm run build    # production build in dist/
```

In WebStorm, run the `dev` script from `package.json` (or the "WordLand (dev
server)" run configuration). Don't run `.jsx` files directly with Node.

## Voice

Every line Bobo says is a recorded MP3 in `public/audio/voice/`, generated
locally with the open-source Kokoro neural voice (Apache-2.0):

```bash
npm run voice                 # record new or changed lines
npm run voice -- --list       # show every line
npm run voice -- --voice=af_bella --force   # switch voice, re-record all
```

Run it after changing any text in `src/data/`. Lines without a recording fall
back to the browser's built-in voice.

## Structure

- `src/data/` – word lists per world, `worlds.js`, and `script.js` (everything Bobo says)
- `src/pages/` – Home, WorldMap, World, LearnWord, ParentCorner
- `src/games/` – Listen and Tap, Match
- `src/components/` – Bobo, artwork (`art/`), buttons, star counter
- `src/lib/` – audio, sound effects, progress (localStorage), word states
