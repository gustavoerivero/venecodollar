"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBsToDollar = exports.calculateDollarToBs = exports.getDollarPricesWithAverage = exports.getDollarPrices = void 0;
var axios_1 = __importDefault(require("axios"));
var updateDateFormat_1 = require("../utils/updateDateFormat");
var cheerio = require('cheerio');
/**
 * Fetches an array with different values of the dollar in bolivars managed by entities that monitor this value.
 *
 * @returns {Promise<TDollarArray | null>} - A promise that resolves to an array with different dollar values
 * in bolivars given by the entities that monitor this value. Returns null if an error occurs.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
var getDollarPrices = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, data, cheerioData_1, formatHTML, priceResult_1, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                url = (_a = process.env.BASE_URL) !== null && _a !== void 0 ? _a : '';
                return [4 /*yield*/, axios_1.default.get(url)
                    // Parse HTML data using Cheerio
                ];
            case 1:
                data = (_b.sent()).data;
                cheerioData_1 = cheerio.load(data);
                formatHTML = cheerioData_1('div.row.text-center')
                    .find('div.col-12.col-sm-4.col-md-2.col-lg-2');
                priceResult_1 = new Array();
                formatHTML.each(function (_, div) {
                    var title = cheerioData_1(div)
                        .find('h4')
                        .text();
                    var updatedDate = cheerioData_1(div)
                        .find('small')
                        .text()
                        .split('actualizado')
                        .pop();
                    updatedDate = (0, updateDateFormat_1.updateDateFormat)(updatedDate);
                    var text = cheerioData_1(div)
                        .find('p')
                        .text()
                        .replace(',', '.')
                        .split(' ')
                        .slice(-1)
                        .pop();
                    var dollar = Number(text) || 0;
                    var dollarData = {
                        title: title,
                        dollar: dollar,
                        updatedDate: updatedDate
                    };
                    return priceResult_1.push(dollarData);
                });
                // Return the array of dollar values
                return [2 /*return*/, priceResult_1];
            case 2:
                error_1 = _b.sent();
                // Handle error obtaining dollar values
                console.log("Error obtaining dollar values.", error_1);
                // Return null if an error occurs
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDollarPrices = getDollarPrices;
/**
 * Fetches an array with different values of the dollar in bolivars managed by entities that monitor this value.
 * It also calculates the average of all entities with values greater than zero.
 *
 * @returns {Promise<TDollarAverage | null>} - A promise that resolves to an array with different dollar values
 * in bolivars managed by entities that monitor this value, including an average of all these entities. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating data.
 */
var getDollarPricesWithAverage = function () { return __awaiter(void 0, void 0, void 0, function () {
    var priceResult, average_1, length_1, prices, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, exports.getDollarPrices)()];
            case 1:
                priceResult = _a.sent();
                if (priceResult) {
                    average_1 = 0;
                    length_1 = 0;
                    prices = priceResult.map(function (price) {
                        average_1 = average_1 + price.dollar;
                        length_1 = price.dollar > 0 ? length_1 + 1 : length_1;
                        var entity = {
                            entity: price.title,
                            info: price
                        };
                        return entity;
                    });
                    response = {
                        date: new Date(),
                        average: Number((average_1 / length_1).toFixed(2)),
                        entities: prices
                    };
                    // Return the response object
                    return [2 /*return*/, response];
                }
                // Return null if priceResult is null
                return [2 /*return*/, null];
            case 2:
                error_2 = _a.sent();
                // Handle error calculating data
                console.log("Error calculating data.", error_2);
                // Return null if an error occurs
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDollarPricesWithAverage = getDollarPricesWithAverage;
/**
* Fetches an array with the different values of the dollar in bolivars handled by the entities that control this value and calculates the value of the amount of dollars supplied in bolivars.
 * @param dollar {number} - Amount in dollars to be calculated in bolivars.
 * @returns {Promise<TBsCalculated[] | null>} - A promise that resolves to an array with different dollar values.
 * in bolivars handled by entities that control this value, along with the calculation in bolivars of the amount supplied in dollars as a parameter. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating the data.
 */
var calculateDollarToBs = function (dollar) { return __awaiter(void 0, void 0, void 0, function () {
    var entities, calculatedEntities_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!dollar || dollar <= 0) {
                    return [2 /*return*/, null];
                }
                return [4 /*yield*/, (0, exports.getDollarPricesWithAverage)()];
            case 1:
                entities = _a.sent();
                calculatedEntities_1 = [];
                if (entities && entities.entities && entities.entities.length > 0) {
                    entities.entities.forEach(function (item) {
                        calculatedEntities_1.push(__assign(__assign({}, item), { bolivarCalculated: item.info.dollar > 0 ? Number(Number(item.info.dollar * dollar).toFixed(2)) : 0 }));
                    });
                }
                return [2 /*return*/, calculatedEntities_1];
            case 2:
                error_3 = _a.sent();
                // Handle error calculating data
                console.log("Error calculating data.", error_3);
                // Return null if an error occurs
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.calculateDollarToBs = calculateDollarToBs;
/**
* Fetches an array with the different values of the bolivars in dollars handled by the entities that control this value and calculates the value of the amount of bolivars supplied in dollars.
 * @param bs {number} - Amount in bolivars to be calculated in dollars.
 * @returns {Promise<TDollarCalculated[] | null>} - A promise that resolves to an array with different dollar values.
 * in bolivars handled by entities that control this value, along with the calculation in bolivars of the amount supplied in dollars as a parameter. Returns null if an error occurs.
 * @throws {Error} - If there is an error calculating the data.
 */
var calculateBsToDollar = function (bs) { return __awaiter(void 0, void 0, void 0, function () {
    var entities, calculatedEntities_2, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!bs || bs <= 0) {
                    return [2 /*return*/, null];
                }
                return [4 /*yield*/, (0, exports.getDollarPricesWithAverage)()];
            case 1:
                entities = _a.sent();
                calculatedEntities_2 = [];
                if (entities && entities.entities && entities.entities.length > 0) {
                    entities.entities.forEach(function (item) {
                        calculatedEntities_2.push(__assign(__assign({}, item), { dollarCalculated: item.info.dollar > 0 ? Number(Number(bs / item.info.dollar).toFixed(2)) : 0 }));
                    });
                }
                return [2 /*return*/, calculatedEntities_2];
            case 2:
                error_4 = _a.sent();
                // Handle error calculating data
                console.log("Error calculating data.", error_4);
                // Return null if an error occurs
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.calculateBsToDollar = calculateBsToDollar;
