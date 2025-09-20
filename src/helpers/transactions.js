"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.filterOldTransactions = exports.sortTransactionsByDate = exports.fixInstallments = void 0;
var lodash_1 = require("lodash");
var moment_1 = require("moment");
var transactions_1 = require("../transactions");
function isNormalTransaction(txn) {
    return txn && txn.type === transactions_1.TransactionTypes.Normal;
}
function isInstallmentTransaction(txn) {
    return txn && txn.type === transactions_1.TransactionTypes.Installments;
}
function isNonInitialInstallmentTransaction(txn) {
    return isInstallmentTransaction(txn) && !!txn.installments && txn.installments.number > 1;
}
function isInitialInstallmentTransaction(txn) {
    return isInstallmentTransaction(txn) && !!txn.installments && txn.installments.number === 1;
}
function fixInstallments(txns) {
    return txns.map(function (txn) {
        var clonedTxn = __assign({}, txn);
        if (isInstallmentTransaction(clonedTxn) && isNonInitialInstallmentTransaction(clonedTxn) &&
            clonedTxn.installments) {
            var dateMoment = (0, moment_1["default"])(clonedTxn.date);
            var actualDateMoment = dateMoment.add(clonedTxn.installments.number - 1, 'month');
            clonedTxn.date = actualDateMoment.toISOString();
        }
        return clonedTxn;
    });
}
exports.fixInstallments = fixInstallments;
function sortTransactionsByDate(txns) {
    return lodash_1["default"].sortBy(txns, ['date']);
}
exports.sortTransactionsByDate = sortTransactionsByDate;
function filterOldTransactions(txns, startMoment, combineInstallments) {
    return txns.filter(function (txn) {
        var combineNeededAndInitialOrNormal = combineInstallments && (isNormalTransaction(txn) || isInitialInstallmentTransaction(txn));
        return (!combineInstallments && startMoment.isSameOrBefore(txn.date)) ||
            (combineNeededAndInitialOrNormal && startMoment.isSameOrBefore(txn.date));
    });
}
exports.filterOldTransactions = filterOldTransactions;
