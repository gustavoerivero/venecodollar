"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatorEuroToBs = exports.calculatorBsToEuro = exports.getSpecificEuro = exports.getEuro = void 0;
const services_1 = require("../services");
const resp = __importStar(require("../utils/responses"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Fetches euro prices with average from a remote source.
 *
 * @param {Request} _ - Express request object (not used).
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
const getEuro = async (_, res) => {
    try {
        // Fetch euro prices with average from a remote source
        const response = await (0, services_1.getEuroPricesWithAverage)();
        // Send successful response
        return resp.makeResponsesOkData(res, response, 'Success');
    }
    catch (error) {
        // Handle error obtaining euro values
        console.error(`Error obtaining euro values.`, error);
        // Send error response
        return resp.makeResponsesError(res, new Error('It has been impossible to connect to the server.'));
    }
};
exports.getEuro = getEuro;
/**
 * Fetches specific euro prices based on the entity name from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
const getSpecificEuro = async (req, res) => {
    try {
        // Fetch euro prices with average from a remote source
        const prices = await (0, services_1.getEuroPricesWithAverage)();
        const entity = req.query.name;
        let response;
        if (prices && typeof entity === 'string') {
            // Filter entities based on the entity name
            response = prices.entities.filter((item) => item.entity.includes(entity));
        }
        else {
            response = prices?.entities;
        }
        if (response.length > 1) {
            let length = 0;
            let average = 0;
            response.forEach((item) => {
                if (item.info.euro > 0) {
                    length = length + 1;
                    average = item.info.euro + average;
                }
            });
            // Calculate average euro value and update response object
            response = {
                date: new Date(),
                average: average !== 0 ? Number((average / length).toFixed(2)) : 0,
                entities: response,
            };
        }
        else {
            // Update response object with single entity if only one entity is found
            response = response.pop();
        }
        // Send successful response
        return resp.makeResponsesOkData(res, response, 'Success');
    }
    catch (error) {
        // Handle error obtaining euro values
        console.error(`Error obtaining euro values.`, error);
        // Send error response
        return resp.makeResponsesError(res, new Error('It has been impossible to connect to the server.'));
    }
};
exports.getSpecificEuro = getSpecificEuro;
/**
 * Fetches specific prices in euros based on the amount of bolivars from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
const calculatorBsToEuro = async (req, res) => {
    try {
        // Obtain the amount in bolivars to be calculated in terms of euros.
        const bs = Number(req.query.bs ?? 0);
        const entity = req.query.entity ?? null;
        if (!bs || bs <= 0) {
            return resp.makeResponsesError(res, new Error('You must provide an amount to be calculated.'));
        }
        let response;
        const prices = await (0, services_1.calculateBsToEuro)(bs);
        if (prices && entity && typeof entity === 'string') {
            // Filter entities based on the entity name
            response = prices.filter((item) => item.entity.includes(entity));
        }
        else {
            response = prices;
        }
        if (response && response.length > 1) {
            let length = 0;
            let average = 0;
            response.forEach((item) => {
                if (item.euroCalculated > 0) {
                    length = length + 1;
                    average = item.euroCalculated + average;
                }
            });
            // Calculate average euro value and update response object
            response = {
                date: new Date(),
                average: average !== 0 ? Number((average / length).toFixed(2)) : 0,
                entities: response,
            };
        }
        else {
            // Update response object with single entity if only one entity is found
            response = response.pop();
        }
        // Send successful response
        return resp.makeResponsesOkData(res, response, 'Success');
    }
    catch (error) {
        // Handle error obtaining euro values
        console.error(`Error obtaining euro values.`, error);
        // Send error response
        return resp.makeResponsesError(res, new Error('It has been impossible to connect to the server.'));
    }
};
exports.calculatorBsToEuro = calculatorBsToEuro;
/**
 * Fetches specific prices in bolivars based on the amount of euros from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
const calculatorEuroToBs = async (req, res) => {
    try {
        // Obtain the amount in bolivars to be calculated in terms of euros.
        const euro = Number(req.query.euro ?? 0);
        const entity = req.query.entity ?? null;
        if (!euro || euro <= 0) {
            return resp.makeResponsesError(res, new Error('You must provide an amount to be calculated.'));
        }
        let response;
        const prices = await (0, services_1.calculateEuroToBs)(euro);
        if (prices && entity && typeof entity === 'string') {
            // Filter entities based on the entity name
            response = prices.filter((item) => item.entity.includes(entity));
        }
        else {
            response = prices;
        }
        if (response && response.length > 1) {
            let length = 0;
            let average = 0;
            response.forEach((item) => {
                if (item.bolivarCalculated > 0) {
                    length = length + 1;
                    average = item.bolivarCalculated + average;
                }
            });
            // Calculate average euro value and update response object
            response = {
                date: new Date(),
                average: average !== 0 ? Number((average / length).toFixed(2)) : 0,
                entities: response,
            };
        }
        else {
            // Update response object with single entity if only one entity is found
            response = response.pop();
        }
        // Send successful response
        return resp.makeResponsesOkData(res, response, 'Success');
    }
    catch (error) {
        // Handle error obtaining euro values
        console.error(`Error obtaining euro values.`, error);
        // Send error response
        return resp.makeResponsesError(res, new Error('It has been impossible to connect to the server.'));
    }
};
exports.calculatorEuroToBs = calculatorEuroToBs;
