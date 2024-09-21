import { Upgrade } from "./Upgrade.js";
import { Achievement } from "./Achievement.js";
import { Grandma } from "./Grandma.js";
import { Building } from "./Building.js";
export class User {
    constructor(username, cookies = 0, clickMultiplier = 0, buildings = [], upgrades = [], achievements = [], grandmas = [], cookiesBaked = cookies, runStarted = Date.now(), clickCount = 0) {
        this.username = username;
        this.cookies = cookies;
        this.clickMultiplier = clickMultiplier;
        this.buildings = buildings;
        this.upgrades = upgrades;
        this.achievements = achievements;
        this.grandmas = grandmas;
        this.cookiesBaked = cookiesBaked;
        this.runStarted = runStarted;
        this.clickCount = clickCount;
    }
    static fromJSONData(data) {
        if (data && data.user) {
            const { username, cookies, clickMultiplier, buildings, upgrades, achievements, grandmas, cookiesBaked, runStarted, clickCount } = data.user;
            const buildingInstances = buildings.map((buildingData) => {
                return new Building(buildingData.type, buildingData.flavor, buildingData.baseCps, buildingData.basePrice, buildingData.unlocked, buildingData.shown, buildingData.quantity, buildingData.multiplier).addSM();
            });
            const upgradeInstances = upgrades.map((upgradeData) => {
                return new Upgrade(upgradeData.type, upgradeData.typeID, upgradeData.name, upgradeData.desc, upgradeData.flavor, upgradeData.cost, upgradeData.unlockCondition, upgradeData.effect);
            });
            const achievementInstances = achievements.map((achievementData) => {
                var _a;
                return new Achievement(achievementData.type, achievementData.typeID, achievementData.name, achievementData.desc, achievementData.achieveCondition, (_a = achievementData.buildingType) !== null && _a !== void 0 ? _a : null, achievementData.achieved);
            });
            const grandmaInstances = grandmas.map((grandmaData) => {
                return new Grandma(grandmaData.name, grandmaData.age, grandmaData.src);
            });
            return new User(username, cookies, clickMultiplier, buildingInstances, upgradeInstances, achievementInstances, grandmaInstances, cookiesBaked, runStarted, clickCount);
        }
        return null;
    }
    toJSONData() {
        const data = {
            user: {
                username: this.username,
                cookies: this.cookies,
                clickMultiplier: this.clickMultiplier,
                buildings: this.buildings.map((building) => building.serialize()),
                upgrades: this.upgrades,
                achievements: this.achievements,
                grandmas: this.grandmas,
                cookiesBaked: this.cookiesBaked,
                runStarted: this.runStarted,
                clickCount: this.clickCount
            },
        };
        console.log(data);
        return JSON.stringify(data);
    }
    getTotalCps() {
        return (this.buildings.reduce((totalCps, building) => totalCps + building.getBuildingCps(), 0)).toFixed(1);
    }
    getCookies() {
        return Math.floor(this.cookies);
    }
    getCookiesBaked() {
        return Math.floor(this.cookiesBaked);
    }
    getClickCookie() {
        const result = 1 + (this.clickMultiplier * parseFloat(this.getTotalCps()));
        if (Number.isInteger(result)) {
            return result.toString();
        }
        else {
            return result.toFixed(3);
        }
    }
    addClickMultiplier(multiplier) {
        this.clickMultiplier += multiplier;
    }
    addUserCookie(cookie) {
        this.cookies += cookie;
        if (cookie > 0)
            this.cookiesBaked += cookie;
    }
    setUsername(name) {
        this.username = name;
    }
    addGrandma(grandma) {
        this.grandmas.push(grandma);
    }
    getGrandma(idx) {
        return this.grandmas[idx];
    }
    hasBuilding(buildingType) {
        return this.buildings.some(building => building.type === buildingType);
    }
    getBuildingCount(buildingType) {
        var _a;
        return (_a = this.buildings.find((building) => building.type === buildingType)) === null || _a === void 0 ? void 0 : _a.quantity;
    }
    getBuilding(buildingType) {
        return this.buildings.find((building) => building.type === buildingType);
    }
    hasUpgrade(upgrade) {
        return this.upgrades.some(userUpgrade => userUpgrade.name == upgrade.name);
    }
    hasAchievement(achievement) {
        return this.achievements.some(userAchievement => userAchievement.name == achievement.name);
    }
    addClickCount() {
        this.clickCount += 1;
    }
}
