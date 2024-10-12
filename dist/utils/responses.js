"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResponsesOkData = exports.makeResponsesOk = exports.makeResponsesException = exports.makeResponsesError = void 0;
const messages_1 = __importDefault(require("./messages"));
/**
 * Function that generates a JSON response with an error message for HTTP 404 status code.
 * @param res Response object from Express.
 * @param err Error object to be included in the response.
 * @param code Optional code parameter to specify the error message. Defaults to "UnexpectedError".
 */
const makeResponsesError = (res, err, code) => {
    const msg = {
        OK: 0,
        Error: err,
        Message: messages_1.default[code ?? 'UnexpectedError'],
    };
    res.status(404).json(msg);
};
exports.makeResponsesError = makeResponsesError;
/**
 * Function that generates a JSON response with an exception message for HTTP 404 status code.
 * @param res Response object from Express.
 * @param err Error object to be included in the response.
 */
const makeResponsesException = (res, err) => {
    const msg = {
        OK: 0,
        Message: err,
    };
    res.status(404).json(msg);
};
exports.makeResponsesException = makeResponsesException;
/**
 * Function that generates a JSON response with a success message for HTTP 200 status code.
 * @param res Response object from Express.
 * @param code Optional code parameter to specify the success message. Defaults to "Success".
 */
const makeResponsesOk = (res, code) => {
    const msg = {
        OK: 1,
        Message: messages_1.default[code ?? 'Success'],
    };
    res.status(200).json(msg);
};
exports.makeResponsesOk = makeResponsesOk;
/**
 * Function that generates a JSON response with data, success message, and HTTP 200 status code.
 * @param res Response object from Express.
 * @param data Any object to be included in the response.
 * @param code Optional code parameter to specify the success message. Defaults to "Success".
 */
const makeResponsesOkData = (res, data, code) => {
    const msg = {
        OK: 1,
        Data: data,
        Message: messages_1.default[code ?? 'Success'],
    };
    res.status(200).json(msg);
};
exports.makeResponsesOkData = makeResponsesOkData;
