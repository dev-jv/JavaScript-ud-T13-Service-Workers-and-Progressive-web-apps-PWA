if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then( resgistrado => console.log('Installed correctly...', resgistrado ))
    .catch( error => console.log('Failed installation...', error))
} else {
    console.log('Service Workers not supported');
}