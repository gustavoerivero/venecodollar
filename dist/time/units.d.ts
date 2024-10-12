import { TTimeUnit } from '../types';
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
declare const time: TTimeUnit[];
export default time;
