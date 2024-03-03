const maxResults = 1000;
const pokemonList = document.querySelector('.pokemon-list');
const searchPokemon = document.querySelector('#search-pokemon');
const numberFilter = document.querySelector('#number');
const nameFilter = document.querySelector('#name');
const sortBtn = document.querySelector('#btn');
const sortBox = document.querySelector('.sort');
let storePokemon = [];
searchPokemon.addEventListener("keyup", updateList);
sortBtn.addEventListener("click", openSortBox);
fetchResults();


// Gets the results=
function fetchResults() {
    const resultsAPI = `https://pokeapi.co/api/v2/pokemon?limit=${maxResults}`;
    fetch(resultsAPI)
    .then((response) => response.json())
    .then((data) => {
        storePokemon = data.results;
        displayPokemon(storePokemon);
    });
}


// Displays the pokemon
function displayPokemon(pokemon) {
    pokemonList.innerHTML = ""

    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];
        const listItem = document.createElement('div');
        listItem.className = "list-item";
        listItem.innerHTML = `
            <div class="id">
                <p>#${pokemonID}</p>
            </div>
            <div class="img">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png">
            </div>
            <div class="name">
                <p>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            </div>
        `;

        //fetchPokemon(pokemonID);
        pokemonList.appendChild(listItem);
    });
}


// Updates the displayed pokemon
function updateList() {
    const search = searchPokemon.value.toLowerCase();
    let filter;

    if (numberFilter.checked) {
        filter = storePokemon.filter((pokemon) => {
            const pokemonID = pokemon.url.split("/")[6];
            return pokemonID.startsWith(search);
        });
    } else if (nameFilter.checked) {
        filter = storePokemon.filter((pokemon) => {
            return pokemon.name.toLowerCase().startsWith(search);
        }); 
    } else {
        filter = storePokemon;
    }
    
    displayPokemon(filter);
}


let isOpen = false;
function openSortBox() {
    if (isOpen == false) {
        sortBox.classList.add('openSort');
        isOpen = true;
    } else if (isOpen == true) {
        sortBox.classList.remove('openSort');
        isOpen = false;
    }
}