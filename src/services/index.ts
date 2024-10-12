import dotenv from 'dotenv';

dotenv.config();

/**
 * Base URL.
 * export const BASE_URL = process.env.BASE_URL ?? "";
 */
export const BASE_URL = process.env.SERVICE_API ?? 'https://exchange.vcoud.com';

export * from './dollar';
export * from './euro';
