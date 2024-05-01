const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const btnDetalhes = document.getElementById("pokeDetails")
var newPage;

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <button id="pokeDetails" type = "button" onclick="loadNewPage("${pokemon.nuber}")">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                            <img src="${pokemon.photo}"
                                 alt="${pokemon.name}">
                        </div>
            </button>
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

function loadNewPage(id){
    newPage= window.open('newpage.html', 'newpage', '', '')
    pokeApi.getPokeData(id).then((atributos= []) =>{
        const newPageHtml = atributos.map(loadDetalhes).join('')
        console.log(newPageHtml)
        newPageHtml += pokemonDados.innerHTML
        console.log(newPageHtml)
        return newPage.document.body.appendChild(newPageHtml)
        })
}

