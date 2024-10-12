"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDate = exports.before24hours = exports.formatDate = exports.getDate = exports.getHour = exports.timeZone = exports.locale = void 0;
const units_1 = __importDefault(require("../time/units"));
/**
 * The locale for date and time formatting.
 */
exports.locale = 'es-VE';
/**
 * The time zone for date and time calculations.
 */
exports.timeZone = 'America/Caracas';
/**
 * The options for date and time formatting.
 */
const options = { timeZone: exports.timeZone };
/**
 * Method to get the hour from a date string or Date object.
 * @param {string | Date | null} date - The date to extract the hour from.
 * @returns {string} The formatted hour in HH:mm AM/PM format.
 * @throws {Error} If the date value is missing or in an invalid format.
 */
const getHour = (date) => {
    try {
        if (!date) {
            throw Error('The date value must exist in date or string format.');
        }
        let localDate;
        if (typeof date === 'string') {
            localDate = new Date(date);
        }
        else {
            localDate = date;
        }
        return localDate.toLocaleTimeString(exports.locale, options).toUpperCase();
    }
    catch (error) {
        throw Error(`Error trying to get the hour: ${error}`);
    }
};
exports.getHour = getHour;
/**
 * Method to get the formatted date information from a Date object.
 * @param {Date} date - The date to extract the information from (default: current date).
 * @returns {Object | null} An object containing the day of the week, day of the month, month, and year.
 * @throws {Error} If there is an error while retrieving the date information.
 */
const getDate = (date = new Date()) => {
    try {
        const months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const d = new Date(date);
        return {
            dayWeek: days[d.getDay()],
            day: d.getDate(),
            month: months[d.getMonth()].toLowerCase(),
            year: d.getFullYear(),
        };
    }
    catch (error) {
        console.error(`Error trying to get the date: ${error}`);
        return null;
    }
};
exports.getDate = getDate;
/**
 * Method for reformatting the supplied date into "dd/MM/yyyy" format.
 * @param {string | Date | null} date - The date to be formatted.
 * @returns {string} The formatted date.
 * @throws {Error} If the date value is missing or in an invalid format.
 */
const formatDate = (date) => {
    try {
        if (!date) {
            throw Error('The date value must exist in date or string format.');
        }
        if (typeof date === 'string') {
            const newDate = date.split('T')[0].split('-');
            let [year, month, day] = newDate;
            day = Number(day) < 10 ? day[1] : day;
            month = Number(month) < 10 ? month[1] : month;
            return `${day}/${month}/${year}`;
        }
        else {
            return date.toLocaleDateString(exports.locale, options);
        }
    }
    catch (error) {
        throw Error(`Error trying to format the date: ${error}`);
    }
};
exports.formatDate = formatDate;
/**
 * Method to check if the given date is within the last 24 hours.
 * @param {string | Date | null} date - The date to be checked.
 * @returns {boolean} True if the date is within the last 24 hours, false otherwise.
 * @throws {Error} If the date value is missing or in an invalid format.
 */
const before24hours = (date) => {
    try {
        if (!date) {
            throw Error('The date value must exist in date or string format.');
        }
        let postDate;
        if (typeof date === 'string') {
            postDate = new Date(date);
        }
        else {
            postDate = date;
        }
        const currentDate = new Date();
        return currentDate.getTime() - postDate.getTime() < 86400000;
    }
    catch (error) {
        throw Error(`It was not possible to verify if the date is less than 24 hours from its existence: ${error}`);
    }
};
exports.before24hours = before24hours;
const convertDate = (text) => {
    const [, period] = text.split('Actualizó hace');
    let [unit, time] = period.split(' ').slice(-2);
    const unitNumber = unit === 'un' || unit === 'una' ? 1 : Number(unit);
    time = time.toLowerCase();
    if (time.endsWith('s')) {
        if (time !== 'mes') {
            time = time.substring(0, time.length - 1);
        }
    }
    const seconds = units_1.default.find((unit) => unit.text.toLowerCase() === time)?.value ?? 0;
    const now = new Date();
    const date = new Date(now.getTime() - unitNumber * seconds * 1000);
    return date;
};
exports.convertDate = convertDate;
