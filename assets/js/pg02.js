const pokemonData = {}

/* criar função para pegar dados e transforma em json- cada um para uma página*/
pokemonData.getPokeData = async (pokemon) => {
    const response = await fetch(pokemon.url)
    const data = await response.json()
    return transformData(data)
}

pokemonData.getPokeDataFirst = (number) => {
    const urlGeral = `https://pokeapi.co/api/v2/pokemon/${id}`
    const urlEgg = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    return fetch(urlGeral, urlEgg)
        .then((response)=> response.json())
        .then((jsonBody) => jsonBody.results)
        .then((detalhes)=> detalhes.map(pokemonData.getPokeData))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


function transformData(data) {
    const pokemon = new Pokemon()
    pokemon.number = data.id
    pokemon.name = data.name

    const types = data.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = data.sprites.other.dream_world.front_default

    const about = About(pokemon)
    about.height = data.height
    about.weight = data.weight
    about.abilities = data.types.map((typeSlot)=> typeSlot.type.name)
    about[ability] = abilities
    about.abilities = abilities
    about.ability = ability
    about.eggGroups = data.eggGroups.name

    return pokemon, about
}