// Characters.js
let characterSprites = {
    mario: new Image(),
    luigi: new Image(src="karakter/luigi"),
    peach: new Image(),
    toad: new Image()
};

characterSprites.mario.src = "assets/characters/mario.png";
characterSprites.luigi.src = "assets/characters/luigi.png";
characterSprites.peach.src = "assets/characters/peach.png";
characterSprites.toad.src = "assets/characters/toad.png";

let currentCharacter = "mario"; // default

function setCharacter(name) {
    currentCharacter = name;
    if (typeof player !== "undefined") {
        player.sprite = characterSprites[name];
    }
}
