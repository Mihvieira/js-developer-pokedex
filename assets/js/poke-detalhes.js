const element = document.getElementsByClassName("interface")
const params = new URLSearchParams(window.location.search)
const id = params.get("id")
const heart = document.querySelector("heart")

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

function convertPokemonToHtml(pokemon){
    const newHtml =  document.write(`
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokemon</title>

    <!-- Normalize CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Font Roboto -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap" rel="stylesheet">
    <!-- Nosso CSS -->
    <link rel="stylesheet" href="assets/css/vars.css">  
    <link rel="stylesheet" href="assets/css/global.css">
    <link rel="stylesheet" href="assets/css/pokedex.css">
    <link rel="stylesheet" href="assets/css/details.css">
    <script src="https://kit.fontawesome.com/988f4d2dd8.js" crossorigin="anonymous"></script>

    <script src="assets/js/pokemon-model.js"></script>
    <script src="assets/js/poke-detalhes.js"></script>

</head>
<body>
    <div id="detailPokemon"class="interface">
    <div class="pokemon">
    <div class="icons">
        <a href="index.html"><i class="fa-solid fa-arrow-left"></i></a>
        <button class="heart"><i class="fa-regular fa-heart"></i></button>
    </div>
    <div class="basicInfo">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
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
            <button id="defaultOpen" class="botao_detalhe" name="about">About</button>
            <button class="botao_detalhe" name="base-stats")">Base Stats</button>
            <button class="botao_detalhe" name="moves")">Moves</button>
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
                            <li>${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join('')}</li>
                            <h2>Breeding</h2>
                            <p></p>
                        </li>
                    </ol>
                </div><!--types-->
        </div><!--subdetails-->

        <div id="status" class="subdetails">
            <div class="types">
                <ol class="atributos">
                    <li class="atributo sts">
                    ${pokemon.stats.map((stat) => `<h3 class="stat ${stat}">${stat}</h3>`).join('')}
                        <p>${pokemon.statsNumber.map((statNumber) => `<h3 class="stat ${statNumber}">${statNumber}</p>`).join('')}</p>
                        <div class="progress-status"> 
                            <div class="progressbar">
                            </li>
                        </div>
                </ol><!--atributos-->
            </div><!--types-->
    </div><!--subdetails-->

    <div id="moves" class="subdetails">
    <div class="types">
        <ol class="atributos">
            <li class="atributo move">
            <p>${pokemon.moves.map((move) => `<h3 class="move ${move}">${move}</h3>`).join('')}</p>
            </li>
        </ol><!--atributos-->
    </div><!--types-->
</div><!--subdetails-->
</div><!--pagination_details-->
</div>
</body>
</html>
`)   
    return newHtml
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
        const detailsPage = convertPokemonToHtml(pokeData)})
}

displayDetails(id)

heart.addEventListener("click", ()=>{
    const iconHeart = document.querySelector("fa-regular fa-heart")
    iconHeart.style.color = "red";
    return iconHeart
})