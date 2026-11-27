const CACHE_NAME = 'skku-kr3-v3';
const ASSETS = ['./', './index.html', './manifest.json'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || e.request.url.includes('script.google.com')) return;
  e.respondWith(caches.match(e.request).then((c) => c || fetch(e.request).catch(() => c)));
});
