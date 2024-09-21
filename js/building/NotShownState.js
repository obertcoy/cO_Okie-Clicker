import { buildings } from "../helper/BuildingHelper.js";
import { AvailableState } from "./AvailableState.js";
import { UnavailableState } from "./UnavailableState.js";
export class NotShownState {
    onEnter(sm) {
        var _a;
        if (sm.building.shown)
            return sm.changeState(sm.lockedState);
        (_a = sm.building.ui) === null || _a === void 0 ? void 0 : _a.show(false);
    }
    onUpdate(sm) {
        const idx = buildings.indexOf(sm.building);
        if (buildings[idx - 1].sm.getState() instanceof UnavailableState || buildings[idx - 1].sm.getState() instanceof AvailableState)
            sm.changeState(sm.lockedState);
    }
    onExit(sm) {
        // throw new Error("Method not implemented.");
    }
}
