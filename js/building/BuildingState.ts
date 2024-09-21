import { Building } from "../model/Building";
import { User } from "../model/User";
import { BuildingStateManager } from "./BuildingStateManager";

export interface BuildingState {
    onEnter(sm: BuildingStateManager): void
    onUpdate(sm: BuildingStateManager): void
    onExit(sm: BuildingStateManager): void
}