"use strict";
exports.__esModule = true;
var moment_1 = require("moment");
function getAllMonthMoments(startMoment, futureMonths) {
    var monthMoment = (0, moment_1["default"])(startMoment).startOf('month');
    var allMonths = [];
    var lastMonth = (0, moment_1["default"])().startOf('month');
    if (futureMonths && futureMonths > 0) {
        lastMonth = lastMonth.add(futureMonths, 'month');
    }
    while (monthMoment.isSameOrBefore(lastMonth)) {
        allMonths.push(monthMoment);
        monthMoment = (0, moment_1["default"])(monthMoment).add(1, 'month');
    }
    return allMonths;
}
exports["default"] = getAllMonthMoments;
