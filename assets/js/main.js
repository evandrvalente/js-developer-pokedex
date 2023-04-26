const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

const modal = document.getElementById('modal');
const fade = document.getElementById('fade');

function toggleModal(){
    modal.classList.toggle("hide");
    fade.classList.toggle("hide")
}

async function loadModal(id){
    const info = document.getElementById('modal-body')
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const response = await fetch(url)
    const pokemon = await response.json()
    info.innerHTML = `
    <h2>${pokemon.name}</h2>
    
    <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">

    <ul>
        <li>HP ${Math.floor((Math.random() * pokemon.stats[0].base_stat) + 1)}/${pokemon.stats[0].base_stat}</li>
        <li>XP ${pokemon.base_experience}</>
        <li>Peso ${(pokemon.weight)/10} kg</li>
        <li>Altura ${(pokemon.height)/10} m</li>
    </ul>
    `

    console.log(pokemon)
    toggleModal()
}

const closeModalButton = document.getElementById('close-modal')

closeModalButton.addEventListener('click', ()=>{
    toggleModal()
})

fade.addEventListener('click', ()=>{
    toggleModal()
})

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <button id="open-modal" class="btn-modal" onclick="loadModal(${pokemon.number})">Detalhes</button>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
        
    `
    
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
