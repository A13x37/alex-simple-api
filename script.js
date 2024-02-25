document.querySelector('#search').addEventListener("click", search);


async function search() {
    let pokemon = document.querySelector('#pokemonName').value;
    pokemon = pokemon.toLowerCase();
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    
    document.querySelector('.infoContainer').innerHTML = `
    <div>
        <img id="pokeImg" src="${data.sprites.other["official-artwork"].front_default}">
    </div>
    <div class="pokemonDescription">
        <h1>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
        <p>Pokemon ID: ${data.id}</p>
    </div>
    `;
}