import { Game } from "../game_manager.js";
import { achievements } from "../model/Achievement.js";
import { upgrades } from "../model/Upgrade.js";
import { displayInfo, formatNumber, removeInfo, timeAgo } from "./UIHelper.js";
export function displayMenu() {
    const statsMenu = document.getElementById("bot-left-panel");
    const statsClose = document.getElementById("stats-close");
    const stats = document.getElementById("stats");
    let statsOpen = false;
    statsMenu.addEventListener("click", () => {
        if (!statsOpen) {
            stats.style.display = "flex";
        }
        else {
            stats.style.display = "none";
        }
        statsOpen = !statsOpen;
        updateStatsTexts();
        updateStatsImages();
    });
    statsClose.addEventListener("click", () => {
        stats.style.display = "none";
        statsOpen = !statsOpen;
    });
}
export function updateStatsTexts() {
    const currUser = Game.getCurrentUser();
    const currentCookies = formatNumber(currUser.getCookies());
    const allTimeBakedCookies = formatNumber(currUser.getCookiesBaked());
    const runStarted = timeAgo(currUser.runStarted);
    const buildingsOwned = () => {
        return currUser.buildings.reduce((total, building) => total + building.quantity, 0);
    };
    const cookiesPerSecond = currUser.getTotalCps();
    const cookiesPerClick = currUser.getClickCookie();
    const cookieClicks = currUser.clickCount;
    document.getElementById("stats-current-cookie").textContent = currentCookies;
    document.getElementById("stats-baked-cookie").textContent = allTimeBakedCookies;
    document.getElementById("stats-run-started").textContent = runStarted;
    document.getElementById("stats-building-owned").textContent = buildingsOwned().toString();
    document.getElementById("stats-cpsecond").textContent = cookiesPerSecond;
    document.getElementById("stats-cpclick").textContent = cookiesPerClick;
    document.getElementById("stats-click").textContent = cookieClicks.toString();
}
export function updateStatsImages() {
    Game.getCurrentUser().upgrades.forEach((u) => {
        const img = document.getElementById(`${u.name.toLowerCase()}`);
        if (!img.classList.contains("stats-shown")) {
            img.addEventListener("mouseenter", (e) => {
                const rect = img.getBoundingClientRect();
                const posX = rect.left + window.scrollX;
                const posY = rect.top + window.scrollY;
                displayInfo(u, posX, posY, img.width);
            });
            img.addEventListener("mouseleave", (e) => {
                removeInfo();
            });
            img.style.display = "";
        }
        else {
            img.classList.add("stats-shown");
        }
    });
    Game.getCurrentUser().achievements.forEach((a) => {
        const img = document.getElementById(`${a.name.toLowerCase()}`);
        if (!img.classList.contains("stats-shown")) {
            img.src = a.src;
            img.addEventListener("mouseenter", (e) => {
                const rect = img.getBoundingClientRect();
                const posX = rect.left + window.scrollX;
                const posY = rect.top + window.scrollY;
                displayInfo(a, posX, posY, img.width);
            });
            img.addEventListener("mouseleave", (e) => {
                removeInfo();
            });
            img.style.display = "";
        }
        else {
            img.classList.add("stats-shown");
        }
    });
    const unlockedUpgrades = Game.getCurrentUser().upgrades.length;
    const totalUpgrades = upgrades.length;
    const upgradePercentage = ((unlockedUpgrades / totalUpgrades) * 100).toFixed(2);
    const unlockedAchievements = Game.getCurrentUser().achievements.length;
    const totalAchievements = achievements.length;
    const achievementPercentage = ((unlockedAchievements / totalAchievements) * 100).toFixed(2);
    document.getElementById("stats-upgrade-unlocked").textContent = `${unlockedUpgrades}/${totalUpgrades} (${upgradePercentage}%)`;
    document.getElementById("stats-achievement-unlocked").textContent = `${unlockedAchievements}/${totalAchievements} (${achievementPercentage}%)`;
}
export function initStatsImages() {
    const upgradeContainer = document.getElementById("stats-upgrades-images");
    const achievementContainer = document.getElementById("stats-achievement-images");
    upgrades.forEach((u) => {
        const img = document.createElement("img");
        img.src = u.src;
        img.id = u.name.toLowerCase();
        img.style.display = "none";
        upgradeContainer.appendChild(img);
    });
    achievements.forEach((a) => {
        const img = document.createElement("img");
        img.src = "../assets/utils/locked.png";
        img.id = a.name.toLowerCase();
        img.addEventListener("mouseenter", (e) => {
            const rect = img.getBoundingClientRect();
            const posX = rect.left + window.scrollX;
            const posY = rect.top + window.scrollY;
            displayInfo(a, posX, posY, img.width, false);
        });
        img.addEventListener("mouseleave", (e) => {
            removeInfo();
        });
        achievementContainer.appendChild(img);
    });
}
