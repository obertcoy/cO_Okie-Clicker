import { Game } from "./game_manager.js";
import { buyBuilding } from "./helper/BuildingHelper.js";
import { BuildingType } from "./model/Enum.js";
export function buyStoreBuilding(clicked) {
    clicked.addEventListener("click", (e) => {
        const buildingType = clicked.dataset.buildingType;
        if (buildingType) {
            const building = BuildingType[buildingType];
            const currentUser = Game.getCurrentUser();
            if (!building || !building.unlocked || !currentUser)
                return;
            if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.getCookies()) >= building.getCurrentPrice()) {
                buyBuilding(building, currentUser);
            }
        }
    });
}
