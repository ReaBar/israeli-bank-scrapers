"use strict";
exports.__esModule = true;
exports.createGenericError = exports.createTimeoutError = exports.ScraperErrorTypes = void 0;
var ScraperErrorTypes;
(function (ScraperErrorTypes) {
    ScraperErrorTypes["TwoFactorRetrieverMissing"] = "TWO_FACTOR_RETRIEVER_MISSING";
    ScraperErrorTypes["InvalidPassword"] = "INVALID_PASSWORD";
    ScraperErrorTypes["ChangePassword"] = "CHANGE_PASSWORD";
    ScraperErrorTypes["Timeout"] = "TIMEOUT";
    ScraperErrorTypes["AccountBlocked"] = "ACCOUNT_BLOCKED";
    ScraperErrorTypes["Generic"] = "GENERIC";
    ScraperErrorTypes["General"] = "GENERAL_ERROR";
})(ScraperErrorTypes = exports.ScraperErrorTypes || (exports.ScraperErrorTypes = {}));
function createErrorResult(errorType, errorMessage) {
    return {
        success: false,
        errorType: errorType,
        errorMessage: errorMessage
    };
}
function createTimeoutError(errorMessage) {
    return createErrorResult(ScraperErrorTypes.Timeout, errorMessage);
}
exports.createTimeoutError = createTimeoutError;
function createGenericError(errorMessage) {
    return createErrorResult(ScraperErrorTypes.Generic, errorMessage);
}
exports.createGenericError = createGenericError;
