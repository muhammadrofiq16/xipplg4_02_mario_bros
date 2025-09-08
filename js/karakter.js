// Characters.js
let characterSprites = {
    mario: new Image(),
    luigi: new Image(),
    peach: new Image(),
    toad: new Image()
};

// Load character sprites
characterSprites.mario.src = "images/mario-sprites.png";
characterSprites.luigi.src = "images/mario-sprites.png"; // Menggunakan sprite yang sama untuk sekarang
characterSprites.peach.src = "images/mario-sprites.png";
characterSprites.toad.src = "images/mario-sprites.png";

let currentCharacter = "mario"; // default character

function setCharacter(name) {
    currentCharacter = name;
    console.log('Character set to:', name);
}

// Character abilities (untuk implementasi future)
const characterAbilities = {
    mario: {
        jumpHeight: 1.0,
        speed: 1.0,
        special: 'balanced'
    },
    luigi: {
        jumpHeight: 1.2,
        speed: 0.9,
        special: 'high_jump'
    },
    peach: {
        jumpHeight: 1.0,
        speed: 0.8,
        special: 'float'
    },
    toad: {
        jumpHeight: 0.8,
        speed: 1.3,
        special: 'speed'
    }
};

function getCharacterAbilities(character) {
    return characterAbilities[character] || characterAbilities.mario;
}