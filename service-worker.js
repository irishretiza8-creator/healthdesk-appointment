const CACHE_NAME = "healthdesk-v3";

const FILES_TO_CACHE = [
"./",
"./index.html",
"./login.html",
"./signup.html",
"./dashboard.html",
"./bookappointment.html",
"./myappointment.html",
"./style.css",
"./script.js",
"./service-worker.js"
];

/* =========================
INSTALL
========================= */

self.addEventListener("install", event => {

```
event.waitUntil(
    caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
);

self.skipWaiting();
```

});

/* =========================
ACTIVATE
========================= */

self.addEventListener("activate", event => {

```
event.waitUntil(

    caches.keys().then(cacheNames => {

        return Promise.all(

            cacheNames
                .filter(cacheName => {
                    return cacheName !== CACHE_NAME;
                })
                .map(cacheName => {
                    return caches.delete(cacheName);
                })

        );

    })

);

self.clients.claim();
```

});

/* =========================
FETCH
========================= */

self.addEventListener("fetch", event => {

```
/* Only handle GET requests */
if (event.request.method !== "GET") {
    return;
}

/*
   HTML pages:
   Try the internet first so updated pages
   appear immediately.
*/

if (event.request.mode === "navigate") {

    event.respondWith(

        fetch(event.request)
            .then(response => {

                return response;

            })
            .catch(() => {

                return caches.match(event.request)
                    .then(cachedResponse => {

                        return cachedResponse ||
                            caches.match("./index.html");

                    });

            })

    );

    return;
}


/*
   CSS, JS and other files:
   Use cache first for offline support.
*/

event.respondWith(

    caches.match(event.request)
        .then(cachedResponse => {

            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request)
                .then(response => {

                    if (
                        !response ||
                        response.status !== 200
                    ) {
                        return response;
                    }

                    const responseClone =
                        response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {

                            cache.put(
                                event.request,
                                responseClone
                            );

                        });

                    return response;

                });

        })

);
```

});
