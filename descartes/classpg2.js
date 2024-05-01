class About extends Pokemon{
    constructor(number){
        super(number);
        this.height;
        this.weight;
        this.abilities = [];
        this.ability;
        this.eggGroups;
    }
}

class BaseStats extends Pokemon{
    constructor(number){
        super(number);
        this.hp;
        this.attack;
        this.defense;
        this.speed;
        this.total = this.hp+this.attack+this.defense+this.speed;
    }
}

class Moves{
    constructor(number){
        super(number);
        names = [];
        nameMove;
    }  
}


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

pokemonData.getPoke().then((pokemon = []) =>{
    const html01 = pokemon.map((pokemon) => 

).join('')
pokemonDados.innerHTML += newHtml})

onclick="loadNewPage(${pokemon.number}


    btnDetalhes.addEventListener('click', (value = btnDetalhes.value()) => {
        console.log(value)
        loadNewPage(value)
    })