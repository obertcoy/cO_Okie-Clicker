import { displayAchievedAchievement, getAchievementTypeName } from "../helper/AchievementHelper.js";
import { getBuildingTypeName } from "../helper/BuildingHelper.js";
import { saveData } from "../helper/UserHelper.js";
import { AchievementType, BuildingType } from "./Enum.js";
export class Achievement {
    constructor(type, typeID, name, desc, achieveCondition, buildingType = null, achieved = false) {
        this.type = type;
        this.typeID = typeID;
        this.name = name;
        this.desc = desc;
        if (this.type === AchievementType.Building) {
            this.src = `../assets/achievement/${getAchievementTypeName(this.type).toLowerCase()}/${getBuildingTypeName(buildingType).toLowerCase()}/${getBuildingTypeName(buildingType).toLowerCase()}-${typeID}.png`;
        }
        else {
            this.src = `../assets/achievement/${getAchievementTypeName(this.type).toLowerCase()}/${getAchievementTypeName(this.type).toLowerCase()}-${typeID}.png`;
        }
        this.achieved = achieved;
        this.achieveCondition = achieveCondition;
        this.buildingType = buildingType;
        this.subcontainer = null;
    }
    checkCondition(user) {
        if (this.achieveCondition(user)) {
            this.achieved = true;
            user.achievements.push(this);
            displayAchievedAchievement(this);
            saveData(user);
        }
    }
    addSubcontainer(subcontainer) {
        this.subcontainer = subcontainer;
    }
}
export const achievements = [
    new Achievement(AchievementType.Bake, 1, "Wake and bake", "Bake 1 cookie in one ascension", (user) => user.getCookies() >= 1),
    new Achievement(AchievementType.Bake, 2, "Making some dough", "Bake 1,000 cookies in one ascension", (user) => user.getCookies() >= 1000),
    new Achievement(AchievementType.Bake, 3, "So baked right now", "Bake 100,000 cookies in one ascension", (user) => user.getCookies() >= 100000),
    new Achievement(AchievementType.Bake, 4, "Fledgling bakery", "Bake 1 million cookies in one ascension", (user) => user.getCookies() >= 1000000),
    new Achievement(AchievementType.Cps, 1, "Casual baking", "Bake 1 cookie per second", (user) => parseFloat(user.getTotalCps()) >= 1),
    new Achievement(AchievementType.Cps, 2, "Hardcore baking", "Bake 10 cookies per second", (user) => parseFloat(user.getTotalCps()) >= 10),
    new Achievement(AchievementType.Cps, 3, "Steady tasty stream", "Bake 100 cookies per second", (user) => parseFloat(user.getTotalCps()) >= 100),
    new Achievement(AchievementType.Cps, 4, "Cookie monster", "Bake 1,000 cookies per second", (user) => parseFloat(user.getTotalCps()) >= 1000),
    new Achievement(AchievementType.Cps, 5, "Mass producer", "Bake 10,000 cookies per second", (user) => parseFloat(user.getTotalCps()) >= 10000),
    new Achievement(AchievementType.Click, 1, "Clicktastic", "Make 1,000 cookies from clicking", (user) => parseFloat(user.getClickCookie()) >= 1000),
    new Achievement(AchievementType.Click, 2, "Clickathlon", "Make 100,000 cookies from clicking", (user) => parseFloat(user.getClickCookie()) >= 100000),
    new Achievement(AchievementType.Click, 3, "Clickolympics", "Make 10 million cookies from clicking", (user) => parseFloat(user.getClickCookie()) >= 10000000),
    new Achievement(AchievementType.Building, 1, "Click", "Have 1 cursor", (user) => user.getBuildingCount(BuildingType.Cursor) >= 1, BuildingType.Cursor),
    new Achievement(AchievementType.Building, 2, "Plain bi-cursor", "Double-click: Have 2 cursors", (user) => user.getBuildingCount(BuildingType.Cursor) >= 2, BuildingType.Cursor),
    new Achievement(AchievementType.Building, 3, "Plain tri-cursor", "Mouse wheel: Have 50 cursors", (user) => user.getBuildingCount(BuildingType.Cursor) >= 50, BuildingType.Cursor),
    new Achievement(AchievementType.Building, 1, "Grandma's cookies", "Have 1 grandma", (user) => user.getBuildingCount(BuildingType.Grandma) >= 1, BuildingType.Grandma),
    new Achievement(AchievementType.Building, 2, "Sloppy kisses", "Have 50 grandmas", (user) => user.getBuildingCount(BuildingType.Grandma) >= 50, BuildingType.Grandma),
    new Achievement(AchievementType.Building, 3, "Retirement home", "Have 100 grandmas", (user) => user.getBuildingCount(BuildingType.Grandma) >= 100, BuildingType.Grandma),
    // Farm achievements
    new Achievement(AchievementType.Building, 1, "Bought the farm", "Have 1 farm", (user) => user.getBuildingCount(BuildingType.Farm) >= 1, BuildingType.Farm),
    new Achievement(AchievementType.Building, 2, "Reap what you sow", "Have 50 farms", (user) => user.getBuildingCount(BuildingType.Farm) >= 50, BuildingType.Farm),
    new Achievement(AchievementType.Building, 3, "Farm ill", "Have 100 farms", (user) => user.getBuildingCount(BuildingType.Farm) >= 100, BuildingType.Farm),
    // Mine achievements
    new Achievement(AchievementType.Building, 1, "You know the drill", "Have 1 mine", (user) => user.getBuildingCount(BuildingType.Mine) >= 1, BuildingType.Mine),
    new Achievement(AchievementType.Building, 2, "Excavation site", "Have 50 mines", (user) => user.getBuildingCount(BuildingType.Mine) >= 50, BuildingType.Mine),
    new Achievement(AchievementType.Building, 3, "Hollow the planet", "Have 100 mines", (user) => user.getBuildingCount(BuildingType.Mine) >= 100, BuildingType.Mine),
    // Factory achievements
    new Achievement(AchievementType.Building, 1, "Production chain", "Have 1 factory", (user) => user.getBuildingCount(BuildingType.Factory) >= 1, BuildingType.Factory),
    new Achievement(AchievementType.Building, 2, "Industrial revolution", "Have 50 factories", (user) => user.getBuildingCount(BuildingType.Factory) >= 50, BuildingType.Factory),
    new Achievement(AchievementType.Building, 3, "Global warming", "Have 100 factories", (user) => user.getBuildingCount(BuildingType.Factory) >= 100, BuildingType.Factory),
];
