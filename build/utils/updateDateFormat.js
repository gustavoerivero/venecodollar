"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDateFormat = void 0;
/**
 * Method that allows to take a date given by the API that provides the values and convert it to a user-friendly format.
 * @param updatedDate Date in disorganized format in string type.
 * @returns {string | null} Date formatted as a string. If the parameter value is null, the null value is returned as well.
 */
var updateDateFormat = function (updatedDate) {
    if (!updatedDate)
        return null;
    var formatDate = updatedDate.split(' ');
    var hour = formatDate[1];
    var meridiem = '';
    var day = '';
    var lastIndex = formatDate.length - 1;
    if (formatDate.length > 3) {
        day = formatDate[lastIndex];
        meridiem = formatDate[lastIndex - 1].substring(0, 2);
    }
    else {
        day = formatDate[lastIndex].slice(2);
        meridiem = formatDate[lastIndex].slice(0, 2);
    }
    return "".concat(hour, " ").concat(meridiem, ", ").concat(day);
};
exports.updateDateFormat = updateDateFormat;
