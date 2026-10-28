// Publishes the built site (dist/) to the gh-pages branch, which GitHub Pages
// serves. Run through `npm run deploy` (which builds first).
//
// It replaces the gh-pages package, whose clean-up step passes every file
// name on one command line: with a thousand voice clips that is too long for
// Windows (spawn ENAMETOOLONG). Here git itself finds what was added and
// removed, however many files there are.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const BRANCH = 'gh-pages'
const git = (args, cwd = root) => execFileSync('git', args, { cwd, stdio: ['ignore', 'pipe', 'inherit'] }).toString().trim()

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('No dist/index.html: run `vite build` first.')
  process.exit(1)
}

const source = git(['rev-parse', '--short', 'HEAD'])
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'wordland-pages-'))
try {
  git(['fetch', 'origin', BRANCH])
  git(['worktree', 'add', '--force', '--detach', work, `origin/${BRANCH}`])

  // Swap the old site for the new one (keeping only the worktree's .git file).
  for (const name of fs.readdirSync(work)) {
    if (name !== '.git') fs.rmSync(path.join(work, name), { recursive: true, force: true })
  }
  fs.cpSync(dist, work, { recursive: true })
  fs.writeFileSync(path.join(work, '.nojekyll'), '') // serve files as they are

  git(['add', '--all'], work)
  if (!git(['status', '--porcelain'], work)) {
    console.log('Nothing changed: the site is already up to date.')
  } else {
    git(['commit', '--quiet', '-m', `Deploy ${source}`], work)
    git(['push', '--quiet', 'origin', `HEAD:${BRANCH}`], work)
    console.log(`Published ${source} to ${BRANCH}.`)
  }
} finally {
  git(['worktree', 'remove', '--force', work])
}
