const params = new URLSearchParams(window.location.search)
const id = params.get("id")



function transformData(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    let types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    let [type] = types

    pokemon.types = types
    pokemon.type = type
 
    const abilities= pokeDetail.abilities.map((abltSlot)=> abltSlot.ability.name)
    const [ability] = abilities
    pokemon.abilities = abilities
    pokemon.ability = ability

    const stats = pokeDetail.stats.map((statsSlot)=> statsSlot.stat.name)
    let [stat] = stats
    const statsNumber = pokeDetail.stats.map((baseSlot)=> baseSlot.base_stat)
    let [statNumber] = statsNumber
    pokemon.stats = stats
    pokemon.stat = stat

    pokemon.statsNumber = statsNumber
    pokemon.statNumber = statNumber
    pokemon.types = types
    pokemon.type = type
    const moves = pokeDetail.moves.map((moveSlot)=> moveSlot.move.name)
    const [move] = moves

    pokemon.moves = moves
    pokemon.move = move

    pokemon.name = pokeDetail.species.name
    
    return pokemon
}

function convertPokemonToHtml(infos){
    return  document.body.innerHTML = `
    <div id="detailPokemon"class="interface">
        <div class="pokemon">
            <div class="icons">
                <a href="index.html"><i class="fa-solid fa-arrow-left"></i></a>
                <button class="heart"><i class="fa-regular fa-heart"></i></button>
            </div>
            <div class="basicInfo">
                <span class="name">${infos.name}</span>
                <span class="number">#${infos.number}</span>
                <div class="detail">
                    <ol class="types">
                                ${infos.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
            </div>
        </div> <!--pokemon-->

        <div class="imgPokemon">
        <img src="${infos.photo}" alt="${infos.name}">
        </div>

        <div class="pagination_details">
            <div class="tab_links">
                <button  class="botao-detalhe active" content-id="about">About</button>
                <button class="botao-detalhe" content-id="status")">Base Stats</button>
                <button class="botao-detalhe" content-id="moves")">Moves</button>
            </div><!--tab_links-->
            <div id="about" class="subdetails">
                <div class="types">
                    <ol  class="atributos">
                        <li class="atributo">
                            <div class="info"><h3>heght</h3>
                            <p>${infos.height}</p>
                            <h3>weight</h3>
                            <p>${infos.weight}</p></div>
                            <div class="conteiner-ability">
                            <h3 ">abilities</h3>
                            ${infos.abilities.map((ability) => `<p class="ability ${ability}">${ability}</p>`).join('')}</div>
                        </li>
                    </ol>
                </div><!--types-->
            </div><!--subdetails-->

            <div id="status" class="subdetails">
                <div class="types">
                    <ol  class="atributos" >
                        <li class="atributo sts">
                            <div class="nomeSts">
                                ${infos.stats.map((stat) => `<h3 class="stat ${stat}">${stat}</h3>`).join('')}
                            </div>
                            <div class="numSts">
                            ${infos.statsNumber.map((statNumber) => `<p class="statNumber">${statNumber}</p>
                            <div class="progress-container">
                            <div class="progress-bar-${statNumber}"></div>
                            </div>`).join('')}
                            </div> 
                        </li>
                    </ol><!--atributos-->
                </div><!--types-->
            </div><!--subdetails-->

            <div id="moves" class="subdetails">
                <div class="types">
                    <ol  class="atributos">
                        <li class="atributo move">
                        ${infos.moves.map((move) => `<h3 class="move ${move}">${move}</h3>`).join('')}
                        </li>
                    </ol><!--atributos-->
                </div><!--types-->
            </div><!--subdetails-->
        </div><!--pagination_details-->
    </div>
    </div>`
}

function scriptAdd() {
    const scriptElement = document.createElement("script")
    scriptElement.src = "assets/js/tabs.js"
    scriptElement.async = true
    document.body.appendChild(scriptElement)
}

function getPokeData (number) {
    const result = fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
    .then(res => res.json())
    .then(transformData)
    return result
}

function displayDetails(id) {
    const finalResult = getPokeData(id)
    .then((pokeData = []) => {
        const detailsPage = convertPokemonToHtml(pokeData)
        scriptAdd()
    })
}

displayDetails(id)

