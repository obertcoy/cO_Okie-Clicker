export class Grandma {
    constructor(name, age, src) {
        this.name = name || grandmaNames[this.generateRandomNum(0, grandmaNames.length)];
        this.age = age || this.generateRandomNum(60, 110);
        this.src = src || grandmaSrc[this.generateRandomNum(0, grandmaSrc.length)].src;
    }
    generateRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
const grandmaSrc = [
    { src: "grandma/farmerGrandma.png" },
    { src: "grandma/grandmasGrandma.png" },
    { src: "grandma/minerGrandma.png" },
    { src: "grandma/rainbowGrandma.png" },
    { src: "grandma/scriptGrandma.png" },
    { src: "grandma/workerGrandma.png" },
];
const grandmaNames = [
    "Sheryl",
    "Jovita",
    "Jessica",
    "Pebe",
    "Obert",
    "Weel",
    "Irvin",
    "Ivan",
    "Hendi"
];
