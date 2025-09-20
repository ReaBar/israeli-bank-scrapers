"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var lodash_1 = require("lodash");
var moment_1 = require("moment");
var elements_interactions_1 = require("../helpers/elements-interactions");
var fetch_1 = require("../helpers/fetch");
var navigation_1 = require("../helpers/navigation");
var transactions_1 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var errors_1 = require("./errors");
var BASE_URL = 'https://start.telebank.co.il';
var DATE_FORMAT = 'YYYYMMDD';
function convertTransactions(txns, txnStatus) {
    if (!txns) {
        return [];
    }
    return txns.map(function (txn) {
        return {
            type: transactions_1.TransactionTypes.Normal,
            identifier: txn.OperationNumber,
            date: (0, moment_1["default"])(txn.OperationDate, DATE_FORMAT).toISOString(),
            processedDate: (0, moment_1["default"])(txn.ValueDate, DATE_FORMAT).toISOString(),
            originalAmount: txn.OperationAmount,
            originalCurrency: 'ILS',
            chargedAmount: txn.OperationAmount,
            description: txn.OperationDescriptionToDisplay,
            status: txnStatus
        };
    });
}
function fetchAccountData(page, options) {
    return __awaiter(this, void 0, void 0, function () {
        var apiSiteUrl, accountDataUrl, accountInfo, accountNumber, defaultStartMoment, startDate, startMoment, startDateStr, txnsUrl, txnsResult, completedTxns, rawFutureTxns, pendingTxns, accountData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiSiteUrl = "".concat(BASE_URL, "/Titan/gatewayAPI");
                    accountDataUrl = "".concat(apiSiteUrl, "/userAccountsData");
                    return [4 /*yield*/, (0, fetch_1.fetchGetWithinPage)(page, accountDataUrl)];
                case 1:
                    accountInfo = _a.sent();
                    if (!accountInfo) {
                        return [2 /*return*/, {
                                success: false,
                                errorType: errors_1.ScraperErrorTypes.Generic,
                                errorMessage: 'failed to get account data'
                            }];
                    }
                    accountNumber = accountInfo.UserAccountsData.DefaultAccountNumber;
                    defaultStartMoment = (0, moment_1["default"])().subtract(1, 'years').add(2, 'day');
                    startDate = options.startDate || defaultStartMoment.toDate();
                    startMoment = moment_1["default"].max(defaultStartMoment, (0, moment_1["default"])(startDate));
                    startDateStr = startMoment.format(DATE_FORMAT);
                    txnsUrl = "".concat(apiSiteUrl, "/lastTransactions/").concat(accountNumber, "/Date?IsCategoryDescCode=True&IsTransactionDetails=True&IsEventNames=True&IsFutureTransactionFlag=True&FromDate=").concat(startDateStr);
                    return [4 /*yield*/, (0, fetch_1.fetchGetWithinPage)(page, txnsUrl)];
                case 2:
                    txnsResult = _a.sent();
                    if (!txnsResult || txnsResult.Error ||
                        !txnsResult.CurrentAccountLastTransactions) {
                        return [2 /*return*/, {
                                success: false,
                                errorType: errors_1.ScraperErrorTypes.Generic,
                                errorMessage: txnsResult && txnsResult.Error ? txnsResult.Error.MsgText : 'unknown error'
                            }];
                    }
                    completedTxns = convertTransactions(txnsResult.CurrentAccountLastTransactions.OperationEntry, transactions_1.TransactionStatuses.Completed);
                    rawFutureTxns = lodash_1["default"].get(txnsResult, 'CurrentAccountLastTransactions.FutureTransactionsBlock.FutureTransactionEntry');
                    pendingTxns = convertTransactions(rawFutureTxns, transactions_1.TransactionStatuses.Pending);
                    accountData = {
                        success: true,
                        accounts: [{
                                accountNumber: accountNumber,
                                balance: txnsResult.CurrentAccountLastTransactions.CurrentAccountInfo.AccountBalance,
                                txns: __spreadArray(__spreadArray([], completedTxns, true), pendingTxns, true)
                            }]
                    };
                    return [2 /*return*/, accountData];
            }
        });
    });
}
function navigateOrErrorLabel(page) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 4]);
                    return [4 /*yield*/, (0, navigation_1.waitForNavigation)(page)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    e_1 = _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, '#general-error', false, 100)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getPossibleLoginResults() {
    var urls = {};
    urls[base_scraper_with_browser_1.LoginResults.Success] = ["".concat(BASE_URL, "/apollo/retail/#/MY_ACCOUNT_HOMEPAGE")];
    urls[base_scraper_with_browser_1.LoginResults.InvalidPassword] = ["".concat(BASE_URL, "/apollo/core/templates/lobby/masterPage.html#/LOGIN_PAGE")];
    urls[base_scraper_with_browser_1.LoginResults.ChangePassword] = ["".concat(BASE_URL, "/apollo/core/templates/lobby/masterPage.html#/PWD_RENEW")];
    return urls;
}
function createLoginFields(credentials) {
    return [
        { selector: '#tzId', value: credentials.id },
        { selector: '#tzPassword', value: credentials.password },
        { selector: '#aidnum', value: credentials.num },
    ];
}
var DiscountScraper = /** @class */ (function (_super) {
    __extends(DiscountScraper, _super);
    function DiscountScraper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiscountScraper.prototype.getLoginOptions = function (credentials) {
        var _this = this;
        return {
            loginUrl: "".concat(BASE_URL, "/login/#/LOGIN_PAGE"),
            checkReadiness: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (0, elements_interactions_1.waitUntilElementFound)(this.page, '#tzId')];
            }); }); },
            fields: createLoginFields(credentials),
            submitButtonSelector: '.sendBtn',
            postAction: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, navigateOrErrorLabel(this.page)];
            }); }); },
            possibleResults: getPossibleLoginResults()
        };
    };
    DiscountScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fetchAccountData(this.page, this.options)];
            });
        });
    };
    return DiscountScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = DiscountScraper;
