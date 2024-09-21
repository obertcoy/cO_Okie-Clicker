import { Building } from "./Building"

export class Grandma{

    name: String
    age: number
    src: String

    constructor(name?: string, age?: number, src?: string) {
        this.name = name || grandmaNames[this.generateRandomNum(0, grandmaNames.length)];
        this.age = age || this.generateRandomNum(60, 110);
        this.src = src || grandmaSrc[this.generateRandomNum(0, grandmaSrc.length)].src;
    }

    generateRandomNum(min: number, max: number){
        return Math.floor(Math.random() * (max - min) + min)
    }
}

const grandmaSrc = [
    { src: "grandma/farmerGrandma.png" },
    { src: "grandma/grandmasGrandma.png" },
    { src: "grandma/minerGrandma.png" },
    { src: "grandma/rainbowGrandma.png" },
    { src: "grandma/scriptGrandma.png" },
    { src: "grandma/workerGrandma.png" },
  ]

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
  ]