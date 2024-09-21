import { Game } from "../game_manager.js";
import { BuildingState } from "./BuildingState.js";
import { BuildingStateManager } from "./BuildingStateManager.js";

export class UnavailableState implements BuildingState{

    onEnter(sm: BuildingStateManager): void {
        sm.building.ui?.unavailable()
        if(!Game.getCurrentUser().hasBuilding(sm.building.type)) Game.getCurrentUser().buildings.push(sm.building)
    }
    onUpdate(sm: BuildingStateManager): void {
        if(Game.getCurrentUser().getCookies() >= sm.building.getCurrentPrice()) sm.changeState(sm.availableState)
    }

    onExit(sm: BuildingStateManager): void {
        // throw new Error("Method not implemented.");
    }
}