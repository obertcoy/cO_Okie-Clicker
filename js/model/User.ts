import { encryptPassword } from "../helper/UserHelper.js";
import { Upgrade } from "./Upgrade.js";
import { Achievement } from "./Achievement.js";
import { Grandma } from "./Grandma.js";
import { Building } from "./Building.js";
import { BuildingType } from "./Enum.js";
import { formatNumber } from "../helper/UIHelper.js";
import { Game } from "../game_manager.js";

export class User {
  constructor(
    public username: string,
    public cookies: number = 0,
    public clickMultiplier: number = 0,
    public buildings: Building[] = [],
    public upgrades: Upgrade[] = [],
    public achievements: Achievement[] = [],
    public grandmas: Grandma[] = [],
    public cookiesBaked: number = cookies,
    public runStarted: number = Date.now(),
    public clickCount: number = 0,
  ) {
  }

  static fromJSONData(data: any): User | null {
    if (data && data.user) {
      const { username, cookies, clickMultiplier, buildings, upgrades, achievements, grandmas, cookiesBaked, runStarted, clickCount } = data.user;

      const buildingInstances = buildings.map((buildingData: any ) => {
        return new Building(buildingData.type, buildingData.flavor,
          buildingData.baseCps,
          buildingData.basePrice,
          buildingData.unlocked,
          buildingData.shown,
          buildingData.quantity,
          buildingData.multiplier).addSM()
       })

       const upgradeInstances = upgrades.map((upgradeData: any) => {
        return new Upgrade(upgradeData.type, upgradeData.typeID,
          upgradeData.name,
          upgradeData.desc,
          upgradeData.flavor,
          upgradeData.cost,
          upgradeData.unlockCondition,
          upgradeData.effect)
       })

       const achievementInstances = achievements.map((achievementData: any) => {
        return new Achievement(achievementData.type, achievementData.typeID,
          achievementData.name,
          achievementData.desc,
          achievementData.achieveCondition,
          achievementData.buildingType ?? null,
          achievementData.achieved)
       })

       const grandmaInstances = grandmas.map((grandmaData: any) => {
        return new Grandma(grandmaData.name, grandmaData.age, grandmaData.src)
       })       

    return new User(
        username,
        cookies,
        clickMultiplier,
        buildingInstances, 
        upgradeInstances,
        achievementInstances,
        grandmaInstances,
        cookiesBaked,
        runStarted,
        clickCount
    )    
  }
    return null;
  }

  toJSONData() {

    const data= {
      user: {
        username: this.username,
        cookies: this.cookies,
        clickMultiplier: this.clickMultiplier,
        buildings: this.buildings.map((building) => building.serialize()),
        upgrades: this.upgrades,
        achievements: this.achievements,
        grandmas: this.grandmas,
        cookiesBaked : this.cookiesBaked,
        runStarted : this.runStarted,
        clickCount: this.clickCount
      },
    };
    console.log(data);
    
    return JSON.stringify(data);
  }
  
  getTotalCps(){
    return (this.buildings.reduce(
      (totalCps, building) => totalCps + building.getBuildingCps(),
      0
    )).toFixed(1)
  }

  getCookies(){
    return Math.floor(this.cookies)
  }

  getCookiesBaked(){
    return Math.floor(this.cookiesBaked)
  }


  getClickCookie(): string {    
    const result = 1 + (this.clickMultiplier * parseFloat(this.getTotalCps()));

    if (Number.isInteger(result)) {
        return result.toString()
    } else {
        return result.toFixed(3);
    }  }


  addClickMultiplier(multiplier: number): void {
    this.clickMultiplier += multiplier;
  }

  addUserCookie(cookie: number): void {
    this.cookies += cookie;
    if(cookie > 0) this.cookiesBaked += cookie
  }

  setUsername(name: string){
    this.username = name
  }

  addGrandma(grandma: Grandma){
    this.grandmas.push(grandma)
  }

  getGrandma(idx: number): Grandma{
    return this.grandmas[idx]
  }

  hasBuilding(buildingType: BuildingType): boolean {    
    return this.buildings.some(building => building.type === buildingType);
  }

  getBuildingCount(buildingType: BuildingType){
    return this.buildings.find((building) => building.type === buildingType)?.quantity!
  }

  getBuilding(buildingType: BuildingType){
    return this.buildings.find((building) => building.type === buildingType)
  }

  hasUpgrade(upgrade: Upgrade){
    return this.upgrades.some(userUpgrade => userUpgrade.name == upgrade.name)
  }

  hasAchievement(achievement: Achievement){
    return this.achievements.some(userAchievement => userAchievement.name == achievement.name)
  }

  addClickCount(){
    this.clickCount += 1
  }
}
