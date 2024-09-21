import { Game } from "../game_manager.js";
import { Building, BuildingImage } from "../model/Building.js";
import { BuildingButtonUI } from "../model/BuildingUI.js";
import { AchievementType, BuildingType } from "../model/Enum.js";
import { Grandma } from "../model/Grandma.js";
import { checkAchievementCondition } from "./AchievementHelper.js";
import { buildingUI } from "./BuildingUIHelper.js";
import { updateStatsImages } from "./MenuHelper.js";
import { displayStoreInfo, formatNumber } from "./UIHelper.js";
import { checkUnlockUpgrade } from "./UpgradeHelper.js";
import { saveData } from "./UserHelper.js";
export const buildings = [
    new Building(BuildingType.Cursor, '"Autoclicks once every 10 seconds."', 0.1, 15, true, true),
    new Building(BuildingType.Grandma, '"A nice grandma to bake more cookies."', 1, 100, false, true),
    new Building(BuildingType.Farm, '"Grows cookie plants from cookie seeds."', 8, 1100, false, true),
    new Building(BuildingType.Mine, '"Mines out cookie dough and chocolate chips."', 47, 12000),
    new Building(BuildingType.Factory, '"Produces large quantities of cookies."', 260, 130000),
];
export const buildingsImages = [
    new BuildingImage(BuildingType.Cursor, "../assets/building/cursor.png", "../assets/building/icon/cursor.png", "../assets/building/icon/cursor_locked.png"),
    new BuildingImage(BuildingType.Grandma, "../assets/building/grandma.png", "../assets/building/icon/grandma.png", "../assets/building/icon/grandma_locked.png"),
    new BuildingImage(BuildingType.Farm, "../assets/building/farm.png", "../assets/building/icon/farm.png", "../assets/building/icon/farm_locked.png"),
    new BuildingImage(BuildingType.Mine, "../assets/building/mine.png", "../assets/building/icon/mine.png", "../assets/building/icon/mine_locked.png"),
    new BuildingImage(BuildingType.Factory, "../assets/building/factory.png", "../assets/building/icon/factory.png", "../assets/building/icon/factory_locked.png"),
];
export function addBuildingButton(building, buildingImage) {
    var _a;
    // Create a container div for the building
    const buildingContainer = document.createElement("div");
    buildingContainer.classList.add("store-building");
    // Create an image element for the building
    const buildingIcon = document.createElement("img");
    buildingIcon.src = buildingImage.active;
    buildingIcon.alt = "";
    // Create the building body div
    const buildingBody = document.createElement("div");
    buildingBody.classList.add("store-building-body");
    // Create an h2 element for the building name
    const buildingName = document.createElement("h2");
    buildingName.textContent = BuildingType[building.type];
    // Create a div for the building price
    const buildingPriceDiv = document.createElement("div");
    buildingPriceDiv.classList.add("store-building-price");
    // Create an image element for the money icon
    const moneyImage = document.createElement("img");
    moneyImage.src = "../assets/utils/money.png";
    moneyImage.alt = "";
    // Create a paragraph for the building price
    const buildingPrice = document.createElement("h4");
    buildingPrice.textContent = formatNumber(building.getCurrentPrice());
    buildingPrice.style.color = "#66ff66";
    const buildingQuantity = document.createElement("h1");
    buildingQuantity.textContent = Game.getCurrentUser().getBuildingCount(building.type) > 0 ? Game.getCurrentUser().getBuildingCount(building.type).toString() : "";
    buildingQuantity.className = "store-building-quantity";
    // Append elements to their respective parents
    buildingPriceDiv.appendChild(moneyImage);
    buildingPriceDiv.appendChild(buildingPrice);
    buildingBody.appendChild(buildingName);
    buildingBody.appendChild(buildingPriceDiv);
    buildingContainer.appendChild(buildingIcon);
    buildingContainer.appendChild(buildingBody);
    buildingContainer.appendChild(buildingQuantity);
    buildingContainer.dataset.buildingType = BuildingType[building.type];
    // Append the building container to the store-building-container div in your HTML
    const storeBuildingContainer = document.getElementById("store-building-container");
    if (storeBuildingContainer)
        storeBuildingContainer.appendChild(buildingContainer);
    building.addUI(new BuildingButtonUI(building, buildingImage, buildingContainer, buildingName, buildingIcon, buildingPrice, buildingQuantity));
    (_a = building.sm) === null || _a === void 0 ? void 0 : _a.enterState();
}
export function buyBuilding(building, user) {
    var _a, _b;
    if (user.getCookies() < building.getCurrentPrice())
        return;
    // if(!user.hasBuilding(building.type)) user.buildings.push(building)
    if (building.type === BuildingType.Grandma)
        createGrandma(user);
    building.buy(user);
    buildingUI(building);
    checkUnlockUpgrade(building.type, user);
    checkAchievementCondition(AchievementType.Building);
    displayStoreInfo(building, (_b = (_a = building.ui) === null || _a === void 0 ? void 0 : _a.posY) !== null && _b !== void 0 ? _b : 0);
    updateStatsImages();
    saveData(user);
}
export function getBuildingTypeName(type) {
    return BuildingType[type].toString();
}
export function createGrandma(user) {
    user.addGrandma(new Grandma());
}
