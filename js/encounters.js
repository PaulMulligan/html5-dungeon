var slime = {
        name: 'slime',
        maxhp: 5,
        hp: 5,
        attack: 1,
        defense: 0,
        exp: 1,
        image: './images/goon.png',
        verb: 'slimes',
        speed: 10,
        initiative: 0,
        modifiers: []
};

var rat = {
        name: 'rat',
        maxhp: 5,
        hp: 5,
        attack: 2,
        defense: 0,
        exp: 2,
        image: './images/goon.png',
        verb: 'bites',
        speed: 10,
        initiative: 0,
        modifiers: []
};

var encounterTable = {
        1: [[slime, slime]]
};

var encounterRate = {
        1: 0.2
};