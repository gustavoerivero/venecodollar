'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RDollar_1 = __importDefault(require("./RDollar"));
const REuro_1 = __importDefault(require("./REuro"));
const router = express_1.default.Router();
/**
 * Express router for handling requests to the "/dolar" endpoint.
 * @route /dolar
 * @handler require("./RDollar")
 */
router.use('/dollar', RDollar_1.default);
/**
 * Express router for handling requests to the "/euro" endpoint.
 * @route /euro
 * @handler require("./REuro")
 */
router.use('/euro', REuro_1.default);
exports.default = router;
