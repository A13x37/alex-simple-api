// Note: workers can't work with DOM
self.onmessage = function(message) {
    fetch(`https://pokeapi.co/api/v2/pokemon/kyogre`)
    .then((response) => {
        self.postMessage(response.status)
    });
}
