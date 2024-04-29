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