const nombreCache = 'apv-v10';
const archivos = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'  
];






// Cuando se instala el Service Worker
self.addEventListener('install', e => {
    console.log('Service Worker installed');
    // console.log(e);

    e.waitUntil( // Espera hasta que se hayan descargado todos los caches
        caches.open(nombreCache)
            .then( cache => {
                console.log('cacheando');
                cache.addAll(archivos) // addAll / add
            })

    )
})

// Activar el Service worker
self.addEventListener('activate', e => {
    console.log('Service Worker activated');
    // console.log(e);

    e.waitUntil(
        caches.keys()
            .then( keys => {
                // console.log(keys);
                keys
                    .filter( key => key !== nombreCache)
                    .map( key => caches.delete(key))
            })
    )


})

// Evento fetch para descargar archivos estaticos
self.addEventListener('fetch', e => {
    console.log('Fetch', e);
    
    e.respondWith(
        // caches.match(e.request)
            // .then( respuestaCache => {
            //     return respuestaCache
            // })
            // .catch( () => caches.match('/error.html'))

        caches
            .match(e.request)
            .then(cacheResponse => (cacheResponse? cacheResponse : caches.match('error.html')))
    );

})
