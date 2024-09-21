import { AvailableState } from "./AvailableState.js";
import { LockedState } from "./LockedState.js";
import { NotShownState } from "./NotShownState.js";
import { UnavailableState } from "./UnavailableState.js";
export class BuildingStateManager {
    constructor(building) {
        this.building = building;
        this.notShownState = new NotShownState();
        this.lockedState = new LockedState();
        this.unavailableState = new UnavailableState();
        this.availableState = new AvailableState();
        this.currState = this.notShownState;
    }
    enterState() {
        this.currState.onEnter(this);
    }
    changeState(state) {
        var _a;
        (_a = this.currState) === null || _a === void 0 ? void 0 : _a.onExit(this);
        this.currState = state;
        this.currState.onEnter(this);
    }
    onUpdate() {
        this.currState.onUpdate(this);
    }
    getState() {
        return this.currState;
    }
}
