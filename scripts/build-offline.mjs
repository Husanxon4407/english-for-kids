// After `vite build`: writes dist/offline-files.json, the list of files the app
// saves on the device so it plays instantly and works offline (see
// src/lib/offline.js and public/sw.js). Songs are listed apart: they are big,
// so each is saved when first played, or all at once from the Grown-ups corner.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SKIP = new Set(['sw.js', 'offline-files.json', '.nojekyll'])

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [path.relative(dist, full).split(path.sep).join('/')]
  })
}

// The app first, then the music under every screen, then the voices.
const ORDER = [/^index\.html$/, /^assets\//, /^music\/bgm-/, /^audio\/voice\//, /^audio\/uz\//, /./]
const rank = (file) => ORDER.findIndex((pattern) => pattern.test(file))
const entry = (file) => ({ path: file, size: fs.statSync(path.join(dist, file)).size })

const all = walk(dist).filter((file) => !SKIP.has(file))
const isSong = (file) => file.startsWith('music/') && !file.startsWith('music/bgm-')
const files = all.filter((file) => !isSong(file)).sort((a, b) => rank(a) - rank(b)).map(entry)
const songs = all.filter(isSong).sort().map(entry)

fs.writeFileSync(path.join(dist, 'offline-files.json'), JSON.stringify({ files, songs }))
const mb = (list) => (list.reduce((sum, f) => sum + f.size, 0) / 1e6).toFixed(1)
console.log(`offline-files.json: ${files.length} files (${mb(files)} MB), ${songs.length} songs (${mb(songs)} MB)`)
