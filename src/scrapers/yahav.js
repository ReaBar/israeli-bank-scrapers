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
exports.__esModule = true;
var moment_1 = require("moment");
var constants_1 = require("../constants");
var elements_interactions_1 = require("../helpers/elements-interactions");
var navigation_1 = require("../helpers/navigation");
var transactions_1 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var LOGIN_URL = 'https://login.yahav.co.il/login/';
var BASE_URL = 'https://digital.yahav.co.il/BaNCSDigitalUI/app/index.html#/';
var INVALID_DETAILS_SELECTOR = '.ui-dialog-buttons';
var CHANGE_PASSWORD_OLD_PASS = 'input#ef_req_parameter_old_credential';
var BASE_WELCOME_URL = "".concat(BASE_URL, "main/home");
var ACCOUNT_ID_SELECTOR = 'span.portfolio-value[ng-if="mainController.data.portfolioList.length === 1"]';
var ACCOUNT_DETAILS_SELECTOR = '.account-details';
var DATE_FORMAT = 'DD/MM/YYYY';
var USER_ELEM = '#username';
var PASSWD_ELEM = '#password';
var NATIONALID_ELEM = '#pinno';
var SUBMIT_LOGIN_SELECTOR = '.btn';
function getPossibleLoginResults(page) {
    var _this = this;
    // checkout file `base-scraper-with-browser.ts` for available result types
    var urls = {};
    urls[base_scraper_with_browser_1.LoginResults.Success] = [
        "".concat(BASE_WELCOME_URL),
    ];
    urls[base_scraper_with_browser_1.LoginResults.InvalidPassword] = [function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, elements_interactions_1.elementPresentOnPage)(page, "".concat(INVALID_DETAILS_SELECTOR))];
            });
        }); }];
    urls[base_scraper_with_browser_1.LoginResults.ChangePassword] = [function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, elements_interactions_1.elementPresentOnPage)(page, "".concat(CHANGE_PASSWORD_OLD_PASS))];
            });
        }); }];
    return urls;
}
function getAccountID(page) {
    return __awaiter(this, void 0, void 0, function () {
        var selectedSnifAccount, error_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, page.$eval(ACCOUNT_ID_SELECTOR, function (element) {
                            return element.textContent;
                        })];
                case 1:
                    selectedSnifAccount = _a.sent();
                    return [2 /*return*/, selectedSnifAccount];
                case 2:
                    error_1 = _a.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : String(error_1);
                    throw new Error("Failed to retrieve account ID. Possible outdated selector '".concat(ACCOUNT_ID_SELECTOR, ": ").concat(errorMessage));
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getAmountData(amountStr) {
    var amountStrCopy = amountStr.replace(',', '');
    return parseFloat(amountStrCopy);
}
function getTxnAmount(txn) {
    var credit = getAmountData(txn.credit);
    var debit = getAmountData(txn.debit);
    return (Number.isNaN(credit) ? 0 : credit) - (Number.isNaN(debit) ? 0 : debit);
}
function convertTransactions(txns) {
    return txns.map(function (txn) {
        var convertedDate = (0, moment_1["default"])(txn.date, DATE_FORMAT).toISOString();
        var convertedAmount = getTxnAmount(txn);
        return {
            type: transactions_1.TransactionTypes.Normal,
            identifier: txn.reference ? parseInt(txn.reference, 10) : undefined,
            date: convertedDate,
            processedDate: convertedDate,
            originalAmount: convertedAmount,
            originalCurrency: constants_1.SHEKEL_CURRENCY,
            chargedAmount: convertedAmount,
            status: txn.status,
            description: txn.description,
            memo: txn.memo
        };
    });
}
function handleTransactionRow(txns, txnRow) {
    var div = txnRow.innerDivs;
    // Remove anything except digits.
    var regex = /\D+/gm;
    var tx = {
        date: div[1],
        reference: div[2].replace(regex, ''),
        memo: '',
        description: div[3],
        debit: div[4],
        credit: div[5],
        status: transactions_1.TransactionStatuses.Completed
    };
    txns.push(tx);
}
function getAccountTransactions(page) {
    return __awaiter(this, void 0, void 0, function () {
        var txns, transactionsDivs, _i, transactionsDivs_1, txnRow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Wait for transactions.
                return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, '.under-line-txn-table-header', true)];
                case 1:
                    // Wait for transactions.
                    _a.sent();
                    txns = [];
                    return [4 /*yield*/, (0, elements_interactions_1.pageEvalAll)(page, '.list-item-holder .entire-content-ctr', [], function (divs) {
                            return divs.map(function (div) { return ({
                                id: (div).getAttribute('id') || '',
                                innerDivs: Array.from(div.getElementsByTagName('div')).map(function (el) { return el.innerText; })
                            }); });
                        })];
                case 2:
                    transactionsDivs = _a.sent();
                    for (_i = 0, transactionsDivs_1 = transactionsDivs; _i < transactionsDivs_1.length; _i++) {
                        txnRow = transactionsDivs_1[_i];
                        handleTransactionRow(txns, txnRow);
                    }
                    return [2 /*return*/, convertTransactions(txns)];
            }
        });
    });
}
// Manipulate the calendar drop down to choose the txs start date.
function searchByDates(page, startDate) {
    return __awaiter(this, void 0, void 0, function () {
        var startDateDay, startDateMonth, startDateYear, dateFromPick, monthFromPick, i, selector, year, monthSelector, i, selector, day;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startDateDay = startDate.format('D');
                    startDateMonth = startDate.format('M');
                    startDateYear = startDate.format('Y');
                    dateFromPick = 'div.date-options-cell:nth-child(7) > date-picker:nth-child(1) > div:nth-child(1) > span:nth-child(2)';
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, dateFromPick, true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, dateFromPick)];
                case 2:
                    _a.sent();
                    // Wait until first day appear.
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, '.pmu-days > div:nth-child(1)', true)];
                case 3:
                    // Wait until first day appear.
                    _a.sent();
                    monthFromPick = '.pmu-month';
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, monthFromPick, true)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, monthFromPick)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, '.pmu-months > div:nth-child(1)', true)];
                case 6:
                    _a.sent();
                    // Open Year options.
                    // Use same selector... Yahav knows why...
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, monthFromPick, true)];
                case 7:
                    // Open Year options.
                    // Use same selector... Yahav knows why...
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, monthFromPick)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, '.pmu-years > div:nth-child(1)', true)];
                case 9:
                    _a.sent();
                    i = 1;
                    _a.label = 10;
                case 10:
                    if (!(i < 13)) return [3 /*break*/, 14];
                    selector = ".pmu-years > div:nth-child(".concat(i, ")");
                    return [4 /*yield*/, page.$eval(selector, function (y) {
                            return y.innerText;
                        })];
                case 11:
                    year = _a.sent();
                    if (!(startDateYear === year)) return [3 /*break*/, 13];
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, selector)];
                case 12:
                    _a.sent();
                    return [3 /*break*/, 14];
                case 13:
                    i += 1;
                    return [3 /*break*/, 10];
                case 14: 
                // Select Month.
                return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, '.pmu-months > div:nth-child(1)', true)];
                case 15:
                    // Select Month.
                    _a.sent();
                    monthSelector = ".pmu-months > div:nth-child(".concat(startDateMonth, ")");
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, monthSelector)];
                case 16:
                    _a.sent();
                    i = 1;
                    _a.label = 17;
                case 17:
                    if (!(i < 42)) return [3 /*break*/, 21];
                    selector = ".pmu-days > div:nth-child(".concat(i, ")");
                    return [4 /*yield*/, page.$eval(selector, function (d) {
                            return d.innerText;
                        })];
                case 18:
                    day = _a.sent();
                    if (!(startDateDay === day)) return [3 /*break*/, 20];
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, selector)];
                case 19:
                    _a.sent();
                    return [3 /*break*/, 21];
                case 20:
                    i += 1;
                    return [3 /*break*/, 17];
                case 21: return [2 /*return*/];
            }
        });
    });
}
function fetchAccountData(page, startDate, accountID) {
    return __awaiter(this, void 0, void 0, function () {
        var txns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementDisappear)(page, '.loading-bar-spinner')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, searchByDates(page, startDate)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementDisappear)(page, '.loading-bar-spinner')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, getAccountTransactions(page)];
                case 4:
                    txns = _a.sent();
                    return [2 /*return*/, {
                            accountNumber: accountID,
                            txns: txns
                        }];
            }
        });
    });
}
function fetchAccounts(page, startDate) {
    return __awaiter(this, void 0, void 0, function () {
        var accounts, accountID, accountData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accounts = [];
                    return [4 /*yield*/, getAccountID(page)];
                case 1:
                    accountID = _a.sent();
                    return [4 /*yield*/, fetchAccountData(page, startDate, accountID)];
                case 2:
                    accountData = _a.sent();
                    accounts.push(accountData);
                    return [2 /*return*/, accounts];
            }
        });
    });
}
function waitReadinessForAll(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, "".concat(USER_ELEM), true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, "".concat(PASSWD_ELEM), true)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, "".concat(NATIONALID_ELEM), true)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, "".concat(SUBMIT_LOGIN_SELECTOR), true)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function redirectOrDialog(page) {
    return __awaiter(this, void 0, void 0, function () {
        var hasMessage, promise1, promise2, promises;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Click on bank messages if any.
                return [4 /*yield*/, (0, navigation_1.waitForNavigation)(page)];
                case 1:
                    // Click on bank messages if any.
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementDisappear)(page, '.loading-bar-spinner')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.elementPresentOnPage)(page, '.messaging-links-container')];
                case 3:
                    hasMessage = _a.sent();
                    if (!hasMessage) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, '.link-1')];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    promise1 = page.waitForSelector(ACCOUNT_DETAILS_SELECTOR, { timeout: 30000 });
                    promise2 = page.waitForSelector(CHANGE_PASSWORD_OLD_PASS, { timeout: 30000 });
                    promises = [promise1, promise2];
                    return [4 /*yield*/, Promise.race(promises)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementDisappear)(page, '.loading-bar-spinner')];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var YahavScraper = /** @class */ (function (_super) {
    __extends(YahavScraper, _super);
    function YahavScraper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YahavScraper.prototype.getLoginOptions = function (credentials) {
        var _this = this;
        return {
            loginUrl: "".concat(LOGIN_URL),
            fields: [
                { selector: "".concat(USER_ELEM), value: credentials.username },
                { selector: "".concat(PASSWD_ELEM), value: credentials.password },
                { selector: "".concat(NATIONALID_ELEM), value: credentials.nationalID },
            ],
            submitButtonSelector: "".concat(SUBMIT_LOGIN_SELECTOR),
            checkReadiness: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, waitReadinessForAll(this.page)];
            }); }); },
            postAction: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, redirectOrDialog(this.page)];
            }); }); },
            possibleResults: getPossibleLoginResults(this.page)
        };
    };
    YahavScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultStartMoment, startDate, startMoment, accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Goto statements page
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(this.page, ACCOUNT_DETAILS_SELECTOR, true)];
                    case 1:
                        // Goto statements page
                        _a.sent();
                        return [4 /*yield*/, (0, elements_interactions_1.clickButton)(this.page, ACCOUNT_DETAILS_SELECTOR)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(this.page, '.statement-options .selected-item-top', true)];
                    case 3:
                        _a.sent();
                        defaultStartMoment = (0, moment_1["default"])().subtract(3, 'months').add(1, 'day');
                        startDate = this.options.startDate || defaultStartMoment.toDate();
                        startMoment = moment_1["default"].max(defaultStartMoment, (0, moment_1["default"])(startDate));
                        return [4 /*yield*/, fetchAccounts(this.page, startMoment)];
                    case 4:
                        accounts = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                accounts: accounts
                            }];
                }
            });
        });
    };
    return YahavScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = YahavScraper;
