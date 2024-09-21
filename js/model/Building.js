import { BuildingStateManager } from "../building/BuildingStateManager.js";
import { Game } from "../game_manager.js";
import { buyBuilding } from "../helper/BuildingHelper.js";
import { BuildingType } from "./Enum.js";
export class Building {
    constructor(type, flavor, baseCps, basePrice, unlocked = false, shown = false, quantity = 0, multiplier = 1, ui = null) {
        this.type = type;
        this.flavor = flavor;
        this.baseCps = baseCps;
        this.basePrice = basePrice;
        this.unlocked = unlocked;
        this.shown = shown;
        this.quantity = quantity;
        this.multiplier = multiplier;
        this.ui = ui;
        this.sm = new BuildingStateManager(this);
    }
    unlock() {
        this.unlocked = true;
    }
    show() {
        this.shown = true;
    }
    addUI(ui) {
        this.ui = ui;
        this.setupClickListener();
    }
    addSM() {
        this.sm = new BuildingStateManager(this);
        return this;
    }
    getCurrentPrice() {
        return Math.floor(this.basePrice * Math.pow(1.15, this.quantity));
    }
    setupClickListener() {
        var _a;
        const buildingElement = (_a = this.ui) === null || _a === void 0 ? void 0 : _a.subcontainer;
        if (!buildingElement)
            return;
        buildingElement.addEventListener('click', (e) => {
            const buildingType = buildingElement.dataset.buildingType;
            if (buildingType && BuildingType[buildingType] === this.type) {
                buyBuilding(this, Game.getCurrentUser());
            }
        });
    }
    addMultiplier(multiplier) {
        this.multiplier += multiplier;
    }
    getBuildingCps() {
        return this.baseCps * this.quantity * this.multiplier;
    }
    buy(user) {
        var _a;
        user.addUserCookie(-this.getCurrentPrice());
        user.getBuilding(this.type).quantity += 1;
        (_a = this.ui) === null || _a === void 0 ? void 0 : _a.update();
    }
    serialize() {
        const buildingData = {
            type: this.type,
            flavor: this.flavor,
            baseCps: this.baseCps,
            basePrice: this.basePrice,
            unlocked: this.unlocked,
            shown: this.shown,
            quantity: this.quantity,
            multiplier: this.multiplier,
            // Exclude 'ui' here
        };
        return buildingData;
    }
}
export class BuildingImage {
    constructor(type, image, active, inactive) {
        this.type = type;
        this.image = image;
        this.active = active;
        this.inactive = inactive;
    }
}
