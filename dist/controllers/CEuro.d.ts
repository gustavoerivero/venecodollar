import { Request, Response } from 'express';
/**
 * Fetches euro prices with average from a remote source.
 *
 * @param {Request} _ - Express request object (not used).
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
export declare const getEuro: (_: Request, res: Response) => Promise<void>;
/**
 * Fetches specific euro prices based on the entity name from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
export declare const getSpecificEuro: (req: Request, res: Response) => Promise<void>;
/**
 * Fetches specific prices in euros based on the amount of bolivars from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
export declare const calculatorBsToEuro: (req: Request, res: Response) => Promise<void>;
/**
 * Fetches specific prices in bolivars based on the amount of euros from a remote source.
 *
 * @param {Request} req - Express request object containing the query parameters.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 * @throws {Error} - If there is an error obtaining euro values.
 */
export declare const calculatorEuroToBs: (req: Request, res: Response) => Promise<void>;
