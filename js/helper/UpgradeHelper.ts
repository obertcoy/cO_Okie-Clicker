import { Game } from "../game_manager.js";
import { BuildingType } from "../model/Enum.js";
import { Upgrade, upgrades } from "../model/Upgrade.js";
import { User } from "../model/User.js";

export function checkUnlockUpgrade(type: BuildingType, user: User){

    upgrades.filter((upgrade) => upgrade.type === type && !upgrade.unlocked && !user.hasUpgrade(upgrade) && !checkUnlockedUpgradeName(upgrade.name)).forEach((upgrade) => {
        
        if(upgrade.checkCondition(user)) displayUpgrade(upgrade)
    })

}

export function checkClickUpgrade(){
    
    const currentUser = Game.getCurrentUser()
    upgrades.filter((upgrade) => upgrade.type === BuildingType.Click && !upgrade.unlocked && !currentUser.hasUpgrade(upgrade) && !checkUnlockedUpgradeName(upgrade.name)).forEach((upgrade) => {
                
        if(upgrade.checkCondition(Game.getCurrentUser())) displayUpgrade(upgrade)
    })
}

export function upgradeUpdate(){

    upgrades.filter((upgrade) => upgrade.unlocked || checkUnlockedUpgradeName(upgrade.name)).forEach((upgrade) => {
        upgrade.update(Game.getCurrentUser())
    })

}

export function displayUpgrade(upgrade: Upgrade){

    const container = document.getElementById('store-upgrade-container')!
    container.appendChild(upgrade.subcontainer)

    const hoverFunc = () => {
        if (container && container.children.length <= 1){
            container.style.height = "60px"
        } else{            
            container.style.height = "max-content"
        }
    }
    
    const leaveFunc = () => {
        container.style.height = "60px"
    }
  
    upgrade.subcontainer.addEventListener("mouseenter", hoverFunc);
    upgrade.subcontainer.addEventListener("mouseleave", leaveFunc);    
    
}

export function getUnlockedUpgradesName(): string []{

    const storage = localStorage.getItem("unlocked-upgrades")
    if(!storage) return []
    const parsedData = JSON.parse(storage)
    
    return parsedData
}

export function getUnlockedUpgrades(): Upgrade[] {

    const unlockedUpgradesName = getUnlockedUpgradesName()

    const unlockedUpgrades: Upgrade[] = [];

    for (const upgrade of upgrades) {
        if (unlockedUpgradesName.includes(upgrade.name) && !Game.getCurrentUser().hasUpgrade(upgrade)) {
            unlockedUpgrades.push(upgrade);
        } else {
            removeUnlockedUpgradeName(upgrade.name)
        }
    }
    if(unlockedUpgrades.length <= 0) return []
    
    return unlockedUpgrades
}

export function checkUnlockedUpgradeName(name: string){

    return getUnlockedUpgradesName().includes(name)
}

export function removeUnlockedUpgradeName(name: string){

    let storage = getUnlockedUpgradesName()
    
    if(checkUnlockedUpgradeName(name)) {
        const index = storage.indexOf(name);
        storage.splice(index, 1)
        
        localStorage.setItem("unlocked-upgrades", JSON.stringify(storage));
    }
}