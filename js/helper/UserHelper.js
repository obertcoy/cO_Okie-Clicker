import { User } from "../model/User.js";
export function encryptPassword(string) {
    return btoa(string);
}
export function decryptPassword(string) {
    return atob(string);
}
export function saveData(user) {
    localStorage.setItem('userData', user.toJSONData());
}
export function loadData() {
    const data = localStorage.getItem('userData');
    if (data) {
        return User.fromJSONData(JSON.parse(data));
    }
    return null;
}
