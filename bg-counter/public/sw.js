const GHPATH = '/bg-counter/';
const APP_PREFIX = 'bgc_';
const VERSION = 'version_004';


const CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', async function (e) {
    console.log('Fetch request : ' + e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                console.log('Responding with cache : ' + e.request.url);
                return request
            } else {
                console.log('File is not cached, fetching : ' + e.request.url);
                return fetch(e.request)
            }
        })
    )
})

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            fetch('./assets.json')
                .then((response) => response.json())
                .then((assets) =>
                    cache.addAll(assets.map((asset) => GHPATH + asset))
                )
            }
        )
    )
})

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            const cacheWhitelist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX)
            })
            cacheWhitelist.push(CACHE_NAME);
            return Promise.all(keyList.map(function (key, i) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    console.log('Deleting cache : ' + keyList[i] );
                    return caches.delete(keyList[i])
                }
            }))
        })
    )
})
