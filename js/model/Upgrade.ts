import { Game } from "../game_manager.js"
import { getBuildingTypeName } from "../helper/BuildingHelper.js"
import { updateStatsImages } from "../helper/MenuHelper.js"
import { createUnavailableOverlay, displayStoreInfo, removeStoreInfo } from "../helper/UIHelper.js"
import { getUnlockedUpgradesName, removeUnlockedUpgradeName } from "../helper/UpgradeHelper.js"
import { saveData } from "../helper/UserHelper.js"
import { BuildingType } from "./Enum.js"
import { User } from "./User.js"

export class Upgrade{

    type: BuildingType
    typeID: number
    name: string
    desc: string
    flavor: string
    cost: number
    src: string
    subcontainer: HTMLElement
    image: HTMLImageElement
    unavailableOverlay: HTMLElement
    unlocked: boolean
    bought: boolean
    unlockCondition: Function
    effect: Function

    constructor(type: BuildingType, typeID: number, name: string, desc: string, flavor: string, cost: number,  unlockCondition: Function, effect: Function){
        this.type = type
        this.typeID = typeID
        this.name = name
        this.desc = desc
        this.flavor = flavor
        this.cost = cost
        this.src = `../assets/upgrade/${getBuildingTypeName(this.type).toLowerCase()}/${getBuildingTypeName(this.type).toLowerCase()}-${typeID}.png`
        this.unlockCondition = unlockCondition
        this.effect = effect
        this.unlocked = false
        this.bought = false

        this.subcontainer = document.createElement("div")
        this.subcontainer.classList.add("upgrade-container", "hidden")
        this.image = document.createElement("img")
        this.image.src = `${this.src}`
        this.subcontainer.appendChild(this.image)
        this.subcontainer.dataset.id = `upgrade-${getBuildingTypeName(this.type).toLowerCase()}-${typeID}`

        this.subcontainer.addEventListener("click", () => {
            this.buyUpgrade(Game.getCurrentUser())
            this.subcontainer.remove()
        })

        this.subcontainer.addEventListener("mouseenter", (e) => {
            displayStoreInfo(this, e.clientY)
        })

        this.subcontainer.addEventListener("mouseleave", (e) => {
            removeStoreInfo()
        })

        this.unavailableOverlay = createUnavailableOverlay()
    }

    buyUpgrade(user: User){
        if(this.unlockCondition(user) && user.getCookies() >= this.cost) {
            
            user.addUserCookie(-this.cost)
            this.bought = true
            this.effect(user)
            user.upgrades.push(this)
            removeStoreInfo()
            removeUnlockedUpgradeName(this.name)
            saveData(user)

            try {
                updateStatsImages()
            } catch {
                
            }
            

        }
    }

    applyUpgrade(user: User){
        this.effect(user)
    }

    checkCondition(user: User) {
        const conditionMet = this.unlockCondition(user);
        if (conditionMet) {
            this.unlocked = true;
            this.subcontainer.classList.remove("hidden")
            unlockedUpgradesName.push(this.name)
            localStorage.setItem("unlocked-upgrades", JSON.stringify(unlockedUpgradesName))
        }
        return conditionMet;
    }

    update(user: User){
        if(user.getCookies() < this.cost){
            this.subcontainer.classList.add("upgrade-unavailable")
            this.subcontainer.appendChild(this.unavailableOverlay)

        } else {
            if(this.subcontainer.classList.contains("upgrade-unavailable")) {
                this.subcontainer.classList.remove("upgrade-unavailable")
                this.subcontainer.removeChild(this.unavailableOverlay)
            }
            
        }
    }

}

export const unlockedUpgradesName = getUnlockedUpgradesName()

export const upgrades = [

    new Upgrade(
        BuildingType.Click,
        1, 
        "Plastic mouse", 
        "Clicking gains +1% of your CpS.", 
        '"Slightly squeaky."', 
        50000, 
        (user: User) => user.getCookies() >= 1000, 
        (user: User) => user.addClickMultiplier(0.01) 
    ),

    new Upgrade(
        BuildingType.Click,
        2, 
        "Iron mouse", 
        "Clicking gains +1% of your CpS.", 
        '"Click like it\'s 1,349!"', 
        5000000, 
        (user: User) => user.getCookies() >= 100000, 
        (user: User) => user.addClickMultiplier(0.01) 
    ),

    new Upgrade(
        BuildingType.Click,
        3, 
        "Titanium mouse", 
        "Clicking gains +1% of your CpS.", 
        '"Heavy, but powerful."', 
        500000000, 
        (user: User) => user.getCookies() >= 10000000, 
        (user: User) => user.addClickMultiplier(0.01) 
    ),

    new Upgrade(
        BuildingType.Cursor,
        1,
        "Reinforced index finger", 
        "The cursors are twice as efficient.",
        '"prod prod"',
        100, 
        (user: User) => user.getBuildingCount(BuildingType.Cursor)! >= 1, 
        (user: User) => user.buildings.find(building => building.type === BuildingType.Cursor)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Cursor,
        2,
        "Carpal tunnel prevention cream",
        "The cursors are twice as efficient.",
        '"it... it hurts to click..."',
        500,
        (user: User) => user.getBuildingCount(BuildingType.Cursor)! >= 1,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Cursor)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Cursor,
        3,
        "Ambidextrous",
        "The cursors are twice as efficient.",
        '"Look ma, both hands!"',
        10000,
        (user: User) => user.getBuildingCount(BuildingType.Cursor)! >= 10,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Cursor)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Grandma,
        1,
        "Forwards from grandma",
        "Grandmas are twice as efficient.",
        '"RE:RE:thought you\'d get a kick out of this ;))"',
        1000,
        (user: User) => user.getBuildingCount(BuildingType.Grandma)! >= 1,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Grandma)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Grandma,
        2,
        "Steel-plated rolling pins",
        "Grandmas are twice as efficient.",
        "\"Just what you kneaded.\"",
        5000,
        (user: User) => user.getBuildingCount(BuildingType.Grandma)! >= 5,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Grandma)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Grandma,
        3,
        "Lubricated dentures",
        "Grandmas are twice as efficient.",
        '"squish"',
        50000,
        (user: User) => user.getBuildingCount(BuildingType.Grandma)! >= 25,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Grandma)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Farm,
        1,
        "Cheap hoes",
        "Farms are twice as efficient.",
        "\"Rake in the dough!\"",
        11000,
        (user: User) => user.getBuildingCount(BuildingType.Farm)! >= 1,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Farm)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Farm,
        2,
        "Fertilizer",
        "Farms are twice as efficient.",
        "\"It's chocolate, I swear.\"",
        55000,
        (user: User) => user.getBuildingCount(BuildingType.Farm)! >= 5,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Farm)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Farm,
        3,
        "Cookie trees",
        "Farms are twice as efficient.",
        "\"A relative of the breadfruit.\"",
        550000,
        (user: User) => user.getBuildingCount(BuildingType.Farm)! >= 25,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Farm)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Mine,
        1,
        "Sugar gas",
        "Mines are twice as efficient.",
        "\"A pink, volatile gas, found in the depths of some chocolate caves.\"",
        120000,
        (user: User) =>  user.getBuildingCount(BuildingType.Mine)! >= 1,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Mine)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Mine,
        2,
        "Megadrill",
        "Mines are twice as efficient.",
        "\"You're in deep.\"",
        600000,
        (user: User) => user.getBuildingCount(BuildingType.Mine)! >= 5,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Mine)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Mine,
        3,
        "Ultradrill",
        "Mines are twice as efficient.",
        "\"Finally caved in?\"",
        6000000, 
        (user: User) => user.getBuildingCount(BuildingType.Mine)! >= 25,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Mine)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Factory,
        1,
        "Sturdier conveyor belts",
        "Factories are twice as efficient.",
        "\"You're going places.\"",
        1300000, // 1.3 million
        (user: User) => user.getBuildingCount(BuildingType.Factory)! >= 1,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Factory)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Factory,
        2,
        "Berrylium factory",
        "Factories are twice as efficient.",
        "\"Cheaper, healthier workforce.\"",
        6500000, // 6.5 million
        (user: User) => user.getBuildingCount(BuildingType.Factory)! >= 5,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Factory)?.addMultiplier(2)
    ),
    new Upgrade(
        BuildingType.Factory,
       3,
        "Blueberrylium factory",
        "Factories are twice as efficient.",
        "\"Slackers will be terminated.\"",
        65000000, // 65 million
        (user: User) => user.getBuildingCount(BuildingType.Factory)! >= 25,
        (user: User) => user.buildings.find(building => building.type === BuildingType.Factory)?.addMultiplier(2)
    )
    
];
