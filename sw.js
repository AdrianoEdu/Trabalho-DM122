const staticCache = "app-shell-v1";

const assetsToCache = [
    'images/favorite/favorite.webp',
    'images/favorite/no-favorite.png',
    'images/pokeball/pokeball.png',
    'images/state/blank.png',
    'images/validate/correct.svg',
    'images/validate/false.svg',
    'images/type/bug.webp',
    'images/type/dark.webp',
    'images/type/dragon.webp',
    'images/type/electric.webp',
    'images/type/fairy.png',
    'images/type/fighting.webp',
    'images/type/fire.webp',
    'images/type/flying.webp',
    'images/type/ghost.webp',
    'images/type/grass.webp',
    'images/type/ground.webp',
    'images/type/ice.webp',
    'images/type/normal.webp',
    'images/type/poison.webp',
    'images/type/psychic.webp',
    'images/type/rock.webp',
    'images/type/steel.webp',
    'images/type/water.webp',
    'app.js',
    'type.js',
    'index.html',
    'style.css',
    'popup-style.css',
    'favicon.ico',
    '/'
];

async function cacheStaticAssets() {
    const cache = await caches.open(staticCache);
    return cache.addAll(assetsToCache);
}

async function networkFirst(request) {
    try {
        return await fetch(request);
    } catch (error) {
        console.log("[Service Worker] network error", error);
        const cache = await caches.open(staticCache);
        return cache.match(request);
    }
}

self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing service worker");
    event.waitUntil(cacheStaticAssets());
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    console.log("[Service Worker] Activating service worker!");
    return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    console.log("[Service Worker] Fetch event worker!", event.request.url);
    event.respondWith(networkFirst(event.request));
});
