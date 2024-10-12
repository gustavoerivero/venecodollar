/**
 * The locale for date and time formatting.
 */
export declare const locale = "es-VE";
/**
 * The time zone for date and time calculations.
 */
export declare const timeZone = "America/Caracas";
/**
 * Method to get the hour from a date string or Date object.
 * @param {string | Date | null} date - The date to extract the hour from.
 * @returns {string} The formatted hour in HH:mm AM/PM format.
 * @throws {Error} If the date value is missing or in an invalid format.
 */
export declare const getHour: (date?: string | Date) => string;
/**
 * Method to get the formatted date information from a Date object.
 * @param {Date} date - The date to extract the information from (default: current date).
 * @returns {Object | null} An object containing the day of the week, day of the month, month, and year.
 * @throws {Error} If there is an error while retrieving the date information.
 */
export declare const getDate: (date?: Date) => {
    dayWeek: string;
    day: number;
    month: string;
    year: number;
} | null;
/**
 * Method for reformatting the supplied date into "dd/MM/yyyy" format.
 * @param {string | Date | null} date - The date to be formatted.
 * @returns {string} The formatted date.
 * @throws {Error} If the date value is missing or in an invalid format.
 */
export declare const formatDate: (date: string | Date | null) => string;
/**
 * Method to check if the given date is within the last 24 hours.
 * @param {string | Date | null} date - The date to be checked.
 * @returns {boolean} True if the date is within the last 24 hours, false otherwise.
 * @throws {Error} If the date value is missing or in an invalid format.
 */
export declare const before24hours: (date: string | Date | null) => boolean;
export declare const convertDate: (text: string) => Date;
