var slime = {
        name: 'slime',
        maxhp: 5,
        hp: 5,
        attack: 1,
        defense: 0,
        exp: 1,
        image: './images/goon.png',
        verb: 'slimes'
};

var rat = {
        name: 'rat',
        maxhp: 5,
        hp: 5,
        attack: 2,
        defense: 0,
        exp: 2,
        image: './images/goon.png',
        verb: 'bites'
};

var encounterTable = {
        1: [slime, slime, rat]
}

var encounterRate = {
        1: 0.2
}