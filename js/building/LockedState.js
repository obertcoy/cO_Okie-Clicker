import { Game } from "../game_manager.js";
export class LockedState {
    onEnter(sm) {
        var _a, _b;
        sm.building.show();
        (_a = sm.building.ui) === null || _a === void 0 ? void 0 : _a.show(true);
        (_b = sm.building.ui) === null || _b === void 0 ? void 0 : _b.locked();
    }
    onUpdate(sm) {
        var _a;
        if (((_a = Game.getCurrentUser()) === null || _a === void 0 ? void 0 : _a.cookies) >= (sm.building.getCurrentPrice() * 3 / 4))
            sm.changeState(sm.unavailableState);
        if (Game.getCurrentUser().getBuilding(sm.building.type))
            sm.changeState(sm.unavailableState);
    }
    onExit(sm) {
        // throw new Error("Method not implemented.");
    }
}
