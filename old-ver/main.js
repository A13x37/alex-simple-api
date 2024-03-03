document.querySelector('.search').addEventListener("click", search)
const worker = new Worker('worker.js');

async function search() {
    worker.postMessage("Request Recieved");

    let pokemon = document.querySelector('#pokemon').value;
    pokemon = pokemon.toLowerCase();
    const nameURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const promise1 = await fetch(nameURL);
    const idURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const promise2 = await fetch(idURL);

    Promise.any([promise1, promise2])
    .then((response) => response.json())
    .then((data) => {
        document.querySelector('.infoContainer').innerHTML = `
    <div>
        <img class="pokeImg" src="${data.sprites.other["official-artwork"].front_default}">
    </div>
    <div class="pokemonDescription">
        <h1>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
        <p>Pokemon ID: ${data.id}</p>
    </div>
    `;
    });    
}


worker.onmessage = function(message) {
    alert(message);
}
