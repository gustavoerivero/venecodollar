import { Response } from 'express';
export type Code = 'Success' | 'UnexpectedError' | 'Error';
/**
 * Function that generates a JSON response with an error message for HTTP 404 status code.
 * @param res Response object from Express.
 * @param err Error object to be included in the response.
 * @param code Optional code parameter to specify the error message. Defaults to "UnexpectedError".
 */
export declare const makeResponsesError: (res: Response, err: Error, code?: Code) => void;
/**
 * Function that generates a JSON response with an exception message for HTTP 404 status code.
 * @param res Response object from Express.
 * @param err Error object to be included in the response.
 */
export declare const makeResponsesException: (res: Response, err: Error) => void;
/**
 * Function that generates a JSON response with a success message for HTTP 200 status code.
 * @param res Response object from Express.
 * @param code Optional code parameter to specify the success message. Defaults to "Success".
 */
export declare const makeResponsesOk: (res: Response, code?: "Success" | "UnexpectedError" | "Error") => void;
/**
 * Function that generates a JSON response with data, success message, and HTTP 200 status code.
 * @param res Response object from Express.
 * @param data Any object to be included in the response.
 * @param code Optional code parameter to specify the success message. Defaults to "Success".
 */
export declare const makeResponsesOkData: (res: Response, data: any, code?: "Success" | "UnexpectedError" | "Error") => void;
