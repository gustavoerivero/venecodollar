"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatorDollarToBs = exports.calculatorBsToDollar = exports.getSpecificDollar = exports.getDollar = void 0;
var dollar_1 = require("../services/dollar");
require('dotenv').config();
var resp = require('../utils/responses');
/**
 * Fetches dollar prices with average from a remote source.
 *
 * @param {Request} _ - Express request object (not used).
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
var getDollar = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, dollar_1.getDollarPricesWithAverage)()
                    // Send successful response
                ];
            case 1:
                response = _a.sent();
                // Send successful response
                return [2 /*return*/, resp.makeResponsesOkData(res, response, 'Success')];
            case 2:
                error_1 = _a.sent();
                // Handle error obtaining dollar values
                console.log("Error obtaining dollar values.", error_1);
                // Send error response
                return [2 /*return*/, resp.makeResponsesError(res, 'It has been impossible to connect to the server.')];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDollar = getDollar;
/**
 * Fetches specific dollar prices based on the entity name from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
var getSpecificDollar = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prices, entity_1, response, length_1, average_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, dollar_1.getDollarPricesWithAverage)()];
            case 1:
                prices = _a.sent();
                entity_1 = req.query.name;
                response = void 0;
                if (prices && typeof entity_1 === 'string') {
                    // Filter entities based on the entity name
                    response = prices.entities.filter(function (item) { return item.entity.includes(entity_1); });
                }
                else {
                    response = prices === null || prices === void 0 ? void 0 : prices.entities;
                }
                if (response.length > 1) {
                    length_1 = 0;
                    average_1 = 0;
                    response.forEach(function (item) {
                        if (item.info.dollar > 0) {
                            length_1 = length_1 + 1;
                            average_1 = item.info.dollar + average_1;
                        }
                    });
                    // Calculate average dollar value and update response object
                    response = {
                        date: new Date(),
                        average: average_1 !== 0 ? Number((average_1 / length_1).toFixed(2)) : 0,
                        entities: response
                    };
                }
                else {
                    // Update response object with single entity if only one entity is found
                    response = response.pop();
                }
                // Send successful response
                return [2 /*return*/, resp.makeResponsesOkData(res, response, 'Success')];
            case 2:
                error_2 = _a.sent();
                // Handle error obtaining dollar values
                console.log("Error obtaining dollar values.", error_2);
                // Send error response
                return [2 /*return*/, resp.makeResponsesError(res, 'It has been impossible to connect to the server.')];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSpecificDollar = getSpecificDollar;
/**
 * Fetches specific prices in dollars based on the amount of bolivars from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
var calculatorBsToDollar = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bs, entity_2, response, prices, length_2, average_2, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                bs = Number((_a = req.query.bs) !== null && _a !== void 0 ? _a : 0);
                entity_2 = (_b = req.query.entity) !== null && _b !== void 0 ? _b : null;
                if (!bs || bs <= 0) {
                    return [2 /*return*/, resp.makeResponsesError(res, 'You must provide an amount to be calculated.')];
                }
                response = void 0;
                return [4 /*yield*/, (0, dollar_1.calculateBsToDollar)(bs)];
            case 1:
                prices = _c.sent();
                if (prices && entity_2 && typeof entity_2 === 'string') {
                    // Filter entities based on the entity name
                    response = prices.filter(function (item) { return item.entity.includes(entity_2); });
                }
                if (response && response.length > 1) {
                    length_2 = 0;
                    average_2 = 0;
                    response.forEach(function (item) {
                        if (item.dollarCalculated > 0) {
                            length_2 = length_2 + 1;
                            average_2 = item.dollarCalculated + average_2;
                        }
                    });
                    // Calculate average dollar value and update response object
                    response = {
                        date: new Date(),
                        average: average_2 !== 0 ? Number((average_2 / length_2).toFixed(2)) : 0,
                        entities: response
                    };
                }
                else {
                    // Update response object with single entity if only one entity is found
                    response = response.pop();
                }
                // Send successful response
                return [2 /*return*/, resp.makeResponsesOkData(res, response, 'Success')];
            case 2:
                error_3 = _c.sent();
                // Handle error obtaining dollar values
                console.log("Error obtaining dollar values.", error_3);
                // Send error response
                return [2 /*return*/, resp.makeResponsesError(res, 'It has been impossible to connect to the server.')];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.calculatorBsToDollar = calculatorBsToDollar;
/**
 * Fetches specific prices in bolivars based on the amount of dollars from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
var calculatorDollarToBs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dollar, entity_3, response, prices, length_3, average_3, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                dollar = Number((_a = req.query.dollar) !== null && _a !== void 0 ? _a : 0);
                entity_3 = (_b = req.query.entity) !== null && _b !== void 0 ? _b : null;
                if (!dollar || dollar <= 0) {
                    return [2 /*return*/, resp.makeResponsesError(res, 'You must provide an amount to be calculated.')];
                }
                response = void 0;
                return [4 /*yield*/, (0, dollar_1.calculateDollarToBs)(dollar)];
            case 1:
                prices = _c.sent();
                if (prices && entity_3 && typeof entity_3 === 'string') {
                    // Filter entities based on the entity name
                    response = prices.filter(function (item) { return item.entity.includes(entity_3); });
                }
                if (response && response.length > 1) {
                    length_3 = 0;
                    average_3 = 0;
                    response.forEach(function (item) {
                        if (item.bolivarCalculated > 0) {
                            length_3 = length_3 + 1;
                            average_3 = item.bolivarCalculated + average_3;
                        }
                    });
                    // Calculate average dollar value and update response object
                    response = {
                        date: new Date(),
                        average: average_3 !== 0 ? Number((average_3 / length_3).toFixed(2)) : 0,
                        entities: response
                    };
                }
                else {
                    // Update response object with single entity if only one entity is found
                    response = response.pop();
                }
                // Send successful response
                return [2 /*return*/, resp.makeResponsesOkData(res, response, 'Success')];
            case 2:
                error_4 = _c.sent();
                // Handle error obtaining dollar values
                console.log("Error obtaining dollar values.", error_4);
                // Send error response
                return [2 /*return*/, resp.makeResponsesError(res, 'It has been impossible to connect to the server.')];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.calculatorDollarToBs = calculatorDollarToBs;
