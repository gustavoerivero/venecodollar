"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Array of time units with their respective values in seconds.
 *
 * @remarks
 * This array provides a set of predefined time units along with their corresponding values in seconds.
 * Each time unit object in the array contains an `id`, `text`, and `value` property representing the unique identifier, name, and value in seconds, respectively.
 * The time units are ordered from smallest to largest.
 *
 * The array contains a total of 16 time units, starting from id 1 for "Nanosecond" and ending with id 16 for "Millennium".
 *
 * @example
 * ```typescript
 * // Access the value of "Minute"
 * const minute = time[6].value; // 60 seconds
 *
 * // Iterate over all time units
 * time.forEach((unit) => {
 *   console.log(unit.text, unit.value);
 * });
 * ```
 */
const time = [
    { id: 1, text: 'Nanosegundo', value: 0.000000001 },
    { id: 2, text: 'Microsegundo', value: 0.000001 },
    { id: 3, text: 'Milisegundo', value: 0.001 },
    { id: 4, text: 'Centisegundo', value: 0.01 },
    { id: 5, text: 'Decitosegundo', value: 0.1 },
    { id: 6, text: 'Segundo', value: 1 },
    { id: 7, text: 'Minuto', value: 60 },
    { id: 8, text: 'Hora', value: 3600 },
    { id: 9, text: 'Día', value: 86400 },
    { id: 10, text: 'Semana', value: 604800 },
    { id: 11, text: 'Mes', value: 2419200 },
    { id: 12, text: 'Año', value: 29030400 },
    { id: 13, text: 'Lustro', value: 145152000 },
    { id: 14, text: 'Década', value: 725760000 },
    { id: 15, text: 'Siglo', value: 7257600000 },
    { id: 16, text: 'Milenio', value: 72576000000 },
];
exports.default = time;
