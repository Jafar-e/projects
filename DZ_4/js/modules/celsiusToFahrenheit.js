export function celsiusToFahrenheit(degreesC = 0) {
    let degreesF = degreesC*1.8+32;
    return degreesC+"° по шкале Цельсия это "+degreesF+"° по шкале Фаренгейта";
}