import { Game } from "../game_manager.js";
export class UnavailableState {
    onEnter(sm) {
        var _a;
        (_a = sm.building.ui) === null || _a === void 0 ? void 0 : _a.unavailable();
        if (!Game.getCurrentUser().hasBuilding(sm.building.type))
            Game.getCurrentUser().buildings.push(sm.building);
    }
    onUpdate(sm) {
        if (Game.getCurrentUser().getCookies() >= sm.building.getCurrentPrice())
            sm.changeState(sm.availableState);
    }
    onExit(sm) {
        // throw new Error("Method not implemented.");
    }
}
