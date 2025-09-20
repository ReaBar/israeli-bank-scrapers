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
var build_url_1 = require("build-url");
var lodash_1 = require("lodash");
var moment_1 = require("moment");
var constants_1 = require("../constants");
var definitions_1 = require("../definitions");
var dates_1 = require("../helpers/dates");
var debug_1 = require("../helpers/debug");
var fetch_1 = require("../helpers/fetch");
var transactions_1 = require("../helpers/transactions");
var waiting_1 = require("../helpers/waiting");
var transactions_2 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var errors_1 = require("./errors");
var browser_1 = require("../helpers/browser");
var COUNTRY_CODE = '212';
var ID_TYPE = '1';
var INSTALLMENTS_KEYWORD = 'תשלום';
var DATE_FORMAT = 'DD/MM/YYYY';
var debug = (0, debug_1.getDebug)('base-isracard-amex');
function getAccountsUrl(servicesUrl, monthMoment) {
    var billingDate = monthMoment.format('YYYY-MM-DD');
    return (0, build_url_1["default"])(servicesUrl, {
        queryParams: {
            reqName: 'DashboardMonth',
            actionCode: '0',
            billingDate: billingDate,
            format: 'Json'
        }
    });
}
function fetchAccounts(page, servicesUrl, monthMoment) {
    return __awaiter(this, void 0, void 0, function () {
        var dataUrl, dataResult, cardsCharges;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dataUrl = getAccountsUrl(servicesUrl, monthMoment);
                    return [4 /*yield*/, (0, fetch_1.fetchGetWithinPage)(page, dataUrl)];
                case 1:
                    dataResult = _a.sent();
                    if (dataResult && lodash_1["default"].get(dataResult, 'Header.Status') === '1' && dataResult.DashboardMonthBean) {
                        cardsCharges = dataResult.DashboardMonthBean.cardsCharges;
                        if (cardsCharges) {
                            return [2 /*return*/, cardsCharges.map(function (cardCharge) {
                                    return {
                                        index: parseInt(cardCharge.cardIndex, 10),
                                        accountNumber: cardCharge.cardNumber,
                                        processedDate: (0, moment_1["default"])(cardCharge.billingDate, DATE_FORMAT).toISOString()
                                    };
                                })];
                        }
                    }
                    return [2 /*return*/, []];
            }
        });
    });
}
function getTransactionsUrl(servicesUrl, monthMoment) {
    var month = monthMoment.month() + 1;
    var year = monthMoment.year();
    var monthStr = month < 10 ? "0".concat(month) : month.toString();
    return (0, build_url_1["default"])(servicesUrl, {
        queryParams: {
            reqName: 'CardsTransactionsList',
            month: monthStr,
            year: "".concat(year),
            requiredDate: 'N'
        }
    });
}
function convertCurrency(currencyStr) {
    if (currencyStr === constants_1.SHEKEL_CURRENCY_KEYWORD || currencyStr === constants_1.ALT_SHEKEL_CURRENCY) {
        return constants_1.SHEKEL_CURRENCY;
    }
    return currencyStr;
}
function getInstallmentsInfo(txn) {
    if (!txn.moreInfo || !txn.moreInfo.includes(INSTALLMENTS_KEYWORD)) {
        return undefined;
    }
    var matches = txn.moreInfo.match(/\d+/g);
    if (!matches || matches.length < 2) {
        return undefined;
    }
    return {
        number: parseInt(matches[0], 10),
        total: parseInt(matches[1], 10)
    };
}
function getTransactionType(txn) {
    return getInstallmentsInfo(txn) ? transactions_2.TransactionTypes.Installments : transactions_2.TransactionTypes.Normal;
}
function convertTransactions(txns, processedDate) {
    var filteredTxns = txns.filter(function (txn) { return txn.dealSumType !== '1' &&
        txn.voucherNumberRatz !== '000000000' &&
        txn.voucherNumberRatzOutbound !== '000000000'; });
    return filteredTxns.map(function (txn) {
        var _a;
        var isOutbound = txn.dealSumOutbound;
        var txnDateStr = isOutbound ? txn.fullPurchaseDateOutbound : txn.fullPurchaseDate;
        var txnMoment = (0, moment_1["default"])(txnDateStr, DATE_FORMAT);
        var currentProcessedDate = txn.fullPaymentDate ?
            (0, moment_1["default"])(txn.fullPaymentDate, DATE_FORMAT).toISOString() :
            processedDate;
        var result = {
            type: getTransactionType(txn),
            identifier: parseInt(isOutbound ? txn.voucherNumberRatzOutbound : txn.voucherNumberRatz, 10),
            date: txnMoment.toISOString(),
            processedDate: currentProcessedDate,
            originalAmount: isOutbound ? -txn.dealSumOutbound : -txn.dealSum,
            originalCurrency: convertCurrency((_a = txn.currentPaymentCurrency) !== null && _a !== void 0 ? _a : txn.currencyId),
            chargedAmount: isOutbound ? -txn.paymentSumOutbound : -txn.paymentSum,
            chargedCurrency: convertCurrency(txn.currencyId),
            description: isOutbound ? txn.fullSupplierNameOutbound : txn.fullSupplierNameHeb,
            memo: txn.moreInfo || '',
            installments: getInstallmentsInfo(txn) || undefined,
            status: transactions_2.TransactionStatuses.Completed
        };
        return result;
    });
}
function fetchTransactions(page, options, companyServiceOptions, startMoment, monthMoment) {
    return __awaiter(this, void 0, void 0, function () {
        var accounts, dataUrl, dataResult, accountTxns_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchAccounts(page, companyServiceOptions.servicesUrl, monthMoment)];
                case 1:
                    accounts = _a.sent();
                    dataUrl = getTransactionsUrl(companyServiceOptions.servicesUrl, monthMoment);
                    return [4 /*yield*/, (0, fetch_1.fetchGetWithinPage)(page, dataUrl)];
                case 2:
                    dataResult = _a.sent();
                    if (dataResult && lodash_1["default"].get(dataResult, 'Header.Status') === '1' && dataResult.CardsTransactionsListBean) {
                        accountTxns_1 = {};
                        accounts.forEach(function (account) {
                            var _a, _b;
                            var txnGroups = lodash_1["default"].get(dataResult, "CardsTransactionsListBean.Index".concat(account.index, ".CurrentCardTransactions"));
                            if (txnGroups) {
                                var allTxns_1 = [];
                                txnGroups.forEach(function (txnGroup) {
                                    if (txnGroup.txnIsrael) {
                                        var txns = convertTransactions(txnGroup.txnIsrael, account.processedDate);
                                        allTxns_1.push.apply(allTxns_1, txns);
                                    }
                                    if (txnGroup.txnAbroad) {
                                        var txns = convertTransactions(txnGroup.txnAbroad, account.processedDate);
                                        allTxns_1.push.apply(allTxns_1, txns);
                                    }
                                });
                                if (!options.combineInstallments) {
                                    allTxns_1 = (0, transactions_1.fixInstallments)(allTxns_1);
                                }
                                if ((_b = (_a = options.outputData) === null || _a === void 0 ? void 0 : _a.enableTransactionsFilterByDate) !== null && _b !== void 0 ? _b : true) {
                                    allTxns_1 = (0, transactions_1.filterOldTransactions)(allTxns_1, startMoment, options.combineInstallments || false);
                                }
                                accountTxns_1[account.accountNumber] = {
                                    accountNumber: account.accountNumber,
                                    index: account.index,
                                    txns: allTxns_1
                                };
                            }
                        });
                        return [2 /*return*/, accountTxns_1];
                    }
                    return [2 /*return*/, {}];
            }
        });
    });
}
function getTransactionExtraDetails(servicesUrl, month, accountIndex, transaction) {
    var moedChiuv = month.format('MMYYYY');
    return (0, build_url_1["default"])(servicesUrl, {
        queryParams: {
            reqName: 'PirteyIska_204',
            CardIndex: accountIndex.toString(),
            shovarRatz: transaction.identifier.toString(),
            moedChiuv: moedChiuv
        }
    });
}
function getExtraScrapTransaction(page, options, month, accountIndex, transaction) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var dataUrl, data, rawCategory;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dataUrl = getTransactionExtraDetails(options.servicesUrl, month, accountIndex, transaction);
                    return [4 /*yield*/, (0, fetch_1.fetchGetWithinPage)(page, dataUrl)];
                case 1:
                    data = _b.sent();
                    if (!data) {
                        return [2 /*return*/, transaction];
                    }
                    rawCategory = (_a = lodash_1["default"].get(data, 'PirteyIska_204Bean.sector')) !== null && _a !== void 0 ? _a : '';
                    return [2 /*return*/, __assign(__assign({}, transaction), { category: rawCategory.trim() })];
            }
        });
    });
}
function getExtraScrapTransactions(accountWithIndex, page, options, month) {
    var promises = accountWithIndex.txns
        .map(function (t) { return getExtraScrapTransaction(page, options, month, accountWithIndex.index, t); });
    return Promise.all(promises);
}
function getExtraScrapAccount(page, options, accountMap, month) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, accounts;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = Object.keys(accountMap)
                        .map(function (a) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _a = [__assign({}, accountMap[a])];
                                    _b = {};
                                    return [4 /*yield*/, getExtraScrapTransactions(accountMap[a], page, options, month)];
                                case 1: return [2 /*return*/, (__assign.apply(void 0, _a.concat([(_b.txns = _c.sent(), _b)])))];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    accounts = _a.sent();
                    return [2 /*return*/, accounts.reduce(function (m, x) {
                            var _a;
                            return (__assign(__assign({}, m), (_a = {}, _a[x.accountNumber] = x, _a)));
                        }, {})];
            }
        });
    });
}
function getExtraScrap(accountsWithIndex, page, options, allMonths) {
    var actions = accountsWithIndex.map(function (a, i) { return function () { return getExtraScrapAccount(page, options, a, allMonths[i]); }; });
    return (0, waiting_1.runSerial)(actions);
}
function fetchAllTransactions(page, options, companyServiceOptions, startMoment) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var futureMonthsToScrape, allMonths, results, finalResult, _b, combinedTxns, accounts;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    futureMonthsToScrape = (_a = options.futureMonthsToScrape) !== null && _a !== void 0 ? _a : 1;
                    allMonths = (0, dates_1["default"])(startMoment, futureMonthsToScrape);
                    return [4 /*yield*/, Promise.all(allMonths.map(function (monthMoment) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, fetchTransactions(page, options, companyServiceOptions, startMoment, monthMoment)];
                            });
                        }); }))];
                case 1:
                    results = _c.sent();
                    if (!options.additionalTransactionInformation) return [3 /*break*/, 3];
                    return [4 /*yield*/, getExtraScrap(results, page, companyServiceOptions, allMonths)];
                case 2:
                    _b = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _b = results;
                    _c.label = 4;
                case 4:
                    finalResult = _b;
                    combinedTxns = {};
                    finalResult.forEach(function (result) {
                        Object.keys(result).forEach(function (accountNumber) {
                            var _a;
                            var txnsForAccount = combinedTxns[accountNumber];
                            if (!txnsForAccount) {
                                txnsForAccount = [];
                                combinedTxns[accountNumber] = txnsForAccount;
                            }
                            var toBeAddedTxns = result[accountNumber].txns;
                            (_a = combinedTxns[accountNumber]).push.apply(_a, toBeAddedTxns);
                        });
                    });
                    accounts = Object.keys(combinedTxns).map(function (accountNumber) {
                        return {
                            accountNumber: accountNumber,
                            txns: combinedTxns[accountNumber]
                        };
                    });
                    return [2 /*return*/, {
                            success: true,
                            accounts: accounts
                        }];
            }
        });
    });
}
var IsracardAmexBaseScraper = /** @class */ (function (_super) {
    __extends(IsracardAmexBaseScraper, _super);
    function IsracardAmexBaseScraper(options, baseUrl, companyCode) {
        var _this = _super.call(this, options) || this;
        _this.baseUrl = baseUrl;
        _this.companyCode = companyCode;
        _this.servicesUrl = "".concat(baseUrl, "/services/ProxyRequestHandler.ashx");
        return _this;
    }
    IsracardAmexBaseScraper.prototype.login = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var validateUrl, validateRequest, validateResult, validateReturnCode, userName, loginUrl, request, loginResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.setRequestInterception(true)];
                    case 1:
                        _a.sent();
                        this.page.on('request', function (request) {
                            if (request.url().includes('detector-dom.min.js')) {
                                debug('force abort for request do download detector-dom.min.js resource');
                                void request.abort();
                            }
                            else {
                                void request["continue"]();
                            }
                        });
                        return [4 /*yield*/, (0, browser_1.maskHeadlessUserAgent)(this.page)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.navigateTo("".concat(this.baseUrl, "/personalarea/Login"))];
                    case 3:
                        _a.sent();
                        this.emitProgress(definitions_1.ScraperProgressTypes.LoggingIn);
                        validateUrl = "".concat(this.servicesUrl, "?reqName=ValidateIdData");
                        validateRequest = {
                            id: credentials.id,
                            cardSuffix: credentials.card6Digits,
                            countryCode: COUNTRY_CODE,
                            idType: ID_TYPE,
                            checkLevel: '1',
                            companyCode: this.companyCode
                        };
                        return [4 /*yield*/, (0, fetch_1.fetchPostWithinPage)(this.page, validateUrl, validateRequest)];
                    case 4:
                        validateResult = _a.sent();
                        if (!validateResult || !validateResult.Header || validateResult.Header.Status !== '1' || !validateResult.ValidateIdDataBean) {
                            throw new Error('unknown error during login');
                        }
                        validateReturnCode = validateResult.ValidateIdDataBean.returnCode;
                        debug("user validate with return code '".concat(validateReturnCode, "'"));
                        if (!(validateReturnCode === '1')) return [3 /*break*/, 6];
                        userName = validateResult.ValidateIdDataBean.userName;
                        loginUrl = "".concat(this.servicesUrl, "?reqName=performLogonI");
                        request = {
                            KodMishtamesh: userName,
                            MisparZihuy: credentials.id,
                            Sisma: credentials.password,
                            cardSuffix: credentials.card6Digits,
                            countryCode: COUNTRY_CODE,
                            idType: ID_TYPE
                        };
                        return [4 /*yield*/, (0, fetch_1.fetchPostWithinPage)(this.page, loginUrl, request)];
                    case 5:
                        loginResult = _a.sent();
                        debug("user login with status '".concat(loginResult === null || loginResult === void 0 ? void 0 : loginResult.status, "'"));
                        if (loginResult && loginResult.status === '1') {
                            this.emitProgress(definitions_1.ScraperProgressTypes.LoginSuccess);
                            return [2 /*return*/, { success: true }];
                        }
                        if (loginResult && loginResult.status === '3') {
                            this.emitProgress(definitions_1.ScraperProgressTypes.ChangePassword);
                            return [2 /*return*/, {
                                    success: false,
                                    errorType: errors_1.ScraperErrorTypes.ChangePassword
                                }];
                        }
                        this.emitProgress(definitions_1.ScraperProgressTypes.LoginFailed);
                        return [2 /*return*/, {
                                success: false,
                                errorType: errors_1.ScraperErrorTypes.InvalidPassword
                            }];
                    case 6:
                        if (validateReturnCode === '4') {
                            this.emitProgress(definitions_1.ScraperProgressTypes.ChangePassword);
                            return [2 /*return*/, {
                                    success: false,
                                    errorType: errors_1.ScraperErrorTypes.ChangePassword
                                }];
                        }
                        this.emitProgress(definitions_1.ScraperProgressTypes.LoginFailed);
                        return [2 /*return*/, {
                                success: false,
                                errorType: errors_1.ScraperErrorTypes.InvalidPassword
                            }];
                }
            });
        });
    };
    IsracardAmexBaseScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultStartMoment, startDate, startMoment;
            return __generator(this, function (_a) {
                defaultStartMoment = (0, moment_1["default"])().subtract(1, 'years');
                startDate = this.options.startDate || defaultStartMoment.toDate();
                startMoment = moment_1["default"].max(defaultStartMoment, (0, moment_1["default"])(startDate));
                return [2 /*return*/, fetchAllTransactions(this.page, this.options, {
                        servicesUrl: this.servicesUrl,
                        companyCode: this.companyCode
                    }, startMoment)];
            });
        });
    };
    return IsracardAmexBaseScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = IsracardAmexBaseScraper;
