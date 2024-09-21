import { Game } from "../game_manager.js";
import { achievements } from "../model/Achievement.js";
import { AchievementType } from "../model/Enum.js";
import { displayInfo, removeInfo } from "./UIHelper.js";
export function checkAchievementCondition(type, buildingType = null) {
    if (buildingType) {
        achievements.filter((achievement) => achievement.type === type && achievement.buildingType === buildingType && !Game.getCurrentUser().hasAchievement(achievement)).forEach((achievement) => {
            achievement.checkCondition(Game.getCurrentUser());
        });
    }
    else {
        achievements.filter((achievement) => achievement.type === type && !Game.getCurrentUser().hasAchievement(achievement)).forEach((achievement) => {
            achievement.checkCondition(Game.getCurrentUser());
        });
    }
}
export function displayAchievedAchievement(achievement) {
    const container = document.getElementById("achievement-container");
    // Create the main container for the achievement
    const subcontainer = document.createElement("div");
    subcontainer.className = "achievement";
    // Create the header container
    const headerContainer = document.createElement("div");
    headerContainer.className = "achievement-header";
    // Create the achievement image
    const achievementImg = document.createElement("img");
    achievementImg.src = achievement.src;
    achievementImg.className = "achievement-img";
    // Create the text container within the header
    const textContainer = document.createElement("div");
    textContainer.className = "achievement-header-text-container";
    // Create the achievement title
    const title = document.createElement("h4");
    title.className = "achievement-title";
    title.textContent = "Achievement unlocked";
    // Create a horizontal line
    const hr1 = document.createElement("hr");
    // Create the achievement name
    const achievementName = document.createElement("h5");
    achievementName.className = "achievement-name";
    achievementName.textContent = achievement.name;
    // Append elements to the text container
    textContainer.appendChild(title);
    textContainer.appendChild(hr1);
    textContainer.appendChild(achievementName);
    // Create another horizontal line
    const hr2 = document.createElement("hr");
    // Create the close button
    const closeIcon = document.createElement("span");
    closeIcon.className = "achievement-close";
    closeIcon.textContent = "x";
    // Append elements to the header container
    headerContainer.appendChild(achievementImg);
    headerContainer.appendChild(textContainer);
    headerContainer.appendChild(hr2);
    headerContainer.appendChild(closeIcon);
    // Append header container to the main achievement container
    subcontainer.appendChild(headerContainer);
    achievement.addSubcontainer(subcontainer);
    subcontainer.addEventListener("mouseenter", (e) => {
        const rect = subcontainer.getBoundingClientRect(); // Get the container's position relative to the viewport
        const posX = window.scrollX + rect.left; // Calculate the absolute horizontal position
        const posY = window.scrollY + rect.top; // Calculate the absolute vertical position
        displayInfo(achievement, posX, posY, subcontainer.clientWidth);
    });
    subcontainer.addEventListener("mouseleave", () => {
        removeInfo();
    });
    closeIcon.addEventListener("click", () => {
        subcontainer.remove();
        removeInfo();
    });
    // Append the main achievement container to the body (or another appropriate parent element)
    container.appendChild(subcontainer);
}
export function getAchievementTypeName(type) {
    return AchievementType[type].toString();
}
