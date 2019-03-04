// registering service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(function() {
      console.log('Service worker registered!');
    }).catch(function(error) {
      console.log(error);
    });
}
