import { Request, Response } from 'express';
/**
 * Fetches dollar prices with average from a remote source.
 *
 * @param {Request} _ - Express request object (not used).
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export declare const getDollar: (_: Request, res: Response) => Promise<void>;
/**
 * Fetches specific dollar prices based on the entity name from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export declare const getSpecificDollar: (req: Request, res: Response) => Promise<void>;
/**
 * Fetches specific prices in dollars based on the amount of bolivars from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export declare const calculatorBsToDollar: (req: Request, res: Response) => Promise<void>;
/**
 * Fetches specific prices in bolivars based on the amount of dollars from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining dollar values.
 */
export declare const calculatorDollarToBs: (req: Request, res: Response) => Promise<void>;
