import { Building } from "../model/Building.js"
import { Upgrade } from "../model/Upgrade.js"
import { Achievement } from "../model/Achievement.js"
import { getBuildingTypeName } from "./BuildingHelper.js"
import { Game } from "../game_manager.js"
import { saveData } from "./UserHelper.js"
import { User } from "../model/User.js"
import { fade } from "../user_click.js"

export function createHBorder(): HTMLElement{
    const hBorder = document.createElement("div")
    hBorder.className = "h-border"
    return hBorder
}

export function createUnavailableOverlay(): HTMLElement{
    const overlay = document.createElement("div")
    overlay.className = "unavailable"
    return overlay
}

export function displayStoreInfo(element: Upgrade | Building, eventY: number){

    const container = document.getElementById("store-info")!
    const img = document.getElementById("store-info-img")! as HTMLImageElement
    const title = document.getElementById("store-info-title")!
    const type = document.getElementById("store-info-type")!
    const price = document.getElementById("store-info-price")!
    const desc = document.getElementById("store-info-desc")!
    const flavor = document.getElementById("store-info-flavor")!
    const decor = document.getElementById("store-info-decor")!
    const infoBuilding = document.getElementById("store-info-building")!
    
    container.style.top = eventY + "px"
    container.style.display = "flex"
    
    if(element instanceof Upgrade){

        title.textContent = element.name
        img.src = `${element.src}`
        type.textContent = "Upgrade"
        price.textContent = formatNumber(element.cost)
        desc.textContent = element.desc
        flavor.textContent = element.flavor
        flavor.style.marginTop = "10px"
        decor.style.display = ""
        infoBuilding.style.display = "none"
        
    } else if(element instanceof Building){

        img.src = `../assets/building/${getBuildingTypeName(element.type).toLowerCase()}.png`
        price.textContent = formatNumber(element.getCurrentPrice())
        flavor.style.marginTop = "0"
        infoBuilding.style.display = ""

        const info1 = document.getElementById("store-info-building-1")!
        const info2 = document.getElementById("store-info-building-2")!
       
        if(Game.getCurrentUser().getBuilding(element.type)){

            title.textContent = getBuildingTypeName(element.type)
            type.textContent = `owned: ${element.quantity}`
            desc.textContent = ""
            flavor.textContent = element.flavor
            decor.style.display = "none"            

            info1.textContent = `each ${getBuildingTypeName(element.type)} produces ${(Game.getCurrentUser().getBuilding(element.type)?.baseCps! * Game.getCurrentUser().getBuilding(element.type)?.multiplier!).toFixed(1)} per second`
            info2.textContent = `${element.quantity} ${getBuildingTypeName(element.type)}s producing ${(Game.getCurrentUser().getBuilding(element.type)!.getBuildingCps()).toFixed(1)} per second`
        
        } else {

            img.src = "../assets/utils/locked.png"
            title.textContent = "???"
            type.textContent = `owned: ${element.quantity}`
            desc.textContent = ""
            flavor.textContent = '"???"'

            decor.style.display = "none"
            infoBuilding.style.display = "none"

        }

    }

}

export function removeStoreInfo(){

    const container = document.getElementById("store-info")!
    container.style.display = "none"
}

export function formatNumber(num: number) {
    const abbrev = ["", "million", "billion", "trillion", "quadrillion", "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
    "decillion",
    "undecillion",
    "duodecillion",
    "tredecillion"]
    
    const million = 1000000;
  
    if(num < million){
        return num.toLocaleString("en-US")
    }

    const tier = Math.floor(Math.log10(num) / 6); 
    const formattedNum = (num / Math.pow(10, 6 * tier)).toFixed(2);

    return formattedNum + " " + abbrev[tier];
  }

export function displayInfo(element: Upgrade | Achievement, posX: number, posY: number, width: number, unlocked: boolean = true){

    const container = document.getElementById("info")!
    const image = document.getElementById("info-img")! as HTMLImageElement
    const title = document.getElementById("info-title")!
    const type = document.getElementById("info-type")!
    const status = document.getElementById("info-status")!
    const desc = document.getElementById("info-desc")!

    if(element instanceof Upgrade){

        image.src = element.src
        title.textContent = element.name
        type.textContent = "Upgrade"
        status.textContent = "Purchased"
        desc.textContent = element.desc

    } else if(element instanceof Achievement){

        if(!unlocked){

            image.src = "../assets/utils/locked.png"
            title.textContent = "???"
            type.textContent = "Achievement"
            status.textContent = "Locked"
            desc.textContent = "???"
        } else {
            
            image.src = element.src
            title.textContent = element.name
            type.textContent = "Achievement"
            status.textContent = "Unlocked"
            desc.textContent = element.desc
        }
        
    }

    
    container.style.display = "flex"
    container.style.top = posY - container.offsetHeight - 5 + "px";
    container.style.left = `calc(${posX}px + ${width/2}px`;
    
}

export function removeInfo(){

    const container = document.getElementById("info")!
    container.style.display = "none"
}

export function timeAgo(runStartedTimestamp: number) {
    const now = Date.now()
    const diff = now - runStartedTimestamp

    const millisecondsPerSecond = 1000
    const secondsPerMinute = 60
    const minutesPerHour = 60
    const hoursPerDay = 24

    let remainingTime = diff

    const days = Math.floor(remainingTime / (millisecondsPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay))
    remainingTime -= days * millisecondsPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay

    const hours = Math.floor(remainingTime / (millisecondsPerSecond * secondsPerMinute * minutesPerHour))
    remainingTime -= hours * millisecondsPerSecond * secondsPerMinute * minutesPerHour

    const minutes = Math.floor(remainingTime / (millisecondsPerSecond * secondsPerMinute))
    remainingTime -= minutes * millisecondsPerSecond * secondsPerMinute

    const seconds = Math.floor(remainingTime / millisecondsPerSecond)

    let timeAgoString = ""

    if (days > 0) {
        timeAgoString += `${days} day${days > 1 ? 's' : ''}, `
    }
    if (hours > 0) {
        timeAgoString += `${hours} hour${hours > 1 ? 's' : ''}, `
    }
    if (minutes > 0) {
        timeAgoString += `${minutes} minute${minutes > 1 ? 's' : ''}, `
    } 
    if (seconds > 0) {
        timeAgoString += `${seconds} second${seconds > 1 ? 's' : ''} ago`
    }

    return timeAgoString || "Just now";
}

export function changeNameOverlay(){

    const userNameContainer = document.getElementById("user-name-container")!
    const userName = document.getElementById("user-name")!

    const overlay = document.getElementById("change-name-overlay")!
    const confirmBtn = document.getElementById("change-name-confirm")!
    const cancelBtn = document.getElementById("change-name-cancel")!
    const close = document.getElementById("change-name-close")!

    const nameInput = document.getElementById("change-name-input")! as HTMLInputElement

    const closeFunc = () => {
        overlay.style.display = "none"
    }

    userNameContainer.addEventListener("click", () => {
        overlay.style.display = "flex"
    })

    confirmBtn.addEventListener("click", () => {
        Game.getCurrentUser().setUsername(nameInput.value ?? userNameContainer.textContent!)
        userName.textContent = Game.getCurrentUser().username
        nameInput.value = ""
        saveData(Game.getCurrentUser())
        closeFunc()
    })

    cancelBtn.addEventListener("click", closeFunc)
    close.addEventListener("click", closeFunc)

}

export function cookieShower(container: HTMLElement, currentUser: User){

    const cookieShower = document.createElement("img") as HTMLImageElement
    cookieShower.classList.add("cookie-shower")
    const cps = parseFloat(currentUser.getTotalCps()) 
    
    if(cps < 1) return

    let showerType = 1

    if(cps > 1000){
        showerType = 2
    } else if(cps > 10000){
        showerType = 3
    }

    cookieShower.src = `../assets/click/cookieShower${showerType}.png`
    container.append(cookieShower)

    let posY = 0;

    cookieShower.addEventListener("animationend", () => {
        cookieShower.remove();
        console.log(cookieShower);

    });

}
