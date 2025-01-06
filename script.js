const poke_container = document.getElementById('poke-container')
const pokemon_count = 2000
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        getPokemon(i)
    }
}

const getPokemon = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        createPokemonCard(data);
    } catch (error) {
        console.error(`Failed to fetch Pokémon with ID ${id}:`, error);
    }
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

fetchPokemons()

const searchBtn = document.getElementById('search')
const searchInput = document.getElementById('text')

searchBtn.addEventListener('click', async () => {
  const poke = searchInput.value.trim().toLowerCase()

  poke_container.innerHTML = ''

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${poke}`
    const res = await fetch(url)
    if (res.ok==false) throw Error('Pokémon not found!')
    const data = await res.json()
    createPokemonCard(data)
  } catch (error) {
    poke_container.innerHTML = `<h3 style="color: #ff1a1a;">${error.message}</h3>`
  }
})
searchInput.addEventListener('input', async () =>{
    const poke = searchInput.value.trim().toLowerCase()
    if(poke===''){
        poke_container.innerHTML = ''
        fetchPokemons()
    }
})
