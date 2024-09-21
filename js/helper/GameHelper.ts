import { Game } from "../game_manager.js";
import { AchievementType, BuildingType } from "../model/Enum.js";
import { Upgrade, upgrades } from "../model/Upgrade.js";
import { User } from "../model/User.js";
import { checkAchievementCondition } from "./AchievementHelper.js";
import { addBuildingButton, buildings, buildingsImages, getBuildingTypeName } from "./BuildingHelper.js";
import { addBuilding, addCursor } from "./BuildingUIHelper.js";
import { displayMenu, initStatsImages } from "./MenuHelper.js";
import { changeNameOverlay, createHBorder, formatNumber } from "./UIHelper.js";
import { checkClickUpgrade, displayUpgrade, getUnlockedUpgrades, getUnlockedUpgradesName,  upgradeUpdate } from "./UpgradeHelper.js";

export function initGame(){

    displayUserName()
    initStatsImages()
    displayMenu()
    changeNameOverlay()

    initBuildingButton()
    initBuildingSubcontainer()
    initUnlockedUpgrade()
  
}

export function initBuildingButton(){

    const currentUser = Game.getCurrentUser()

    buildings.forEach((building, index) => {
        if(currentUser.hasBuilding(building.type)) buildings[index] = currentUser.getBuilding(building.type)!
    })

    buildings.forEach((building, index) => {
        addBuildingButton(building, buildingsImages[index]);
      })
    
}

export function initBuildingSubcontainer() {
    const container = document.getElementById("building-container")!;

    for (const typeKey in BuildingType) {
        if (isNaN(Number(typeKey))) {
            const type = BuildingType[typeKey as keyof typeof BuildingType];

            const subcontainer = document.createElement("div");
            subcontainer.classList.add("building-subcontainer");
            subcontainer.id = `${getBuildingTypeName(type).toLowerCase()}-container`;
            subcontainer.style.backgroundImage = `url('../assets/building/background/${getBuildingTypeName(type).toLowerCase()}Background.png')`;
            container.appendChild(subcontainer);

            const hborder = createHBorder()
            hborder.id = `${getBuildingTypeName(type).toLowerCase()}-border`
            hborder.style.display = "none";
            // hborder.style.marginTop = "auto"
            container.appendChild(hborder);

            if (type === BuildingType.Grandma) {
                const grandmaInfo = document.createElement("div");
                grandmaInfo.id = "grandma-info";

                const info = document.createElement("h5");
                info.textContent = "Name, age 90";

                grandmaInfo.appendChild(info);
                subcontainer.appendChild(grandmaInfo);
            }

            subcontainer.style.display = "none"

            if(BuildingType.Cursor === type){
                for(let i = 0; i < Game.getCurrentUser().getBuildingCount(type); i++){
                    addCursor(i)
                }
            } else {
                for(let i = 0; i < Game.getCurrentUser().getBuildingCount(type); i++){
                    addBuilding(type, i)
                }
            }

        }
    }


}

export function displayUserName(){
    
    const userName = document.getElementById("user-name")!
    userName.textContent = Game.getCurrentUser().username

}

export function displayCookie(userCookieDisplay: HTMLElement, userCpsDisplay: HTMLElement, currentUser: User){

    userCookieDisplay.innerHTML = formatNumber(currentUser.getCookies())
    userCpsDisplay.innerHTML = formatNumber(parseFloat(currentUser.getTotalCps()))
    checkAchievementCondition(AchievementType.Bake)
    checkAchievementCondition(AchievementType.Cps)

  }
  
export function displayStore(){

    buildings.forEach((building) => building.sm.onUpdate())
    
    upgradeUpdate()
    checkClickUpgrade()
  
}

export function increaseCookie(lastTimestamp:number, timestamp: number){
    
    if (lastTimestamp === 0) lastTimestamp = timestamp
    const deltaTime = timestamp - lastTimestamp
    const cookiesPerMillisecond = parseFloat(Game.getCurrentUser().getTotalCps()) / 1000

    Game.getCurrentUser().addUserCookie(cookiesPerMillisecond * deltaTime)
    checkAchievementCondition(AchievementType.Click)

    return timestamp
}

export function initUnlockedUpgrade(){

    const unlockedUpgrades = getUnlockedUpgrades()
    unlockedUpgrades.map((upgrade) => {
        if(upgrade.subcontainer.classList.contains("hidden") && !Game.getCurrentUser().hasUpgrade(upgrade)) upgrade.subcontainer.classList.remove("hidden")
        displayUpgrade(upgrade)
    })
}