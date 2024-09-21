import { Game } from "./game_manager.js";
import { formatNumber } from "./helper/UIHelper.js";
export function userClick(clicked) {
    const currentUser = Game.getCurrentUser();
    const cookie = parseFloat(currentUser.getClickCookie());
    clicked.onclick = (e) => {
        clickCookieNumber(clicked, e, cookie);
        currentUser.addUserCookie(cookie);
        currentUser.addClickCount();
    };
}
function clickCookieNumber(clicked, event, cookie) {
    const clickerOffset = clicked.getBoundingClientRect();
    const position = {
        x: event.pageX - clickerOffset.left,
        y: event.pageY - clickerOffset.top
    };
    const numberElement = document.createElement("div");
    numberElement.textContent = "+" + formatNumber(cookie);
    numberElement.className = "cookie-number";
    numberElement.style.left = position.x + "px";
    numberElement.style.top = position.y + "px";
    clicked.appendChild(numberElement);
    const movementInterval = window.setInterval(function () {
        position.y--;
        numberElement.style.top = position.y + "px";
    }, 10);
    fade(numberElement, 2500, 0.2, function () {
        clearInterval(movementInterval);
        numberElement.remove();
    });
}
export function fade(element, duration, finalOpacity, callback) {
    let opacity = 1;
    const fadeInterval = window.setInterval(function () {
        opacity -= 50 / duration;
        if (opacity <= finalOpacity) {
            clearInterval(fadeInterval);
            callback();
        }
        element.style.opacity = opacity.toString();
    }, 50);
}
