import { displayCookie, displayStore, increaseCookie, initGame } from "./helper/GameHelper.js";
import { cookieShower } from "./helper/UIHelper.js";
import { loadData, saveData } from "./helper/UserHelper.js";
import { User } from "./model/User.js";
import { userClick } from "./user_click.js";

export class Game {
  private static instance: Game
  private currentUser: User

  private constructor(loggedInUser: User) {
      this.currentUser = loggedInUser;
      console.log(this.currentUser);
      Game.instance = this;
  }

  static getCurrentUser(): User {
    return Game.instance.currentUser
  }

  static initialize(loggedInUser: User): Game {
    if (!Game.instance) {
      return new Game(loggedInUser);
    }
    return Game.instance;
  }
}

const loggedInUser = loadData()

if(!loggedInUser){
  Game.initialize(new User("OO23-1"));
} else {
  Game.initialize(loggedInUser)
}

// Game.initialize(new User("test", "test"))
console.log(Game.getCurrentUser());

initGame()

const cookieIcon = document.getElementById("cookie-click-container")
const userCookieDisplay = document.getElementById("user-total-cookie")
const userCpsDisplay = document.getElementById("user-cps")
const cookieShowerContainer = document.getElementById("cookie-shower-container")!
const currentUser = Game.getCurrentUser();

let lastTimestamp = 0;

function update(timestamp = 0) {

  if (currentUser && cookieIcon && userCookieDisplay && userCpsDisplay) {
    userClick(cookieIcon)
    lastTimestamp = increaseCookie(lastTimestamp, timestamp)
    displayCookie(userCookieDisplay, userCpsDisplay, currentUser)
    displayStore()


  }

  window.requestAnimationFrame(update)
}

setInterval(() => {
  saveData(Game.getCurrentUser())
}, 15 * 1000);

setInterval(() => {
  cookieShower(cookieShowerContainer, currentUser)
}, 1.5 * 1000)

window.requestAnimationFrame(update)
