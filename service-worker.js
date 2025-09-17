// Colo Demo — Service Worker (offline básico)
const CACHE = 'colo-gestante-v1';
const ASSETS = [
  'index.html', 'dashboard.html', 'style.css', 'app.js', 'data.js',
  'assets/logo.png', 'assets/img/hero4.jpg', 'assets/img/hero5.jpg', 'assets/img/hero6.jpg',
  'assets/icons/icon-192.png', 'assets/icons/icon-512.png',
  'manifest.webmanifest'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (ASSETS.some(a => url.pathname.endsWith(a))) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  } else {
    e.respondWith(fetch(e.request).catch(() => caches.match('dashboard.html')));
  }
});
