import { Building } from "../model/Building.js";
import { AvailableState } from "./AvailableState.js";
import { BuildingState } from "./BuildingState.js";
import { LockedState } from "./LockedState.js";
import { NotShownState } from "./NotShownState.js";
import { UnavailableState } from "./UnavailableState.js";

export class BuildingStateManager{

    building: Building
    currState: BuildingState
    notShownState: NotShownState
    lockedState: LockedState
    unavailableState: UnavailableState
    availableState: AvailableState

    constructor(building: Building){
        this.building = building
        this.notShownState = new NotShownState()
        this.lockedState = new LockedState()
        this.unavailableState = new UnavailableState()
        this.availableState = new AvailableState()
        this.currState = this.notShownState
    }

    enterState(){
        this.currState.onEnter(this)
    }

    changeState(state: BuildingState){
        this.currState?.onExit(this)
        this.currState = state
        this.currState.onEnter(this)
    }

    onUpdate(){
        this.currState.onUpdate(this)
    }

    getState(){
        return this.currState
    }
}