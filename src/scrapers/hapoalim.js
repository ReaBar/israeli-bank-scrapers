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
var moment_1 = require("moment");
var uuid_1 = require("uuid");
var debug_1 = require("../helpers/debug");
var fetch_1 = require("../helpers/fetch");
var navigation_1 = require("../helpers/navigation");
var waiting_1 = require("../helpers/waiting");
var transactions_1 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var debug = (0, debug_1.getDebug)('hapoalim');
var DATE_FORMAT = 'YYYYMMDD';
function convertTransactions(txns) {
    return txns.map(function (txn) {
        var isOutbound = txn.eventActivityTypeCode === 2;
        var memo = '';
        if (txn.beneficiaryDetailsData) {
            var _a = txn.beneficiaryDetailsData, partyHeadline = _a.partyHeadline, partyName = _a.partyName, messageHeadline = _a.messageHeadline, messageDetail = _a.messageDetail;
            var memoLines = [];
            if (partyHeadline) {
                memoLines.push(partyHeadline);
            }
            if (partyName) {
                memoLines.push("".concat(partyName, "."));
            }
            if (messageHeadline) {
                memoLines.push(messageHeadline);
            }
            if (messageDetail) {
                memoLines.push("".concat(messageDetail, "."));
            }
            if (memoLines.length) {
                memo = memoLines.join(' ');
            }
        }
        var result = {
            type: transactions_1.TransactionTypes.Normal,
            identifier: txn.referenceNumber,
            date: (0, moment_1["default"])(txn.eventDate, DATE_FORMAT).toISOString(),
            processedDate: (0, moment_1["default"])(txn.valueDate, DATE_FORMAT).toISOString(),
            originalAmount: isOutbound ? -txn.eventAmount : txn.eventAmount,
            originalCurrency: 'ILS',
            chargedAmount: isOutbound ? -txn.eventAmount : txn.eventAmount,
            description: txn.activityDescription || '',
            status: txn.serialNumber === 0 ? transactions_1.TransactionStatuses.Pending : transactions_1.TransactionStatuses.Completed,
            memo: memo
        };
        return result;
    });
}
function getRestContext(page) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, waiting_1.waitUntil)(function () {
                        return page.evaluate(function () { return !!window.bnhpApp; });
                    }, 'waiting for app data load')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            return window.bnhpApp.restContext;
                        })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.slice(1)];
            }
        });
    });
}
function fetchPoalimXSRFWithinPage(page, url, pageUuid) {
    return __awaiter(this, void 0, void 0, function () {
        var cookies, XSRFCookie, headers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.cookies()];
                case 1:
                    cookies = _a.sent();
                    XSRFCookie = cookies.find(function (cookie) { return cookie.name === 'XSRF-TOKEN'; });
                    headers = {};
                    if (XSRFCookie != null) {
                        headers['X-XSRF-TOKEN'] = XSRFCookie.value;
                    }
                    headers.pageUuid = pageUuid;
                    headers.uuid = (0, uuid_1.v4)();
                    headers['Content-Type'] = 'application/json;charset=UTF-8';
                    return [2 /*return*/, (0, fetch_1.fetchPostWithinPage)(page, url, [], headers)];
            }
        });
    });
}
function getExtraScrap(txnsResult, baseUrl, page, accountNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, res;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = txnsResult.transactions.map(function (transaction) { return __awaiter(_this, void 0, void 0, function () {
                        var pfmDetails, serialNumber, url, extraTransactionDetails, transactionNumber;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    pfmDetails = transaction.pfmDetails, serialNumber = transaction.serialNumber;
                                    if (!(serialNumber !== 0)) return [3 /*break*/, 2];
                                    url = "".concat(baseUrl).concat(pfmDetails, "&accountId=").concat(accountNumber, "&lang=he");
                                    return [4 /*yield*/, (0, fetch_1.fetchGetWithinPage)(page, url)];
                                case 1:
                                    extraTransactionDetails = (_a.sent()) || [];
                                    if (extraTransactionDetails && extraTransactionDetails.length) {
                                        transactionNumber = extraTransactionDetails[0].transactionNumber;
                                        if (transactionNumber) {
                                            return [2 /*return*/, __assign(__assign({}, transaction), { referenceNumber: transactionNumber })];
                                        }
                                    }
                                    _a.label = 2;
                                case 2: return [2 /*return*/, transaction];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, { transactions: res }];
            }
        });
    });
}
function getAccountTransactions(baseUrl, apiSiteUrl, page, accountNumber, startDate, endDate, additionalTransactionInformation) {
    var _a;
    if (additionalTransactionInformation === void 0) { additionalTransactionInformation = false; }
    return __awaiter(this, void 0, void 0, function () {
        var txnsUrl, txnsResult, finalResult, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    txnsUrl = "".concat(apiSiteUrl, "/current-account/transactions?accountId=").concat(accountNumber, "&numItemsPerPage=1000&retrievalEndDate=").concat(endDate, "&retrievalStartDate=").concat(startDate, "&sortCode=1");
                    return [4 /*yield*/, fetchPoalimXSRFWithinPage(page, txnsUrl, '/current-account/transactions')];
                case 1:
                    txnsResult = _c.sent();
                    if (!(additionalTransactionInformation && (txnsResult === null || txnsResult === void 0 ? void 0 : txnsResult.transactions.length))) return [3 /*break*/, 3];
                    return [4 /*yield*/, getExtraScrap(txnsResult, baseUrl, page, accountNumber)];
                case 2:
                    _b = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _b = txnsResult;
                    _c.label = 4;
                case 4:
                    finalResult = _b;
                    return [2 /*return*/, convertTransactions((_a = finalResult === null || finalResult === void 0 ? void 0 : finalResult.transactions) !== null && _a !== void 0 ? _a : [])];
            }
        });
    });
}
function getAccountBalance(apiSiteUrl, page, accountNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var balanceAndCreditLimitUrl, balanceAndCreditLimit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    balanceAndCreditLimitUrl = "".concat(apiSiteUrl, "/current-account/composite/balanceAndCreditLimit?accountId=").concat(accountNumber, "&view=details&lang=he");
                    return [4 /*yield*/, (0, fetch_1.fetchGetWithinPage)(page, balanceAndCreditLimitUrl)];
                case 1:
                    balanceAndCreditLimit = _a.sent();
                    return [2 /*return*/, balanceAndCreditLimit === null || balanceAndCreditLimit === void 0 ? void 0 : balanceAndCreditLimit.currentBalance];
            }
        });
    });
}
function fetchAccountData(page, baseUrl, options) {
    return __awaiter(this, void 0, void 0, function () {
        var restContext, apiSiteUrl, accountDataUrl, accountsInfo, defaultStartMoment, startDate, startMoment, additionalTransactionInformation, startDateStr, endDateStr, accounts, _i, accountsInfo_1, account, balance, accountNumber, isActiveAccount, txns, accountData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRestContext(page)];
                case 1:
                    restContext = _a.sent();
                    apiSiteUrl = "".concat(baseUrl, "/").concat(restContext);
                    accountDataUrl = "".concat(baseUrl, "/ServerServices/general/accounts");
                    debug('fetching accounts data');
                    return [4 /*yield*/, (0, fetch_1.fetchGetWithinPage)(page, accountDataUrl)];
                case 2:
                    accountsInfo = (_a.sent()) || [];
                    debug('got %d accounts, fetching txns and balance', accountsInfo.length);
                    defaultStartMoment = (0, moment_1["default"])().subtract(1, 'years').add(1, 'day');
                    startDate = options.startDate || defaultStartMoment.toDate();
                    startMoment = moment_1["default"].max(defaultStartMoment, (0, moment_1["default"])(startDate));
                    additionalTransactionInformation = options.additionalTransactionInformation;
                    startDateStr = startMoment.format(DATE_FORMAT);
                    endDateStr = (0, moment_1["default"])().format(DATE_FORMAT);
                    accounts = [];
                    _i = 0, accountsInfo_1 = accountsInfo;
                    _a.label = 3;
                case 3:
                    if (!(_i < accountsInfo_1.length)) return [3 /*break*/, 9];
                    account = accountsInfo_1[_i];
                    balance = void 0;
                    accountNumber = "".concat(account.bankNumber, "-").concat(account.branchNumber, "-").concat(account.accountNumber);
                    isActiveAccount = account.accountClosingReasonCode === 0;
                    if (!isActiveAccount) return [3 /*break*/, 5];
                    return [4 /*yield*/, getAccountBalance(apiSiteUrl, page, accountNumber)];
                case 4:
                    balance = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    debug('Skipping balance for a closed account, balance will be undefined');
                    _a.label = 6;
                case 6: return [4 /*yield*/, getAccountTransactions(baseUrl, apiSiteUrl, page, accountNumber, startDateStr, endDateStr, additionalTransactionInformation)];
                case 7:
                    txns = _a.sent();
                    accounts.push({
                        accountNumber: accountNumber,
                        balance: balance,
                        txns: txns
                    });
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 3];
                case 9:
                    accountData = {
                        success: true,
                        accounts: accounts
                    };
                    debug('fetching ended');
                    return [2 /*return*/, accountData];
            }
        });
    });
}
function getPossibleLoginResults(baseUrl) {
    var urls = {};
    urls[base_scraper_with_browser_1.LoginResults.Success] = [
        "".concat(baseUrl, "/portalserver/HomePage"),
        "".concat(baseUrl, "/ng-portals-bt/rb/he/homepage"),
        "".concat(baseUrl, "/ng-portals/rb/he/homepage")
    ];
    urls[base_scraper_with_browser_1.LoginResults.InvalidPassword] = ["".concat(baseUrl, "/AUTHENTICATE/LOGON?flow=AUTHENTICATE&state=LOGON&errorcode=1.6&callme=false")];
    urls[base_scraper_with_browser_1.LoginResults.ChangePassword] = [
        "".concat(baseUrl, "/MCP/START?flow=MCP&state=START&expiredDate=null"),
        /\/ABOUTTOEXPIRE\/START/i,
    ];
    return urls;
}
function createLoginFields(credentials) {
    return [
        { selector: '#userCode', value: credentials.userCode },
        { selector: '#password', value: credentials.password },
    ];
}
var HapoalimScraper = /** @class */ (function (_super) {
    __extends(HapoalimScraper, _super);
    function HapoalimScraper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HapoalimScraper.prototype, "baseUrl", {
        // eslint-disable-next-line class-methods-use-this
        get: function () {
            return 'https://login.bankhapoalim.co.il';
        },
        enumerable: false,
        configurable: true
    });
    HapoalimScraper.prototype.getLoginOptions = function (credentials) {
        var _this = this;
        return {
            loginUrl: "".concat(this.baseUrl, "/cgi-bin/poalwwwc?reqName=getLogonPage"),
            fields: createLoginFields(credentials),
            submitButtonSelector: '.login-btn',
            postAction: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (0, navigation_1.waitForRedirect)(this.page)];
            }); }); },
            possibleResults: getPossibleLoginResults(this.baseUrl)
        };
    };
    HapoalimScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, fetchAccountData(this.page, this.baseUrl, this.options)];
            });
        });
    };
    return HapoalimScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = HapoalimScraper;
