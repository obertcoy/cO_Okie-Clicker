import { Game } from "../game_manager.js";
import { BuildingState } from "./BuildingState.js";
import { BuildingStateManager } from "./BuildingStateManager.js";

export class LockedState implements BuildingState{

    onEnter(sm: BuildingStateManager): void {
        sm.building.show()
        sm.building.ui?.show(true)
        sm.building.ui?.locked()        
    }

    onUpdate(sm: BuildingStateManager): void {              
        if(Game.getCurrentUser()?.cookies >= (sm.building.getCurrentPrice() * 3 / 4)) sm.changeState(sm.unavailableState)
        if(Game.getCurrentUser().getBuilding(sm.building.type)) sm.changeState(sm.unavailableState)
    }

    onExit(sm: BuildingStateManager): void {
        // throw new Error("Method not implemented.");
    }

}