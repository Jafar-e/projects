export function calculateFallDistance(fallSeconds = 0) {
    const gravitationalAcceleration = 9.8;
    let distance = "Расстояние падения за время "+fallSeconds+" секунд составит: "+((gravitationalAcceleration*fallSeconds**2)/2).toFixed(2)+" метров";
    return distance;
}