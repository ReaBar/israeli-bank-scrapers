"use strict";
exports.__esModule = true;
exports.getDebug = void 0;
var debug_1 = require("debug");
function getDebug(name) {
    return (0, debug_1["default"])("israeli-bank-scrapers:".concat(name));
}
exports.getDebug = getDebug;
