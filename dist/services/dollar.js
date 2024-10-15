"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBsToDollar = exports.calculateDollarToBs = exports.getDollarPricesWithAverage = exports.getDollarPrices = void 0;
const formatDate_1 = require("../utils/formatDate");
const http_1 = __importDefault(require("./client/http"));
const ABS = 5;
const decimals = (number, decimals = 2) => Number(number.toFixed(decimals));
const getTendency = (tendency) => {
    if (tendency > 0) {
        return 'Uptrend';
    }
    else if (tendency < 0) {
        return 'Downtrend';
    }
    else {
        return 'Unchanged';
    }
};
const discard = (pivot, minus = 0, abs = 0) => Math.abs(pivot - minus) - abs > abs;
const getEntity = (data, name) => data.data.find((item) => item.name.toLowerCase().includes(name));
/**
 * Fetches an array with different values of the dollar in bolivars managed by entities that monitor this value.
 *
 * @returns {Promise<TDollar[] | null>} - A promise that resolves to an array with different dollar values
 * in bolivars given by the entities that monitor this value. Returns null if an error occurs.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
const getDollarPrices = async () => {
    try {
        // Fetch data from the specified URL
        const EXT = '/coins';
        const response = await http_1.default.get(EXT);
        if (!response) {
            throw new Error('Request failed');
        }
        // Parse text response from fetch function.
        let { data } = response;
        const pivot = data[0];
        const bcv = getEntity(response, 'bcv');
        const petro = getEntity(response, 'petro');
        const average = {
            ...pivot,
            name: 'Promedio',
            price: (bcv && pivot) ? (bcv.price + pivot?.price) / 2 : 0
        };
        data = data.filter((item) => item.currency === 'VES' && !discard(item.price, pivot.price, ABS) && item !== bcv && item !== petro);
        (bcv && pivot) && data.unshift(average);
        bcv && data.unshift(bcv);
        petro && data.push(petro);
        const priceResult = [];
        data.forEach((item) => {
            let { name, price, icon, updatedAt, price24h } = item;
            const difference = decimals(price - (price24h ?? 0));
            const percentage = decimals(difference / price).toString();
            let color = 'Unchanged';
            const tendency = getTendency(difference);
            if (tendency === 'Uptrend') {
                color = 'green';
            }
            if (tendency === 'Downtrend') {
                color = 'red';
            }
            name = name.replace('\u00F3', 'ó');
            const dollarData = {
                title: name,
                dollar: decimals(price),
                updatedDate: (0, formatDate_1.formatDate)(updatedAt),
                image: icon,
                difference: Number(Number(difference ?? 0).toFixed(2)),
                differencePercentage: percentage,
                tendency: tendency,
                tendencyColor: color,
            };
            priceResult.push(dollarData);
        });
        // Return the array of dollar values
        return priceResult;
    }
    catch (error) {
        // Handle error obtaining dollar values
        console.error(`Error obtaining dollar values.`, error);
        // Return null if an error occurs
        return null;
    }
};
exports.getDollarPrices = getDollarPrices;
/**
 * Fetches an array with different values of the dollar in bolivars managed by entities that monitor this value.
 * It also calculates the average of all entities with values greater than zero.
 *
 * @returns {Promise<TAverage | null>} - A promise that resolves to an array with different dollar values
 * in bolivars managed by entities that monitor this value, including an average of all these entities. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating data.
 */
const getDollarPricesWithAverage = async () => {
    try {
        // Fetch dollar prices from a remote source
        const priceResult = await (0, exports.getDollarPrices)();
        if (priceResult) {
            let average = 0;
            let length = 0;
            // Calculate average and create entities array
            const prices = priceResult.map((price) => {
                const name = price.title.toLowerCase();
                average = name !== 'petro' && name !== 'petro bs' ? Number(average) + Number(price.dollar) : Number(average);
                length = Number(price.dollar) > 0 && name !== 'petro' && name !== 'petro bs' ? length + 1 : length;
                const entity = {
                    entity: price.title,
                    info: price,
                };
                return entity;
            });
            // Create response object with average and entities array
            const response = {
                date: new Date(),
                average: Number((average / length).toFixed(2)),
                entities: prices,
            };
            // Return the response object
            return response;
        }
        // Return null if priceResult is null
        return null;
    }
    catch (error) {
        // Handle error calculating data
        console.error(`Error calculating data.`, error);
        // Return null if an error occurs
        return null;
    }
};
exports.getDollarPricesWithAverage = getDollarPricesWithAverage;
/**
 * Fetches an array with the different values of the dollar in bolivars handled by the entities that control this value and calculates the value of the amount of dollars supplied in bolivars.
 * @param dollar {number} - Amount in dollars to be calculated in bolivars.
 * @returns {Promise<TBsCalculated[] | null>} - A promise that resolves to an array with different dollar values.
 * in bolivars handled by entities that control this value, along with the calculation in bolivars of the amount supplied in dollars as a parameter. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating the data.
 */
const calculateDollarToBs = async (dollar) => {
    try {
        if (!dollar || dollar <= 0) {
            return null;
        }
        const entities = await (0, exports.getDollarPricesWithAverage)();
        const calculatedEntities = [];
        if (entities?.entities && entities?.entities.length > 0) {
            entities.entities.forEach((item) => {
                calculatedEntities.push({
                    ...item,
                    bolivarCalculated: Number(item.info.dollar) > 0 && item.info.title !== 'Petro'
                        ? Number(Number(Number(item.info.dollar) * dollar).toFixed(2))
                        : 0,
                });
            });
        }
        return calculatedEntities;
    }
    catch (error) {
        // Handle error calculating data
        console.error(`Error calculating data.`, error);
        // Return null if an error occurs
        return null;
    }
};
exports.calculateDollarToBs = calculateDollarToBs;
/**
 * Fetches an array with the different values of the bolivars in dollars handled by the entities that control this value and calculates the value of the amount of bolivars supplied in dollars.
 * @param bs {number} - Amount in bolivars to be calculated in dollars.
 * @returns {Promise<TDollarCalculated[] | null>} - A promise that resolves to an array with different dollar values.
 * in bolivars handled by entities that control this value, along with the calculation in bolivars of the amount supplied in dollars as a parameter. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating the data.
 */
const calculateBsToDollar = async (bs) => {
    try {
        if (!bs || bs <= 0) {
            return null;
        }
        const entities = await (0, exports.getDollarPricesWithAverage)();
        const calculatedEntities = [];
        if (entities?.entities && entities?.entities.length > 0) {
            entities.entities.forEach((item) => {
                calculatedEntities.push({
                    ...item,
                    dollarCalculated: Number(item.info.dollar) > 0 && item.info.title !== 'Petro'
                        ? Number(Number(bs / Number(item.info.dollar)).toFixed(2))
                        : 0,
                });
            });
        }
        return calculatedEntities;
    }
    catch (error) {
        // Handle error calculating data
        console.error(`Error calculating data.`, error);
        // Return null if an error occurs
        return null;
    }
};
exports.calculateBsToDollar = calculateBsToDollar;
