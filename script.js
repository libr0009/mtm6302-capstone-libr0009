
document.addEventListener("DOMContentLoaded", function() {
    const pokeApiUrl = "https://pokeapi.co/api/v2/pokemonlimit=20";
  
    const pokemonGrid = document.getElementById('pokemon-grid');
  
    for (let i = 0; i < 20; i++) {
      const pokemonElement = document.createElement('div');
      pokemonElement.className = 'pokemon';
      pokemonGrid.appendChild(pokemonElement);
    }


  fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
  .then(response => response.json())
  .then(data => {
    data.results.forEach((pokemon, index) => {
      
      fetch(pokemon.url)
        .then(response => response.json())
        .then(pokemonData => {
          const pokemonName = pokemonData.name;
          const pokemonThumbnailUrl = pokemonData.sprites.front_default;
          const pokemonThumbnail = document.createElement('img');
          pokemonThumbnail.src = pokemonThumbnailUrl;
          const pokemonElement = document.querySelectorAll('.pokemon')[index];
          pokemonElement.appendChild(pokemonThumbnail);
          pokemonElement.appendChild(document.createTextNode(pokemonName));
        })
        .catch(error => console.error(error));
    });
  })
  .catch(error => console.error(error));

  let offset = 0;

function loadMorePokemon() {
  offset += 20; // load the next 20 pokemon
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(pokemon => {
        fetch(pokemon.url)
          .then(response => response.json())
          .then(pokemonData => {
            const pokemonName = pokemonData.name;
            const pokemonThumbnailUrl = pokemonData.sprites.front_default;
            const pokemonThumbnail = document.createElement('img');
            pokemonThumbnail.src = pokemonThumbnailUrl;
            const pokemonElement = document.createElement('div');
            pokemonElement.appendChild(pokemonThumbnail);
            pokemonElement.appendChild(document.createTextNode(pokemonName));
            document.getElementById('pokemon-grid').appendChild(pokemonElement);
          })
          .catch(error => console.error(error));
      });
    })
    .catch(error => console.error(error));
}

document.getElementById('loading-btn').addEventListener('click', loadMorePokemon);



const modal = document.getElementById('pokemon-modal');
const caughtPokemonList = JSON.parse(localStorage.getItem('caughtPokemonList')) || [];

async function getPokemonData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function displayPokemon() {
  const pokemonData = await getPokemonData(pokeApiUrl);

  pokemonData.results.forEach(async (result) => {
    const pokemon = await getPokemonData(result.url);
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    pokemonElement.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <span class="name">${pokemon.name}</span>
    `;
    pokemonGrid.appendChild(pokemonElement);

    pokemonElement.addEventListener('click', async () => {
      const pokemonDetails = await getPokemonData(pokemon.url);

      const modalContent = `
        <div class="modal-header">
          <span class="close">&times;</span>
          <h2>${pokemon.name}</h2>
        </div>
        <div class="modal-body">
          <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}" />
          <p>Height: ${pokemonDetails.height}</p>
          <p>Weight: ${pokemonDetails.weight}</p>
          <p>Type: ${pokemonDetails.types[0].type.name}</p>
          <button id="mark-as-caught-btn" ${caughtPokemonList.includes(pokemon.name) ? 'disabled' : ''}>${caughtPokemonList.includes(pokemon.name) ? 'Caught!' : 'Mark as caught'}</button>
        </div>
      `;
      modal.innerHTML = modalContent;

      const markAsCaughtBtn = modal.querySelector('#mark-as-caught-btn');
      markAsCaughtBtn.addEventListener('click', () => {
        if (!caughtPokemonList.includes(pokemon.name)) {
          caughtPokemonList.push(pokemon.name);
          localStorage.setItem('caughtPokemonList', JSON.stringify(caughtPokemonList));
          markAsCaughtBtn.innerHTML = 'Caught!';
          markAsCaughtBtn.disabled = true;
        }
      });

      const closeModalBtn = modal.querySelector('.close');
      closeModalBtn.addEventListener('click', () => {
        modal.style.display = "none";
      });

      modal.style.display = "block";
    });
  });
}

displayPokemon();

});