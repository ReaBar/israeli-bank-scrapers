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
exports.__esModule = true;
exports.getMemo = void 0;
var build_url_1 = require("build-url");
var moment_1 = require("moment");
var constants_1 = require("../constants");
var dates_1 = require("../helpers/dates");
var debug_1 = require("../helpers/debug");
var elements_interactions_1 = require("../helpers/elements-interactions");
var fetch_1 = require("../helpers/fetch");
var navigation_1 = require("../helpers/navigation");
var transactions_1 = require("../helpers/transactions");
var transactions_2 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var debug = (0, debug_1.getDebug)('max');
var BASE_API_ACTIONS_URL = 'https://onlinelcapi.max.co.il';
var BASE_WELCOME_URL = 'https://www.max.co.il';
var LOGIN_URL = "".concat(BASE_WELCOME_URL, "/homepage/welcome");
var PASSWORD_EXPIRED_URL = "".concat(BASE_WELCOME_URL, "/renew-password");
var SUCCESS_URL = "".concat(BASE_WELCOME_URL, "/homepage/personal");
var MaxPlanName;
(function (MaxPlanName) {
    MaxPlanName["Normal"] = "\u05E8\u05D2\u05D9\u05DC\u05D4";
    MaxPlanName["ImmediateCharge"] = "\u05D7\u05D9\u05D5\u05D1 \u05E2\u05E1\u05E7\u05D5\u05EA \u05DE\u05D9\u05D9\u05D3\u05D9";
    MaxPlanName["InternetShopping"] = "\u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8/\u05D7\u05D5\"\u05DC";
    MaxPlanName["Installments"] = "\u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD";
    MaxPlanName["MonthlyCharge"] = "\u05D7\u05D9\u05D5\u05D1 \u05D7\u05D5\u05D3\u05E9\u05D9";
    MaxPlanName["OneMonthPostponed"] = "\u05D3\u05D7\u05D5\u05D9 \u05D7\u05D5\u05D3\u05E9";
    MaxPlanName["MonthlyPostponed"] = "\u05D3\u05D7\u05D5\u05D9 \u05DC\u05D7\u05D9\u05D5\u05D1 \u05D4\u05D7\u05D5\u05D3\u05E9\u05D9";
    MaxPlanName["MonthlyPayment"] = "\u05EA\u05E9\u05DC\u05D5\u05DD \u05D7\u05D5\u05D3\u05E9\u05D9";
    MaxPlanName["FuturePurchaseFinancing"] = "\u05DE\u05D9\u05DE\u05D5\u05DF \u05DC\u05E8\u05DB\u05D9\u05E9\u05D4 \u05E2\u05EA\u05D9\u05D3\u05D9\u05EA";
    MaxPlanName["MonthlyPostponedInstallments"] = "\u05D3\u05D7\u05D5\u05D9 \u05D7\u05D5\u05D3\u05E9 \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD";
    MaxPlanName["ThirtyDaysPlus"] = "\u05E2\u05E1\u05E7\u05EA 30 \u05E4\u05DC\u05D5\u05E1";
    MaxPlanName["TwoMonthsPostponed"] = "\u05D3\u05D7\u05D5\u05D9 \u05D7\u05D5\u05D3\u05E9\u05D9\u05D9\u05DD";
    MaxPlanName["TwoMonthsPostponed2"] = "\u05D3\u05D7\u05D5\u05D9 2 \u05D7' \u05EA\u05E9\u05DC\u05D5\u05DE\u05D9\u05DD";
    MaxPlanName["MonthlyChargePlusInterest"] = "\u05D7\u05D5\u05D3\u05E9\u05D9 + \u05E8\u05D9\u05D1\u05D9\u05EA";
    MaxPlanName["Credit"] = "\u05E7\u05E8\u05D3\u05D9\u05D8";
    MaxPlanName["CreditOutsideTheLimit"] = "\u05E7\u05E8\u05D3\u05D9\u05D8-\u05DE\u05D7\u05D5\u05E5 \u05DC\u05DE\u05E1\u05D2\u05E8\u05EA";
    MaxPlanName["AccumulatingBasket"] = "\u05E1\u05DC \u05DE\u05E6\u05D8\u05D1\u05E8";
    MaxPlanName["PostponedTransactionInstallments"] = "\u05E4\u05E8\u05D9\u05E1\u05EA \u05D4\u05E2\u05E1\u05E7\u05D4 \u05D4\u05D3\u05D7\u05D5\u05D9\u05D4";
    MaxPlanName["ReplacementCard"] = "\u05DB\u05E8\u05D8\u05D9\u05E1 \u05D7\u05DC\u05D9\u05E4\u05D9";
    MaxPlanName["EarlyRepayment"] = "\u05E4\u05E8\u05E2\u05D5\u05DF \u05DE\u05D5\u05E7\u05D3\u05DD";
    MaxPlanName["MonthlyCardFee"] = "\u05D3\u05DE\u05D9 \u05DB\u05E8\u05D8\u05D9\u05E1";
    MaxPlanName["CurrencyPocket"] = "\u05D7\u05D9\u05D5\u05D1 \u05D0\u05E8\u05E0\u05E7 \u05DE\u05D8\u05D7";
})(MaxPlanName || (MaxPlanName = {}));
var INVALID_DETAILS_SELECTOR = '#popupWrongDetails';
var LOGIN_ERROR_SELECTOR = '#popupCardHoldersLoginError';
var categories = new Map();
function redirectOrDialog(page) {
    return Promise.race([
        (0, navigation_1.waitForRedirect)(page, 20000, false, [BASE_WELCOME_URL, "".concat(BASE_WELCOME_URL, "/")]),
        (0, elements_interactions_1.waitUntilElementFound)(page, INVALID_DETAILS_SELECTOR, true),
        (0, elements_interactions_1.waitUntilElementFound)(page, LOGIN_ERROR_SELECTOR, true),
    ]);
}
function getTransactionsUrl(monthMoment) {
    var month = monthMoment.month() + 1;
    var year = monthMoment.year();
    var date = "".concat(year, "-").concat(month, "-01");
    /**
       * url explanation:
       * userIndex: -1 for all account owners
       * cardIndex: -1 for all cards under the account
       * all other query params are static, beside the date which changes for request per month
       */
    return (0, build_url_1["default"])(BASE_API_ACTIONS_URL, {
        path: "/api/registered/transactionDetails/getTransactionsAndGraphs?filterData={\"userIndex\":-1,\"cardIndex\":-1,\"monthView\":true,\"date\":\"".concat(date, "\",\"dates\":{\"startDate\":\"0\",\"endDate\":\"0\"},\"bankAccount\":{\"bankAccountIndex\":-1,\"cards\":null}}&firstCallCardIndex=-1")
    });
}
function loadCategories(page) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    debug('Loading categories');
                    return [4 /*yield*/, (0, fetch_1.fetchGetWithinPage)(page, "".concat(BASE_API_ACTIONS_URL, "/api/contents/getCategories"))];
                case 1:
                    res = _b.sent();
                    if (res && Array.isArray(res.result)) {
                        debug("".concat(res.result.length, " categories loaded"));
                        (_a = res.result) === null || _a === void 0 ? void 0 : _a.forEach(function (_a) {
                            var id = _a.id, name = _a.name;
                            return categories.set(id, name);
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getTransactionType(planName, planTypeId) {
    var cleanedUpTxnTypeStr = planName.replace('\t', ' ').trim();
    switch (cleanedUpTxnTypeStr) {
        case MaxPlanName.ImmediateCharge:
        case MaxPlanName.Normal:
        case MaxPlanName.MonthlyCharge:
        case MaxPlanName.OneMonthPostponed:
        case MaxPlanName.MonthlyPostponed:
        case MaxPlanName.FuturePurchaseFinancing:
        case MaxPlanName.MonthlyPayment:
        case MaxPlanName.MonthlyPostponedInstallments:
        case MaxPlanName.ThirtyDaysPlus:
        case MaxPlanName.TwoMonthsPostponed:
        case MaxPlanName.TwoMonthsPostponed2:
        case MaxPlanName.AccumulatingBasket:
        case MaxPlanName.InternetShopping:
        case MaxPlanName.MonthlyChargePlusInterest:
        case MaxPlanName.PostponedTransactionInstallments:
        case MaxPlanName.ReplacementCard:
        case MaxPlanName.EarlyRepayment:
        case MaxPlanName.MonthlyCardFee:
        case MaxPlanName.CurrencyPocket:
            return transactions_2.TransactionTypes.Normal;
        case MaxPlanName.Installments:
        case MaxPlanName.Credit:
        case MaxPlanName.CreditOutsideTheLimit:
            return transactions_2.TransactionTypes.Installments;
        default:
            switch (planTypeId) {
                case 2:
                case 3:
                    return transactions_2.TransactionTypes.Installments;
                case 5:
                    return transactions_2.TransactionTypes.Normal;
                default:
                    throw new Error("Unknown transaction type ".concat(cleanedUpTxnTypeStr));
            }
    }
}
function getInstallmentsInfo(comments) {
    if (!comments) {
        return undefined;
    }
    var matches = comments.match(/\d+/g);
    if (!matches || matches.length < 2) {
        return undefined;
    }
    return {
        number: parseInt(matches[0], 10),
        total: parseInt(matches[1], 10)
    };
}
function getChargedCurrency(currencyId) {
    switch (currencyId) {
        case 376:
            return constants_1.SHEKEL_CURRENCY;
        case 840:
            return constants_1.DOLLAR_CURRENCY;
        case 978:
            return constants_1.EURO_CURRENCY;
        default:
            return undefined;
    }
}
function getMemo(_a) {
    var comments = _a.comments, fundsTransferReceiverOrTransfer = _a.fundsTransferReceiverOrTransfer, fundsTransferComment = _a.fundsTransferComment;
    if (fundsTransferReceiverOrTransfer) {
        var memo = comments ? "".concat(comments, " ").concat(fundsTransferReceiverOrTransfer) : fundsTransferReceiverOrTransfer;
        return fundsTransferComment ? "".concat(memo, ": ").concat(fundsTransferComment) : memo;
    }
    return comments;
}
exports.getMemo = getMemo;
function mapTransaction(rawTransaction) {
    var _a, _b;
    var isPending = rawTransaction.paymentDate === null;
    var processedDate = (0, moment_1["default"])(isPending ?
        rawTransaction.purchaseDate :
        rawTransaction.paymentDate).toISOString();
    var status = isPending ? transactions_2.TransactionStatuses.Pending : transactions_2.TransactionStatuses.Completed;
    var installments = getInstallmentsInfo(rawTransaction.comments);
    var identifier = installments ?
        "".concat((_a = rawTransaction.dealData) === null || _a === void 0 ? void 0 : _a.arn, "_").concat(installments.number) :
        (_b = rawTransaction.dealData) === null || _b === void 0 ? void 0 : _b.arn;
    return {
        type: getTransactionType(rawTransaction.planName, rawTransaction.planTypeId),
        date: (0, moment_1["default"])(rawTransaction.purchaseDate).toISOString(),
        processedDate: processedDate,
        originalAmount: -rawTransaction.originalAmount,
        originalCurrency: rawTransaction.originalCurrency,
        chargedAmount: -rawTransaction.actualPaymentAmount,
        chargedCurrency: getChargedCurrency(rawTransaction.paymentCurrency),
        description: rawTransaction.merchantName.trim(),
        memo: getMemo(rawTransaction),
        category: categories.get(rawTransaction === null || rawTransaction === void 0 ? void 0 : rawTransaction.categoryId),
        installments: installments,
        identifier: identifier,
        status: status
    };
}
function fetchTransactionsForMonth(page, monthMoment) {
    return __awaiter(this, void 0, void 0, function () {
        var url, data, transactionsByAccount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = getTransactionsUrl(monthMoment);
                    return [4 /*yield*/, (0, fetch_1.fetchGetWithinPage)(page, url)];
                case 1:
                    data = _a.sent();
                    transactionsByAccount = {};
                    if (!data || !data.result)
                        return [2 /*return*/, transactionsByAccount];
                    data.result.transactions
                        // Filter out non-transactions without a plan type, e.g. summary rows
                        .filter(function (transaction) { return !!transaction.planName; })
                        .forEach(function (transaction) {
                        if (!transactionsByAccount[transaction.shortCardNumber]) {
                            transactionsByAccount[transaction.shortCardNumber] = [];
                        }
                        var mappedTransaction = mapTransaction(transaction);
                        transactionsByAccount[transaction.shortCardNumber].push(mappedTransaction);
                    });
                    return [2 /*return*/, transactionsByAccount];
            }
        });
    });
}
function addResult(allResults, result) {
    var clonedResults = __assign({}, allResults);
    Object.keys(result).forEach(function (accountNumber) {
        var _a;
        if (!clonedResults[accountNumber]) {
            clonedResults[accountNumber] = [];
        }
        (_a = clonedResults[accountNumber]).push.apply(_a, result[accountNumber]);
    });
    return clonedResults;
}
function prepareTransactions(txns, startMoment, combineInstallments, enableTransactionsFilterByDate) {
    var clonedTxns = Array.from(txns);
    if (!combineInstallments) {
        clonedTxns = (0, transactions_1.fixInstallments)(clonedTxns);
    }
    clonedTxns = (0, transactions_1.sortTransactionsByDate)(clonedTxns);
    clonedTxns = enableTransactionsFilterByDate ?
        (0, transactions_1.filterOldTransactions)(clonedTxns, startMoment, combineInstallments || false) :
        clonedTxns;
    return clonedTxns;
}
function fetchTransactions(page, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var futureMonthsToScrape, defaultStartMoment, startMomentLimit, startDate, startMoment, allMonths, allResults, i, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    futureMonthsToScrape = (_a = options.futureMonthsToScrape) !== null && _a !== void 0 ? _a : 1;
                    defaultStartMoment = (0, moment_1["default"])().subtract(1, 'years');
                    startMomentLimit = (0, moment_1["default"])().subtract(4, 'years');
                    startDate = options.startDate || defaultStartMoment.toDate();
                    startMoment = moment_1["default"].max(startMomentLimit, (0, moment_1["default"])(startDate));
                    allMonths = (0, dates_1["default"])(startMoment, futureMonthsToScrape);
                    return [4 /*yield*/, loadCategories(page)];
                case 1:
                    _b.sent();
                    allResults = {};
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < allMonths.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetchTransactionsForMonth(page, allMonths[i])];
                case 3:
                    result = _b.sent();
                    allResults = addResult(allResults, result);
                    _b.label = 4;
                case 4:
                    i += 1;
                    return [3 /*break*/, 2];
                case 5:
                    Object.keys(allResults).forEach(function (accountNumber) {
                        var _a, _b;
                        var txns = allResults[accountNumber];
                        txns = prepareTransactions(txns, startMoment, options.combineInstallments || false, ((_b = (_a = options.outputData) === null || _a === void 0 ? void 0 : _a.enableTransactionsFilterByDate) !== null && _b !== void 0 ? _b : true));
                        allResults[accountNumber] = txns;
                    });
                    return [2 /*return*/, allResults];
            }
        });
    });
}
function getPossibleLoginResults(page) {
    var _this = this;
    var urls = {};
    urls[base_scraper_with_browser_1.LoginResults.Success] = [SUCCESS_URL];
    urls[base_scraper_with_browser_1.LoginResults.ChangePassword] = [PASSWORD_EXPIRED_URL];
    urls[base_scraper_with_browser_1.LoginResults.InvalidPassword] = [function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, elements_interactions_1.elementPresentOnPage)(page, INVALID_DETAILS_SELECTOR)];
            });
        }); }];
    urls[base_scraper_with_browser_1.LoginResults.UnknownError] = [function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, elements_interactions_1.elementPresentOnPage)(page, LOGIN_ERROR_SELECTOR)];
            });
        }); }];
    return urls;
}
function createLoginFields(credentials) {
    return [
        { selector: '#user-name', value: credentials.username },
        { selector: '#password', value: credentials.password },
    ];
}
var MaxScraper = /** @class */ (function (_super) {
    __extends(MaxScraper, _super);
    function MaxScraper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaxScraper.prototype.getLoginOptions = function (credentials) {
        var _this = this;
        return {
            loginUrl: LOGIN_URL,
            fields: createLoginFields(credentials),
            submitButtonSelector: 'app-user-login-form .general-button.send-me-code',
            preAction: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, elements_interactions_1.elementPresentOnPage)(this.page, '#closePopup')];
                        case 1:
                            if (!_a.sent()) return [3 /*break*/, 3];
                            return [4 /*yield*/, (0, elements_interactions_1.clickButton)(this.page, '#closePopup')];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [4 /*yield*/, (0, elements_interactions_1.clickButton)(this.page, '.personal-area > a.go-to-personal-area')];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, (0, elements_interactions_1.elementPresentOnPage)(this.page, '.login-link#private')];
                        case 5:
                            if (!_a.sent()) return [3 /*break*/, 7];
                            return [4 /*yield*/, (0, elements_interactions_1.clickButton)(this.page, '.login-link#private')];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7: return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(this.page, '#login-password-link', true)];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, (0, elements_interactions_1.clickButton)(this.page, '#login-password-link')];
                        case 9:
                            _a.sent();
                            return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(this.page, '#login-password.tab-pane.active app-user-login-form', true)];
                        case 10:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            checkReadiness: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(this.page, '.personal-area > a.go-to-personal-area', true)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            postAction: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, redirectOrDialog(this.page)];
            }); }); },
            possibleResults: getPossibleLoginResults(this.page),
            waitUntil: 'domcontentloaded'
        };
    };
    MaxScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchTransactions(this.page, this.options)];
                    case 1:
                        results = _a.sent();
                        accounts = Object.keys(results).map(function (accountNumber) {
                            return {
                                accountNumber: accountNumber,
                                txns: results[accountNumber]
                            };
                        });
                        return [2 /*return*/, {
                                success: true,
                                accounts: accounts
                            }];
                }
            });
        });
    };
    return MaxScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = MaxScraper;
