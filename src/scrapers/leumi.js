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
var moment_1 = require("moment");
var constants_1 = require("../constants");
var debug_1 = require("../helpers/debug");
var elements_interactions_1 = require("../helpers/elements-interactions");
var navigation_1 = require("../helpers/navigation");
var transactions_1 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var debug = (0, debug_1.getDebug)('leumi');
var BASE_URL = 'https://hb2.bankleumi.co.il';
var LOGIN_URL = 'https://www.leumi.co.il/';
var TRANSACTIONS_URL = "".concat(BASE_URL, "/eBanking/SO/SPA.aspx#/ts/BusinessAccountTrx?WidgetPar=1");
var FILTERED_TRANSACTIONS_URL = "".concat(BASE_URL, "/ChannelWCF/Broker.svc/ProcessRequest?moduleName=UC_SO_27_GetBusinessAccountTrx");
var DATE_FORMAT = 'DD.MM.YY';
var ACCOUNT_BLOCKED_MSG = 'המנוי חסום';
var INVALID_PASSWORD_MSG = 'אחד או יותר מפרטי ההזדהות שמסרת שגויים. ניתן לנסות שוב';
function getPossibleLoginResults() {
    var _a;
    var _this = this;
    var urls = (_a = {},
        _a[base_scraper_with_browser_1.LoginResults.Success] = [/ebanking\/SO\/SPA.aspx/i],
        _a[base_scraper_with_browser_1.LoginResults.InvalidPassword] = [
            function (options) { return __awaiter(_this, void 0, void 0, function () {
                var errorMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options || !options.page) {
                                throw new Error('missing page options argument');
                            }
                            return [4 /*yield*/, (0, elements_interactions_1.pageEvalAll)(options.page, 'svg#Capa_1', '', function (element) {
                                    var _a, _b, _c;
                                    return (_c = (_b = (_a = element[0]) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.children[1]) === null || _c === void 0 ? void 0 : _c.innerText;
                                })];
                        case 1:
                            errorMessage = _a.sent();
                            return [2 /*return*/, errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.startsWith(INVALID_PASSWORD_MSG)];
                    }
                });
            }); },
        ],
        _a[base_scraper_with_browser_1.LoginResults.AccountBlocked] = [
            function (options) { return __awaiter(_this, void 0, void 0, function () {
                var errorMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options || !options.page) {
                                throw new Error('missing page options argument');
                            }
                            return [4 /*yield*/, (0, elements_interactions_1.pageEvalAll)(options.page, '.errHeader', '', function (label) {
                                    var _a;
                                    return (_a = label[0]) === null || _a === void 0 ? void 0 : _a.innerText;
                                })];
                        case 1:
                            errorMessage = _a.sent();
                            return [2 /*return*/, errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.startsWith(ACCOUNT_BLOCKED_MSG)];
                    }
                });
            }); },
        ],
        _a[base_scraper_with_browser_1.LoginResults.ChangePassword] = ['https://hb2.bankleumi.co.il/authenticate'],
        _a);
    return urls;
}
function createLoginFields(credentials) {
    return [
        { selector: 'input[placeholder="שם משתמש"]', value: credentials.username },
        { selector: 'input[placeholder="סיסמה"]', value: credentials.password },
    ];
}
function extractTransactionsFromPage(transactions, status) {
    if (transactions === null || transactions.length === 0) {
        return [];
    }
    var result = transactions.map(function (rawTransaction) {
        var date = (0, moment_1["default"])(rawTransaction.DateUTC).milliseconds(0).toISOString();
        var newTransaction = {
            status: status,
            type: transactions_1.TransactionTypes.Normal,
            date: date,
            processedDate: date,
            description: rawTransaction.Description || '',
            identifier: rawTransaction.ReferenceNumberLong,
            memo: rawTransaction.AdditionalData || '',
            originalCurrency: constants_1.SHEKEL_CURRENCY,
            chargedAmount: rawTransaction.Amount,
            originalAmount: rawTransaction.Amount
        };
        return newTransaction;
    });
    return result;
}
function hangProcess(timeout) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, timeout);
    });
}
function clickByXPath(page, xpath) {
    return __awaiter(this, void 0, void 0, function () {
        var elm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForSelector(xpath, { timeout: 30000, visible: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.$$(xpath)];
                case 2:
                    elm = _a.sent();
                    return [4 /*yield*/, elm[0].click()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function removeSpecialCharacters(str) {
    return str.replace(/[^0-9/-]/g, '');
}
function fetchTransactionsForAccount(page, startDate, accountId) {
    return __awaiter(this, void 0, void 0, function () {
        var finalResponse, responseJson, accountNumber, response, pendingTransactions, transactions, balance, pendingTxns, completedTxns, txns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // DEVELOPER NOTICE the account number received from the server is being altered at
                // runtime for some accounts after 1-2 seconds so we need to hang the process for a short while.
                return [4 /*yield*/, hangProcess(4000)];
                case 1:
                    // DEVELOPER NOTICE the account number received from the server is being altered at
                    // runtime for some accounts after 1-2 seconds so we need to hang the process for a short while.
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, 'button[title="חיפוש מתקדם"]', true)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, 'button[title="חיפוש מתקדם"]')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, 'bll-radio-button', true)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, 'bll-radio-button:not([checked])')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, 'input[formcontrolname="txtInputFrom"]', true)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.fillInput)(page, 'input[formcontrolname="txtInputFrom"]', startDate.format(DATE_FORMAT))];
                case 7:
                    _a.sent();
                    // we must blur the from control otherwise the search will use the previous value
                    return [4 /*yield*/, page.focus("button[aria-label='סנן']")];
                case 8:
                    // we must blur the from control otherwise the search will use the previous value
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, "button[aria-label='סנן']")];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, page.waitForResponse(function (response) {
                            return response.url() === FILTERED_TRANSACTIONS_URL &&
                                response.request().method() === 'POST';
                        })];
                case 10:
                    finalResponse = _a.sent();
                    return [4 /*yield*/, finalResponse.json()];
                case 11:
                    responseJson = _a.sent();
                    accountNumber = accountId.replace('/', '_').replace(/[^\d-_]/g, '');
                    response = JSON.parse(responseJson.jsonResp);
                    pendingTransactions = response.TodayTransactionsItems;
                    transactions = response.HistoryTransactionsItems;
                    balance = response.BalanceDisplay ? parseFloat(response.BalanceDisplay) : undefined;
                    pendingTxns = extractTransactionsFromPage(pendingTransactions, transactions_1.TransactionStatuses.Pending);
                    completedTxns = extractTransactionsFromPage(transactions, transactions_1.TransactionStatuses.Completed);
                    txns = __spreadArray(__spreadArray([], pendingTxns, true), completedTxns, true);
                    return [2 /*return*/, {
                            accountNumber: accountNumber,
                            balance: balance,
                            txns: txns
                        }];
            }
        });
    });
}
function fetchTransactions(page, startDate) {
    return __awaiter(this, void 0, void 0, function () {
        var accounts, accountsIds, _i, accountsIds_1, accountId, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    accounts = [];
                    // DEVELOPER NOTICE the account number received from the server is being altered at
                    // runtime for some accounts after 1-2 seconds so we need to hang the process for a short while.
                    return [4 /*yield*/, hangProcess(4000)];
                case 1:
                    // DEVELOPER NOTICE the account number received from the server is being altered at
                    // runtime for some accounts after 1-2 seconds so we need to hang the process for a short while.
                    _c.sent();
                    return [4 /*yield*/, page.evaluate(function () { return Array.from(document.querySelectorAll('app-masked-number-combo span.display-number-li'), function (e) { return e.textContent; }); })];
                case 2:
                    accountsIds = _c.sent();
                    // due to a bug, the altered value might include undesired signs like & that should be removed
                    if (!accountsIds.length) {
                        throw new Error('Failed to extract or parse the account number');
                    }
                    _i = 0, accountsIds_1 = accountsIds;
                    _c.label = 3;
                case 3:
                    if (!(_i < accountsIds_1.length)) return [3 /*break*/, 9];
                    accountId = accountsIds_1[_i];
                    if (!(accountsIds.length > 1)) return [3 /*break*/, 6];
                    // get list of accounts and check accountId
                    return [4 /*yield*/, clickByXPath(page, 'xpath///*[contains(@class, "number") and contains(@class, "combo-inner")]')];
                case 4:
                    // get list of accounts and check accountId
                    _c.sent();
                    return [4 /*yield*/, clickByXPath(page, "xpath///span[contains(text(), '".concat(accountId, "')]"))];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    _b = (_a = accounts).push;
                    return [4 /*yield*/, fetchTransactionsForAccount(page, startDate, removeSpecialCharacters(accountId))];
                case 7:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 3];
                case 9: return [2 /*return*/, accounts];
            }
        });
    });
}
function navigateToLogin(page) {
    return __awaiter(this, void 0, void 0, function () {
        var loginButtonSelector, loginUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loginButtonSelector = '.enter-account a[originaltitle="כניסה לחשבונך"]';
                    debug('wait for homepage to click on login button');
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, loginButtonSelector)];
                case 1:
                    _a.sent();
                    debug('navigate to login page');
                    return [4 /*yield*/, (0, elements_interactions_1.pageEval)(page, loginButtonSelector, null, function (element) {
                            return element.href;
                        })];
                case 2:
                    loginUrl = _a.sent();
                    debug("navigating to page (".concat(loginUrl, ")"));
                    return [4 /*yield*/, page.goto(loginUrl)];
                case 3:
                    _a.sent();
                    debug('waiting for page to be loaded (networkidle2)');
                    return [4 /*yield*/, (0, navigation_1.waitForNavigation)(page, { waitUntil: 'networkidle2' })];
                case 4:
                    _a.sent();
                    debug('waiting for components of login to enter credentials');
                    return [4 /*yield*/, Promise.all([
                            (0, elements_interactions_1.waitUntilElementFound)(page, 'input[placeholder="שם משתמש"]', true),
                            (0, elements_interactions_1.waitUntilElementFound)(page, 'input[placeholder="סיסמה"]', true),
                            (0, elements_interactions_1.waitUntilElementFound)(page, 'button[type="submit"]', true),
                        ])];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function waitForPostLogin(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.race([
                        (0, elements_interactions_1.waitUntilElementFound)(page, 'a[title="דלג לחשבון"]', true, 60000),
                        (0, elements_interactions_1.waitUntilElementFound)(page, 'div.main-content', false, 60000),
                        page.waitForSelector("xpath//div[contains(string(),\"".concat(INVALID_PASSWORD_MSG, "\")]")),
                        (0, elements_interactions_1.waitUntilElementFound)(page, 'form[action="/changepassword"]', true, 60000), // not sure if they kept this one
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var LeumiScraper = /** @class */ (function (_super) {
    __extends(LeumiScraper, _super);
    function LeumiScraper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeumiScraper.prototype.getLoginOptions = function (credentials) {
        var _this = this;
        return {
            loginUrl: LOGIN_URL,
            fields: createLoginFields(credentials),
            submitButtonSelector: "button[type='submit']",
            checkReadiness: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, navigateToLogin(this.page)];
            }); }); },
            postAction: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, waitForPostLogin(this.page)];
            }); }); },
            possibleResults: getPossibleLoginResults()
        };
    };
    LeumiScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var minimumStartMoment, defaultStartMoment, startDate, startMoment, accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        minimumStartMoment = (0, moment_1["default"])().subtract(3, 'years').add(1, 'day');
                        defaultStartMoment = (0, moment_1["default"])().subtract(1, 'years').add(1, 'day');
                        startDate = this.options.startDate || defaultStartMoment.toDate();
                        startMoment = moment_1["default"].max(minimumStartMoment, (0, moment_1["default"])(startDate));
                        return [4 /*yield*/, this.navigateTo(TRANSACTIONS_URL)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fetchTransactions(this.page, startMoment)];
                    case 2:
                        accounts = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                accounts: accounts
                            }];
                }
            });
        });
    };
    return LeumiScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = LeumiScraper;
