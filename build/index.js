"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./routes"));
var CDollar_1 = require("./controllers/CDollar");
module.exports = { getDollarPrices: CDollar_1.getDollarPrices, getDollarPricesWithAverage: CDollar_1.getDollarPricesWithAverage };
require('dotenv').config();
var port = process.env.PORT || 3030;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
var url = "".concat(process.env.URL).concat(process.env.API_VER_URL);
app.use(url, routes_1.default);
app.get(url, function (_, res) { return res.send("Connected!"); });
app.listen(port, function () {
    console.log("Server is running on ".concat(url));
});
/**
 * This module is responsible for setting up an Express server that listens for incoming requests.
 * It uses Express, cors, and morgan as middleware for handling requests and responses.
 * The routes module is imported and used for routing incoming requests.
 * The getDollarPrices and getDollarPricesWithAverage functions are exported from the './controllers/CDollar' module.
 * The dotenv module is used for environment variable configuration.
 * The server listens on the specified port (either from environment variable or default 3030).
 * The base URL for the API is configured using environment variables and used for routing.
 * The server sends a 'Connected!' response for the base URL to indicate successful connection.
 */ 
