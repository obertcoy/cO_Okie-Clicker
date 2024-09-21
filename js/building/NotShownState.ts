import { Game } from "../game_manager.js";
import { buildings } from "../helper/BuildingHelper.js";
import { AvailableState } from "./AvailableState.js";
import { BuildingState } from "./BuildingState.js";
import { BuildingStateManager } from "./BuildingStateManager.js";
import { UnavailableState } from "./UnavailableState.js";

export class NotShownState implements BuildingState{

    onEnter(sm: BuildingStateManager): void {        
        if(sm.building.shown) return sm.changeState(sm.lockedState)
        sm.building.ui?.show(false)    
    }

    onUpdate(sm: BuildingStateManager): void {
        
        const idx = buildings.indexOf(sm.building)        
        if(buildings[idx - 1].sm.getState() instanceof UnavailableState || buildings[idx - 1].sm.getState() instanceof AvailableState) sm.changeState(sm.lockedState)
        
    }

    onExit(sm: BuildingStateManager): void {
        // throw new Error("Method not implemented.");
    }

}