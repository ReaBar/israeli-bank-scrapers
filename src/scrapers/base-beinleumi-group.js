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
exports.waitForPostLogin = exports.createLoginFields = exports.getPossibleLoginResults = void 0;
var moment_1 = require("moment");
var constants_1 = require("../constants");
var elements_interactions_1 = require("../helpers/elements-interactions");
var navigation_1 = require("../helpers/navigation");
var waiting_1 = require("../helpers/waiting");
var transactions_1 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var DATE_FORMAT = 'DD/MM/YYYY';
var NO_TRANSACTION_IN_DATE_RANGE_TEXT = 'לא נמצאו נתונים בנושא המבוקש';
var DATE_COLUMN_CLASS_COMPLETED = 'date first';
var DATE_COLUMN_CLASS_PENDING = 'first date';
var DESCRIPTION_COLUMN_CLASS_COMPLETED = 'reference wrap_normal';
var DESCRIPTION_COLUMN_CLASS_PENDING = 'details wrap_normal';
var REFERENCE_COLUMN_CLASS = 'details';
var DEBIT_COLUMN_CLASS = 'debit';
var CREDIT_COLUMN_CLASS = 'credit';
var ERROR_MESSAGE_CLASS = 'NO_DATA';
var ACCOUNTS_NUMBER = 'div.fibi_account span.acc_num';
var CLOSE_SEARCH_BY_DATES_BUTTON_CLASS = 'ui-datepicker-close';
var SHOW_SEARCH_BY_DATES_BUTTON_VALUE = 'הצג';
var COMPLETED_TRANSACTIONS_TABLE = 'table#dataTable077';
var PENDING_TRANSACTIONS_TABLE = 'table#dataTable023';
var NEXT_PAGE_LINK = 'a#Npage.paging';
var CURRENT_BALANCE = '.main_balance';
var IFRAME_NAME = 'iframe-old-pages';
function getPossibleLoginResults() {
    var urls = {};
    urls[base_scraper_with_browser_1.LoginResults.Success] = [
        /fibi.*accountSummary/,
        /FibiMenu\/Online/, // Old UI pattern
    ];
    urls[base_scraper_with_browser_1.LoginResults.InvalidPassword] = [/FibiMenu\/Marketing\/Private\/Home/];
    return urls;
}
exports.getPossibleLoginResults = getPossibleLoginResults;
function createLoginFields(credentials) {
    return [
        { selector: '#username', value: credentials.username },
        { selector: '#password', value: credentials.password },
    ];
}
exports.createLoginFields = createLoginFields;
function getAmountData(amountStr) {
    var amountStrCopy = amountStr.replace(constants_1.SHEKEL_CURRENCY_SYMBOL, '');
    amountStrCopy = amountStrCopy.replaceAll(',', '');
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
function getTransactionDate(tds, transactionType, transactionsColsTypes) {
    if (transactionType === 'completed') {
        return (tds[transactionsColsTypes[DATE_COLUMN_CLASS_COMPLETED]] || '').trim();
    }
    return (tds[transactionsColsTypes[DATE_COLUMN_CLASS_PENDING]] || '').trim();
}
function getTransactionDescription(tds, transactionType, transactionsColsTypes) {
    if (transactionType === 'completed') {
        return (tds[transactionsColsTypes[DESCRIPTION_COLUMN_CLASS_COMPLETED]] || '').trim();
    }
    return (tds[transactionsColsTypes[DESCRIPTION_COLUMN_CLASS_PENDING]] || '').trim();
}
function getTransactionReference(tds, transactionsColsTypes) {
    return (tds[transactionsColsTypes[REFERENCE_COLUMN_CLASS]] || '').trim();
}
function getTransactionDebit(tds, transactionsColsTypes) {
    return (tds[transactionsColsTypes[DEBIT_COLUMN_CLASS]] || '').trim();
}
function getTransactionCredit(tds, transactionsColsTypes) {
    return (tds[transactionsColsTypes[CREDIT_COLUMN_CLASS]] || '').trim();
}
function extractTransactionDetails(txnRow, transactionStatus, transactionsColsTypes) {
    var tds = txnRow.innerTds;
    var item = {
        status: transactionStatus,
        date: getTransactionDate(tds, transactionStatus, transactionsColsTypes),
        description: getTransactionDescription(tds, transactionStatus, transactionsColsTypes),
        reference: getTransactionReference(tds, transactionsColsTypes),
        debit: getTransactionDebit(tds, transactionsColsTypes),
        credit: getTransactionCredit(tds, transactionsColsTypes)
    };
    return item;
}
function getTransactionsColsTypeClasses(page, tableLocator) {
    return __awaiter(this, void 0, void 0, function () {
        var result, typeClassesObjs, _i, typeClassesObjs_1, typeClassObj, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    // Wait for table and its first row cells to appear
                    return [4 /*yield*/, page.waitForSelector("".concat(tableLocator, " tbody tr:first-of-type td"), { timeout: 10000 })["catch"](function () {
                            console.log("Timeout waiting for table ".concat(tableLocator));
                            return result;
                        })];
                case 2:
                    // Wait for table and its first row cells to appear
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.pageEvalAll)(page, "".concat(tableLocator, " tbody tr:first-of-type td"), null, function (tds) {
                            return tds.map(function (td, index) { return ({
                                colClass: td.getAttribute('class'),
                                index: index
                            }); });
                        })];
                case 3:
                    typeClassesObjs = _a.sent();
                    for (_i = 0, typeClassesObjs_1 = typeClassesObjs; _i < typeClassesObjs_1.length; _i++) {
                        typeClassObj = typeClassesObjs_1[_i];
                        if (typeClassObj.colClass) {
                            result[typeClassObj.colClass] = typeClassObj.index;
                        }
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log("No columns found in table ".concat(tableLocator));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, result];
            }
        });
    });
}
function extractTransaction(txns, transactionStatus, txnRow, transactionsColsTypes) {
    var txn = extractTransactionDetails(txnRow, transactionStatus, transactionsColsTypes);
    if (txn.date !== '') {
        txns.push(txn);
    }
}
function extractTransactions(page, tableLocator, transactionStatus) {
    return __awaiter(this, void 0, void 0, function () {
        var txns, transactionsColsTypes, transactionsRows, _i, transactionsRows_1, txnRow, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    txns = [];
                    return [4 /*yield*/, getTransactionsColsTypeClasses(page, tableLocator)];
                case 1:
                    transactionsColsTypes = _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.pageEvalAll)(page, "".concat(tableLocator, " tbody tr"), [], function (trs) {
                            return trs.map(function (tr) { return ({
                                innerTds: Array.from(tr.getElementsByTagName('td')).map(function (td) { return td.innerText; })
                            }); });
                        })];
                case 2:
                    transactionsRows = _a.sent();
                    for (_i = 0, transactionsRows_1 = transactionsRows; _i < transactionsRows_1.length; _i++) {
                        txnRow = transactionsRows_1[_i];
                        extractTransaction(txns, transactionStatus, txnRow, transactionsColsTypes);
                    }
                    return [2 /*return*/, txns];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error extracting transactions:', error_2);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function isNoTransactionInDateRangeError(page) {
    return __awaiter(this, void 0, void 0, function () {
        var hasErrorInfoElement, errorText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elements_interactions_1.elementPresentOnPage)(page, ".".concat(ERROR_MESSAGE_CLASS))];
                case 1:
                    hasErrorInfoElement = _a.sent();
                    if (!hasErrorInfoElement) return [3 /*break*/, 3];
                    return [4 /*yield*/, page.$eval(".".concat(ERROR_MESSAGE_CLASS), function (errorElement) {
                            return errorElement.innerText;
                        })];
                case 2:
                    errorText = _a.sent();
                    return [2 /*return*/, errorText.trim() === NO_TRANSACTION_IN_DATE_RANGE_TEXT];
                case 3: return [2 /*return*/, false];
            }
        });
    });
}
function searchByDates(page, startDate) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, 'a#tabHeader4')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, 'div#fibi_dates')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.fillInput)(page, 'input#fromDate', startDate.format(DATE_FORMAT))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, "button[class*=".concat(CLOSE_SEARCH_BY_DATES_BUTTON_CLASS, "]"))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, "input[value=".concat(SHOW_SEARCH_BY_DATES_BUTTON_VALUE, "]"))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, navigation_1.waitForNavigation)(page)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getAccountNumber(page) {
    return __awaiter(this, void 0, void 0, function () {
        var selectedSnifAccount, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForSelector(ACCOUNTS_NUMBER, { timeout: 10000 })];
                case 1:
                    _a.sent();
                    selectedSnifAccount = '';
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, page.$eval(ACCOUNTS_NUMBER, function (option) {
                            return option.innerText;
                        })];
                case 3:
                    selectedSnifAccount = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error extracting account number:', error_3);
                    return [2 /*return*/, ''];
                case 5: return [2 /*return*/, selectedSnifAccount.replace('/', '_').trim()];
            }
        });
    });
}
function checkIfHasNextPage(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, elements_interactions_1.elementPresentOnPage)(page, NEXT_PAGE_LINK)];
        });
    });
}
function navigateToNextPage(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, NEXT_PAGE_LINK)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, navigation_1.waitForNavigation)(page)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/* Couldn't reproduce scenario with multiple pages of pending transactions - Should support if exists such case.
   needToPaginate is false if scraping pending transactions */
function scrapeTransactions(page, tableLocator, transactionStatus, needToPaginate) {
    return __awaiter(this, void 0, void 0, function () {
        var txns, hasNextPage, currentPageTxns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    txns = [];
                    hasNextPage = false;
                    _a.label = 1;
                case 1: return [4 /*yield*/, extractTransactions(page, tableLocator, transactionStatus)];
                case 2:
                    currentPageTxns = _a.sent();
                    txns.push.apply(txns, currentPageTxns);
                    if (!needToPaginate) return [3 /*break*/, 5];
                    return [4 /*yield*/, checkIfHasNextPage(page)];
                case 3:
                    hasNextPage = _a.sent();
                    if (!hasNextPage) return [3 /*break*/, 5];
                    return [4 /*yield*/, navigateToNextPage(page)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (hasNextPage) return [3 /*break*/, 1];
                    _a.label = 6;
                case 6: return [2 /*return*/, convertTransactions(txns)];
            }
        });
    });
}
function getAccountTransactions(page) {
    return __awaiter(this, void 0, void 0, function () {
        var noTransactionInRangeError, pendingTxns, completedTxns, txns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.race([
                        (0, elements_interactions_1.waitUntilElementFound)(page, 'div[id*=\'divTable\']', false),
                        (0, elements_interactions_1.waitUntilElementFound)(page, ".".concat(ERROR_MESSAGE_CLASS), false),
                    ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, isNoTransactionInDateRangeError(page)];
                case 2:
                    noTransactionInRangeError = _a.sent();
                    if (noTransactionInRangeError) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, scrapeTransactions(page, PENDING_TRANSACTIONS_TABLE, transactions_1.TransactionStatuses.Pending, false)];
                case 3:
                    pendingTxns = _a.sent();
                    return [4 /*yield*/, scrapeTransactions(page, COMPLETED_TRANSACTIONS_TABLE, transactions_1.TransactionStatuses.Completed, true)];
                case 4:
                    completedTxns = _a.sent();
                    txns = __spreadArray(__spreadArray([], pendingTxns, true), completedTxns, true);
                    return [2 /*return*/, txns];
            }
        });
    });
}
function getCurrentBalance(page) {
    return __awaiter(this, void 0, void 0, function () {
        var balanceElement, balanceStr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.$(CURRENT_BALANCE)];
                case 1:
                    balanceElement = _a.sent();
                    if (!balanceElement) {
                        return [2 /*return*/, undefined];
                    }
                    return [4 /*yield*/, balanceElement.evaluate(function (option) {
                            return option.innerText;
                        })];
                case 2:
                    balanceStr = _a.sent();
                    return [2 /*return*/, getAmountData(balanceStr)];
            }
        });
    });
}
function waitForPostLogin(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Promise.race([
                    (0, elements_interactions_1.waitUntilElementFound)(page, '#card-header', true),
                    (0, elements_interactions_1.waitUntilElementFound)(page, '#account_num', true),
                    (0, elements_interactions_1.waitUntilElementFound)(page, '#matafLogoutLink', true),
                    (0, elements_interactions_1.waitUntilElementFound)(page, '#validationMsg', true), // Old UI
                ])];
        });
    });
}
exports.waitForPostLogin = waitForPostLogin;
function fetchAccountData(page, startDate) {
    return __awaiter(this, void 0, void 0, function () {
        var accountNumber, balance, txns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, searchByDates(page, startDate)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getAccountNumber(page)];
                case 2:
                    accountNumber = _a.sent();
                    return [4 /*yield*/, getCurrentBalance(page)];
                case 3:
                    balance = _a.sent();
                    return [4 /*yield*/, getAccountTransactions(page)];
                case 4:
                    txns = _a.sent();
                    return [2 /*return*/, {
                            accountNumber: accountNumber,
                            txns: txns,
                            balance: balance
                        }];
            }
        });
    });
}
function getAccountIdsBySelector(page) {
    return __awaiter(this, void 0, void 0, function () {
        var accountsIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function () {
                        var selectElement = document.getElementById('account_num_select');
                        var options = selectElement ? selectElement.querySelectorAll('option') : [];
                        if (!options)
                            return [];
                        return Array.from(options, function (option) { return option.value; });
                    })];
                case 1:
                    accountsIds = _a.sent();
                    return [2 /*return*/, accountsIds];
            }
        });
    });
}
function getTransactionsFrame(page) {
    return __awaiter(this, void 0, void 0, function () {
        var attempt, frames_1, targetFrame;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attempt = 0;
                    _a.label = 1;
                case 1:
                    if (!(attempt < 3)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, waiting_1.sleep)(2000)];
                case 2:
                    _a.sent();
                    frames_1 = page.frames();
                    targetFrame = frames_1.find(function (f) { return f.name() === IFRAME_NAME; });
                    if (targetFrame) {
                        return [2 /*return*/, targetFrame];
                    }
                    _a.label = 3;
                case 3:
                    attempt++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, null];
            }
        });
    });
}
function selectAccount(page, accountId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.select('#account_num_select', accountId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, '#account_num_select', true)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function fetchAccountDataBothUIs(page, startDate) {
    return __awaiter(this, void 0, void 0, function () {
        var frame, targetPage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTransactionsFrame(page)];
                case 1:
                    frame = _a.sent();
                    targetPage = frame || page;
                    return [2 /*return*/, fetchAccountData(targetPage, startDate)];
            }
        });
    });
}
function fetchAccounts(page, startDate) {
    return __awaiter(this, void 0, void 0, function () {
        var accountsIds, accountData, accounts, _i, accountsIds_1, accountId, accountData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAccountIdsBySelector(page)];
                case 1:
                    accountsIds = _a.sent();
                    if (!(accountsIds.length <= 1)) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetchAccountDataBothUIs(page, startDate)];
                case 2:
                    accountData = _a.sent();
                    return [2 /*return*/, [accountData]];
                case 3:
                    accounts = [];
                    _i = 0, accountsIds_1 = accountsIds;
                    _a.label = 4;
                case 4:
                    if (!(_i < accountsIds_1.length)) return [3 /*break*/, 8];
                    accountId = accountsIds_1[_i];
                    return [4 /*yield*/, selectAccount(page, accountId)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, fetchAccountDataBothUIs(page, startDate)];
                case 6:
                    accountData = _a.sent();
                    accounts.push(accountData);
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 4];
                case 8: return [2 /*return*/, accounts];
            }
        });
    });
}
var BeinleumiGroupBaseScraper = /** @class */ (function (_super) {
    __extends(BeinleumiGroupBaseScraper, _super);
    function BeinleumiGroupBaseScraper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BASE_URL = '';
        _this.LOGIN_URL = '';
        _this.TRANSACTIONS_URL = '';
        return _this;
    }
    BeinleumiGroupBaseScraper.prototype.getLoginOptions = function (credentials) {
        var _this = this;
        return {
            loginUrl: "".concat(this.LOGIN_URL),
            fields: createLoginFields(credentials),
            submitButtonSelector: '#continueBtn',
            postAction: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, waitForPostLogin(this.page)];
            }); }); },
            possibleResults: getPossibleLoginResults(),
            // HACK: For some reason, though the login button (#continueBtn) is present and visible, the click action does not perform.
            // Adding this delay fixes the issue.
            preAction: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, waiting_1.sleep)(1000)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }
        };
    };
    BeinleumiGroupBaseScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultStartMoment, startMomentLimit, startDate, startMoment, accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultStartMoment = (0, moment_1["default"])().subtract(1, 'years').add(1, 'day');
                        startMomentLimit = (0, moment_1["default"])({ year: 1600 });
                        startDate = this.options.startDate || defaultStartMoment.toDate();
                        startMoment = moment_1["default"].max(startMomentLimit, (0, moment_1["default"])(startDate));
                        return [4 /*yield*/, this.navigateTo(this.TRANSACTIONS_URL)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fetchAccounts(this.page, startMoment)];
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
    return BeinleumiGroupBaseScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = BeinleumiGroupBaseScraper;
