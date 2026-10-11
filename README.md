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

## Publish

```bash
npm run deploy   # builds and pushes the site to the gh-pages branch
```

Live at https://husanxon4407.github.io/english-for-kids/ (GitHub Pages,
source: "Deploy from a branch" → `gh-pages` / root).

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

### Story voice

Stories are told with more feeling than the rest of the app. Every story
sentence is split into pieces with a mood (`say` in `src/data/stories.js`).
`npm run voice` acts them with the local voice (`scripts/lib/acting.mjs`);
with an Azure Speech key in `.env.local` (see below),

```bash
npm run voice:story           # record the stories with an expressive online voice
```

records them with real speaking styles instead, and `npm run voice` then
leaves those recordings alone.

### Uzbek helper

The optional Uzbek helper (word meanings and instructions in Uzbek) uses a
second set of clips in `public/audio/uz/`, recorded with Microsoft's neural
Uzbek voice through the Azure Speech service. Put your key in `.env.local`
(ignored by git):

```
AZURE_SPEECH_KEY=your-key
AZURE_SPEECH_REGION=westeurope
```

```bash
npm run voice:uz              # record new or changed lines in src/data/uzbek.js and stories.js
```

The Uzbek switch stays hidden in the app until these clips exist.

## Songs and music

The songs in `public/music/` are sung recordings from Pixabay Music, used
under the Pixabay Content License; artists and source links are in
`src/data/songs.js` and shown in the Grown-ups' corner. Each song's `cues`
say which pictures appear while it plays.

The soft background music (`public/music/bgm-*.mp3`, also from Pixabay) is
played by `src/lib/bgm.js`: one tune under the stories, one on the map and in
the games. It drops lower whenever Bobo speaks and can be switched off in the
Grown-ups' corner.

## Structure

- `src/data/stories.js`, `songs.js`, `uzbek.js` – Story Time, Song Time and the Uzbek helper.
  A story is a list of beats (one sentence + who is on the stage); `components/StoryStage.jsx` acts them out.
  Each song names its world and its backdrop (`components/SongStage.jsx`).

- `src/data/` – word lists per world, `worlds.js`, and `script.js` (everything Bobo says)
- `src/pages/` – Home, WorldMap, World, LearnWord, ParentCorner
- `src/games/` – Listen and Tap, Match, Memory, Puzzle, Pop the Balloon, Star Challenge.
  Each world has ten words; a round uses about six (`pickRoundItems` in `src/lib/review.js`)
- `src/components/` – Bobo, artwork (`art/`), buttons, star counter
- `src/lib/` – audio, background music (`bgm.js`), sound effects, progress (localStorage), word states
