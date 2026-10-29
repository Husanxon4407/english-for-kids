// WordLand's service worker: plays every saved file from the device, so Bobo's
// voice and the music start at once — and the whole app works offline.
//
// The files themselves are saved by the page (src/lib/offline.js) into the
// cache below; this worker only answers requests from it:
//   - the page itself: fresh from the internet when it answers quickly (so
//     updates arrive), otherwise the saved copy;
//   - everything else: the saved copy, or the internet (and then it is saved).
const CACHE = 'wordland-files'
const PAGE_TIMEOUT = 3000

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return
  if (request.mode === 'navigate') event.respondWith(page(request))
  else event.respondWith(file(request))
})

async function page(request) {
  const cache = await caches.open(CACHE)
  const saved = (await cache.match(request, { ignoreSearch: true })) || (await cache.match(new URL('./', self.registration.scope).href))
  // `no-cache`: always ask the server, since GitHub Pages lets the browser
  // keep the page for ten minutes and a new version would wait that long.
  const fresh = fetch(request.url, { cache: 'no-cache' }).then((response) => {
    if (response.ok) cache.put(new URL('./', self.registration.scope).href, response.clone())
    return response
  })
  if (!saved) return fresh
  // Wait a little for a fresh copy; on a slow or missing connection use the saved one.
  const late = new Promise((resolve) => setTimeout(() => resolve(saved), PAGE_TIMEOUT))
  return Promise.race([fresh.catch(() => saved), late])
}

async function file(request) {
  const cache = await caches.open(CACHE)
  const url = request.url.split('#')[0]
  let response = await cache.match(url, { ignoreSearch: true })
  // A song not saved yet: stream it as usual (it is saved in the background later).
  if (!response && request.headers.has('range')) return fetch(request)
  if (!response) {
    try {
      response = await fetch(url)
    } catch {
      return Response.error()
    }
    // Keep what the app will need again (a new version's files, for instance).
    if (response.ok && /\/(assets|audio|music|images)\//.test(url)) cache.put(url, response.clone())
  }
  return partOf(request, response)
}

// Audio players ask for a byte range ("Range: bytes=0-"); Safari will not play
// a saved sound unless it gets exactly that part back.
async function partOf(request, response) {
  const range = request.headers.get('range')
  if (!range || response.status !== 200) return response
  const body = await response.arrayBuffer()
  const match = /bytes=(\d*)-(\d*)/.exec(range)
  const start = match && match[1] ? Number(match[1]) : 0
  const end = match && match[2] ? Math.min(Number(match[2]), body.byteLength - 1) : body.byteLength - 1
  return new Response(body.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${body.byteLength}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes',
    },
  })
}
