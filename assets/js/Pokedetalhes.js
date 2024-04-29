const pokemonDados = document.getElementById("detailPokemon");
const pokemonDadosDominio = document.getElementsByClassName("botao_detalhe");
const pgDefault = document.getElementById("defaultOpen");
const aboutpg = document.getElementById("about");
const statuspg = document.getElementById("status");

pokeApi.loadDetalhes = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}


pgDefault.click();

function openDetails(event, name){
    var i, botao_detalhe, subdetails;
    
    subdetails= document.getElementsByClassName('subdetails');
    for(i=0; i<botao_detalhe.length;i++){
        subdetails[i].style.display="none";
    }

    botao_detalhe = document.getElementsByClassName("botao_detalhe");
    for(i=0; i<botao_detalhe.length;i++){
        botao_detalhe[i].className = botao_detalhe[i].className.replace(" active ", "");
    }

    document.getElementById(name).style.display="block";
    event.currentTarget.className += "active";
}


function loadDetalhes(pokemon) {
    pokemonData.getPoke().then((pokemon = []) =>{
    const html01 = pokemon.map((pokemon) => 
    `
        <div class="pokemon">
        <div class="icons">
            <i class="fa-solid fa-arrow-left"></i>
            <i class="fa-regular fa-heart"></i>
        </div>
        <div class="basicInfo">
                <span class="name">#${pokemon.number}</span>
                <span class="number">${pokemon.name}</span>
            <div class="detail">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        </div>
    </div> <!--pokemon-->

    <div class="imgPokemon">
        <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>

    <div class="pagination_details">
        <div class="tab_links">
                <button id="defaultOpen" class="botao_detalhe" onclick="openDetails(event, 'about')">About</button>
                <button class="botao_detalhe" onclick="openDetails(event, 'baseStats')">Base Stats</button>
                <button class="botao_detalhe" onclick="openDetails(event, 'moves')">Moves</button>
        </div><!--tab_links-->
            <div id="about" class="subdetails">
                    <div class="types">
                        <ol class="atributos">
                            <li class="atributo">
                                <h3>heght</h3>
                                <p>${pokemon.height}</p>
                                <h3>weight</h3>
                                <p>${pokemon.weight}</p>
                                <h3>abilities</h3>
                                <p>overgrow, chlorophyll</p>
                                <h2>Breeding</h2>
                                <p></p>
                                <h3>Egg groups</h3>
                                <p>monster</p>
                                <h3>Egg Cycle</h3>
                                <p>grass</p>
                            </li>
                        </ol>
                    </div><!--types-->
            </div><!--subdetails-->

            <div id="status" class="subdetails">
                <div class="types">
                    <ol class="atributos">
                        <li class="atributo sts">
                            <h3>HP</h3>
                            <p>45</p>
                            <div class="progress-status"> 
                                <div class="progressbar">

                                </div>

                            </div>
                            <h2>Type defenses</h2>
                            <p></p>
                            <p></p>
                            <h3>Type</h3>
                            <p>87.5%</p>
                        </li>
                    </ol><!--atributos-->
                </div><!--types-->
        </div><!--subdetails-->
    </div><!--pagination_details-->
    `
    ).join('')
    pokemonDados.innerHTML += newHtml})
}

loadDetalhes(pokemon);

function loadPokemonDetails(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokeApiDetails).join('')
        detailPokemon.innerHTML += newHtml
    })
}