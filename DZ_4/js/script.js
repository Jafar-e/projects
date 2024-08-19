import { userName } from "./modules/greet.js";
import { greet } from "./modules/greet.js";
import { celsiusToFahrenheit } from "./modules/celsiusToFahrenheit.js";
import { calculateFallDistance } from "./modules/calculateFallDistance.js";
import { calculateAverage } from "./modules/calculateAverage.js";
import { concatStrings } from "./modules/concatStrings.js";

console.log(greet(userName));
console.log(celsiusToFahrenheit(66));
console.log(calculateFallDistance(17));
console.log(calculateAverage(354,493,271));
console.log(concatStrings("Hello", "World"));