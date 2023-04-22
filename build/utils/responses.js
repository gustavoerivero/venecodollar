"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message = require('./messages.json');
/**
 * Function that generates a JSON response with an error message for HTTP 404 status code.
 * @param res Response object from Express.
 * @param err Error object to be included in the response.
 * @param code Optional code parameter to specify the error message. Defaults to 'UnexpectedError'.
 */
function makeResponsesError(res, err, code) {
    var msg = {
        OK: 0,
        Error: err,
        Message: message[code || 'UnexpectedError']
    };
    res.status(404).json(msg);
}
/**
 * Function that generates a JSON response with an exception message for HTTP 404 status code.
 * @param res Response object from Express.
 * @param err Error object to be included in the response.
 */
function makeResponsesException(res, err) {
    var msg = {
        OK: 0,
        Message: err
    };
    res.status(404).json(msg);
}
/**
 * Function that generates a JSON response with a success message for HTTP 200 status code.
 * @param res Response object from Express.
 * @param code Optional code parameter to specify the success message. Defaults to 'Success'.
 */
function makeResponsesOk(res, code) {
    var msg = {
        OK: 1,
        Message: message[code || 'Success']
    };
    res.status(200).json(msg);
}
/**
 * Function that generates a JSON response with data, success message, and HTTP 200 status code.
 * @param res Response object from Express.
 * @param data AxiosResponse object to be included in the response.
 * @param code Optional code parameter to specify the success message. Defaults to 'Success'.
 */
function makeResponsesOkData(res, data, code) {
    var msg = {
        OK: 1,
        Data: data,
        Message: message[code || 'Success']
    };
    res.status(200).json(msg);
}
module.exports = {
    makeResponsesException: makeResponsesException,
    makeResponsesOkData: makeResponsesOkData,
    makeResponsesError: makeResponsesError,
    makeResponsesOk: makeResponsesOk
};