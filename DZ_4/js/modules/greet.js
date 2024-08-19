export let userName = "Андрей";

export function greet (userName = "Борис") {
    let userGreting = "Привет "+userName+"! Ну где же ты? Ну обними меня скорей! © И.Аллегрова"
    return userGreting;
}