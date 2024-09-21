import { Game } from "../game_manager.js";
import { BuildingState } from "./BuildingState.js";
import { BuildingStateManager } from "./BuildingStateManager.js";

export class AvailableState implements BuildingState{

    onEnter(sm: BuildingStateManager): void {
        sm.building.ui?.available()
    }

    onUpdate(sm: BuildingStateManager): void {
    
        if(Game.getCurrentUser().cookies < sm.building.getCurrentPrice()) sm.changeState(sm.unavailableState)
    }

    onExit(sm: BuildingStateManager): void {
        // throw new Error("Method not implemented.");
    }
}