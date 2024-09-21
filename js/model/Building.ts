import { BuildingStateManager } from "../building/BuildingStateManager.js";
import { Game } from "../game_manager.js";
import { buyBuilding } from "../helper/BuildingHelper.js";
import { BuildingButtonUI } from "./BuildingUI.js";
import { BuildingType } from "./Enum.js";
import { User } from "./User.js";

export class Building {

    type: BuildingType;
    flavor: string
    baseCps: number;
    basePrice: number;
    quantity: number;
    multiplier: number;
    unlocked: boolean;
    shown: boolean;
    ui: BuildingButtonUI | null
    sm: BuildingStateManager
  
    constructor(
        type: BuildingType,
        flavor: string,
      baseCps: number,
      basePrice: number,
      unlocked: boolean = false,
      shown: boolean = false,
      quantity: number = 0,
      multiplier: number = 1,
      ui: BuildingButtonUI | null = null
    ) {
      this.type = type;
      this.flavor = flavor
      this.baseCps = baseCps;
      this.basePrice = basePrice;
      this.unlocked = unlocked;
      this.shown = shown;
      this.quantity = quantity;
      this.multiplier = multiplier;
      this.ui = ui
      this.sm = new BuildingStateManager(this)
    }
  
    unlock(): void {
      this.unlocked = true;
    }

    show(): void {
        this.shown = true;
    }

    addUI(ui: BuildingButtonUI): void {
      this.ui = ui
      this.setupClickListener()
    }

    addSM(){
      this.sm = new BuildingStateManager(this)
      return this
    }
    
    getCurrentPrice(): number {
      return Math.floor(this.basePrice * Math.pow(1.15, this.quantity))
    }
  
    setupClickListener() {
      const buildingElement = this.ui?.subcontainer;
      if (!buildingElement) return;

      buildingElement.addEventListener('click', (e) => {
          const buildingType = buildingElement.dataset.buildingType;
          if (buildingType && BuildingType[buildingType] === this.type) {
              buyBuilding(this, Game.getCurrentUser());
          }
      });
  }
  
    addMultiplier(multiplier: number): void {
      this.multiplier += multiplier;
    }
  
    getBuildingCps(): number {
      return this.baseCps * this.quantity * this.multiplier;
    }

    buy(user: User){
      user.addUserCookie(-this.getCurrentPrice())
      user.getBuilding(this.type)!.quantity += 1
      this.ui?.update()
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
      }

      return buildingData
    }

  }
 
export class BuildingImage{

    type: BuildingType;
    image: string;
    active: string;
    inactive: string;
  
    constructor(
        type: BuildingType,
      image: string,
      active: string,
      inactive: string,
    ) {
      this.type = type;
      this.image = image;
      this.active = active;
      this.inactive = inactive;
    }
  
}

