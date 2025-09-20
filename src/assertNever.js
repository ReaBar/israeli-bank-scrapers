"use strict";
exports.__esModule = true;
exports.assertNever = void 0;
function assertNever(x, error) {
    if (error === void 0) { error = ''; }
    throw new Error(error || "Unexpected object: ".concat(x));
}
exports.assertNever = assertNever;
