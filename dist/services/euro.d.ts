import { TBsEuroCalculated, TEuro, TEuroAverage, TEuroCalculated } from '../types';
/**
 * Fetches an array with different values of the dollar in bolivars managed by entities that monitor this value.
 *
 * @returns {Promise<TEuro[] | null>} - A promise that resolves to an array with different dollar values
 * in bolivars given by the entities that monitor this value. Returns null if an error occurs.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export declare const getEuroPrices: () => Promise<TEuro[] | null>;
/**
 * Fetches an array with different values of the dollar in bolivars managed by entities that monitor this value.
 * It also calculates the average of all entities with values greater than zero.
 *
 * @returns {Promise<TEuroAverage | null>} - A promise that resolves to an array with different dollar values
 * in bolivars managed by entities that monitor this value, including an average of all these entities. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating data.
 */
export declare const getEuroPricesWithAverage: () => Promise<TEuroAverage | null>;
/**
 * Fetches an array with the different values of the dollar in bolivars handled by the entities that control this value and calculates the value of the amount of euros supplied in bolivars.
 * @param euro {number} - Amount in euros to be calculated in bolivars.
 * @returns {Promise<TBsCalculated[] | null>} - A promise that resolves to an array with different dollar values.
 * in bolivars handled by entities that control this value, along with the calculation in bolivars of the amount supplied in euros as a parameter. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating the data.
 */
export declare const calculateEuroToBs: (euro: number) => Promise<TBsEuroCalculated[] | null>;
/**
 * Fetches an array with the different values of the bolivars in euros handled by the entities that control this value and calculates the value of the amount of bolivars supplied in euros.
 * @param bs {number} - Amount in bolivars to be calculated in euros.
 * @returns {Promise<TEuroCalculated[] | null>} - A promise that resolves to an array with different dollar values.
 * in bolivars handled by entities that control this value, along with the calculation in bolivars of the amount supplied in euros as a parameter. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating the data.
 */
export declare const calculateBsToEuro: (bs: number) => Promise<TEuroCalculated[] | null>;
