import { Game } from "../game_manager.js";
export class AvailableState {
    onEnter(sm) {
        var _a;
        (_a = sm.building.ui) === null || _a === void 0 ? void 0 : _a.available();
    }
    onUpdate(sm) {
        if (Game.getCurrentUser().cookies < sm.building.getCurrentPrice())
            sm.changeState(sm.unavailableState);
    }
    onExit(sm) {
        // throw new Error("Method not implemented.");
    }
}
