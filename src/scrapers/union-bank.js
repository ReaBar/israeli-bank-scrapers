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
var elements_interactions_1 = require("../helpers/elements-interactions");
var navigation_1 = require("../helpers/navigation");
var transactions_1 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var BASE_URL = 'https://hb.unionbank.co.il';
var TRANSACTIONS_URL = "".concat(BASE_URL, "/eBanking/Accounts/ExtendedActivity.aspx#/");
var DATE_FORMAT = 'DD/MM/YY';
var NO_TRANSACTION_IN_DATE_RANGE_TEXT = 'לא קיימות תנועות מתאימות על פי הסינון שהוגדר';
var DATE_HEADER = 'תאריך';
var DESCRIPTION_HEADER = 'תיאור';
var REFERENCE_HEADER = 'אסמכתא';
var DEBIT_HEADER = 'חובה';
var CREDIT_HEADER = 'זכות';
var PENDING_TRANSACTIONS_TABLE_ID = 'trTodayActivityNapaTableUpper';
var COMPLETED_TRANSACTIONS_TABLE_ID = 'ctlActivityTable';
var ERROR_MESSAGE_CLASS = 'errInfo';
var ACCOUNTS_DROPDOWN_SELECTOR = 'select#ddlAccounts_m_ddl';
function getPossibleLoginResults() {
    var urls = {};
    urls[base_scraper_with_browser_1.LoginResults.Success] = [/eBanking\/Accounts/];
    urls[base_scraper_with_browser_1.LoginResults.InvalidPassword] = [/InternalSite\/CustomUpdate\/leumi\/LoginPage.ASP/];
    return urls;
}
function createLoginFields(credentials) {
    return [
        { selector: '#uid', value: credentials.username },
        { selector: '#password', value: credentials.password },
    ];
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
function getTransactionDate(tds, txnsTableHeaders) {
    return (tds[txnsTableHeaders[DATE_HEADER]] || '').trim();
}
function getTransactionDescription(tds, txnsTableHeaders) {
    return (tds[txnsTableHeaders[DESCRIPTION_HEADER]] || '').trim();
}
function getTransactionReference(tds, txnsTableHeaders) {
    return (tds[txnsTableHeaders[REFERENCE_HEADER]] || '').trim();
}
function getTransactionDebit(tds, txnsTableHeaders) {
    return (tds[txnsTableHeaders[DEBIT_HEADER]] || '').trim();
}
function getTransactionCredit(tds, txnsTableHeaders) {
    return (tds[txnsTableHeaders[CREDIT_HEADER]] || '').trim();
}
function extractTransactionDetails(txnRow, txnsTableHeaders, txnStatus) {
    var tds = txnRow.innerTds;
    return {
        status: txnStatus,
        date: getTransactionDate(tds, txnsTableHeaders),
        description: getTransactionDescription(tds, txnsTableHeaders),
        reference: getTransactionReference(tds, txnsTableHeaders),
        debit: getTransactionDebit(tds, txnsTableHeaders),
        credit: getTransactionCredit(tds, txnsTableHeaders),
        memo: ''
    };
}
function isExpandedDescRow(txnRow) {
    return txnRow.id === 'rowAdded';
}
/* eslint-disable no-param-reassign */
function editLastTransactionDesc(txnRow, lastTxn) {
    lastTxn.description = "".concat(lastTxn.description, " ").concat(txnRow.innerTds[0]);
    return lastTxn;
}
function handleTransactionRow(txns, txnsTableHeaders, txnRow, txnType) {
    if (isExpandedDescRow(txnRow)) {
        var lastTransaction = txns.pop();
        if (lastTransaction) {
            txns.push(editLastTransactionDesc(txnRow, lastTransaction));
        }
        else {
            throw new Error('internal union-bank error');
        }
    }
    else {
        txns.push(extractTransactionDetails(txnRow, txnsTableHeaders, txnType));
    }
}
function getTransactionsTableHeaders(page, tableTypeId) {
    return __awaiter(this, void 0, void 0, function () {
        var headersMap, headersObjs, _i, headersObjs_1, headerObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headersMap = [];
                    return [4 /*yield*/, (0, elements_interactions_1.pageEvalAll)(page, "#WorkSpaceBox #".concat(tableTypeId, " tr[class='header'] th"), null, function (ths) {
                            return ths.map(function (th, index) { return ({
                                text: th.innerText.trim(),
                                index: index
                            }); });
                        })];
                case 1:
                    headersObjs = _a.sent();
                    for (_i = 0, headersObjs_1 = headersObjs; _i < headersObjs_1.length; _i++) {
                        headerObj = headersObjs_1[_i];
                        headersMap[headerObj.text] = headerObj.index;
                    }
                    return [2 /*return*/, headersMap];
            }
        });
    });
}
function extractTransactionsFromTable(page, tableTypeId, txnType) {
    return __awaiter(this, void 0, void 0, function () {
        var txns, transactionsTableHeaders, transactionsRows, _i, transactionsRows_1, txnRow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    txns = [];
                    return [4 /*yield*/, getTransactionsTableHeaders(page, tableTypeId)];
                case 1:
                    transactionsTableHeaders = _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.pageEvalAll)(page, "#WorkSpaceBox #".concat(tableTypeId, " tr[class]:not([class='header'])"), [], function (trs) {
                            return trs.map(function (tr) { return ({
                                id: (tr).getAttribute('id') || '',
                                innerTds: Array.from(tr.getElementsByTagName('td')).map(function (td) { return td.innerText; })
                            }); });
                        })];
                case 2:
                    transactionsRows = _a.sent();
                    for (_i = 0, transactionsRows_1 = transactionsRows; _i < transactionsRows_1.length; _i++) {
                        txnRow = transactionsRows_1[_i];
                        handleTransactionRow(txns, transactionsTableHeaders, txnRow, txnType);
                    }
                    return [2 /*return*/, txns];
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
function chooseAccount(page, accountId) {
    return __awaiter(this, void 0, void 0, function () {
        var hasDropDownList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elements_interactions_1.elementPresentOnPage)(page, ACCOUNTS_DROPDOWN_SELECTOR)];
                case 1:
                    hasDropDownList = _a.sent();
                    if (!hasDropDownList) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, elements_interactions_1.dropdownSelect)(page, ACCOUNTS_DROPDOWN_SELECTOR, accountId)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function searchByDates(page, startDate) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elements_interactions_1.dropdownSelect)(page, 'select#ddlTransactionPeriod', '004')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, 'select#ddlTransactionPeriod')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.fillInput)(page, 'input#dtFromDate_textBox', startDate.format(DATE_FORMAT))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, 'input#btnDisplayDates')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, navigation_1.waitForNavigation)(page)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getAccountNumber(page) {
    return __awaiter(this, void 0, void 0, function () {
        var selectedSnifAccount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.$eval('#ddlAccounts_m_ddl option[selected="selected"]', function (option) {
                        return option.innerText;
                    })];
                case 1:
                    selectedSnifAccount = _a.sent();
                    return [2 /*return*/, selectedSnifAccount.replace('/', '_')];
            }
        });
    });
}
function expandTransactionsTable(page) {
    return __awaiter(this, void 0, void 0, function () {
        var hasExpandAllButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elements_interactions_1.elementPresentOnPage)(page, "a[id*='lnkCtlExpandAll']")];
                case 1:
                    hasExpandAllButton = _a.sent();
                    if (!hasExpandAllButton) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, elements_interactions_1.clickButton)(page, "a[id*='lnkCtlExpandAll']")];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function scrapeTransactionsFromTable(page) {
    return __awaiter(this, void 0, void 0, function () {
        var pendingTxns, completedTxns, txns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, extractTransactionsFromTable(page, PENDING_TRANSACTIONS_TABLE_ID, transactions_1.TransactionStatuses.Pending)];
                case 1:
                    pendingTxns = _a.sent();
                    return [4 /*yield*/, extractTransactionsFromTable(page, COMPLETED_TRANSACTIONS_TABLE_ID, transactions_1.TransactionStatuses.Completed)];
                case 2:
                    completedTxns = _a.sent();
                    txns = __spreadArray(__spreadArray([], pendingTxns, true), completedTxns, true);
                    return [2 /*return*/, convertTransactions(txns)];
            }
        });
    });
}
function getAccountTransactions(page) {
    return __awaiter(this, void 0, void 0, function () {
        var noTransactionInRangeError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.race([
                        (0, elements_interactions_1.waitUntilElementFound)(page, "#".concat(COMPLETED_TRANSACTIONS_TABLE_ID), false),
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
                    return [4 /*yield*/, expandTransactionsTable(page)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, scrapeTransactionsFromTable(page)];
            }
        });
    });
}
function fetchAccountData(page, startDate, accountId) {
    return __awaiter(this, void 0, void 0, function () {
        var accountNumber, txns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chooseAccount(page, accountId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, searchByDates(page, startDate)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, getAccountNumber(page)];
                case 3:
                    accountNumber = _a.sent();
                    return [4 /*yield*/, getAccountTransactions(page)];
                case 4:
                    txns = _a.sent();
                    return [2 /*return*/, {
                            accountNumber: accountNumber,
                            txns: txns
                        }];
            }
        });
    });
}
function fetchAccounts(page, startDate) {
    return __awaiter(this, void 0, void 0, function () {
        var accounts, accountsList, _i, accountsList_1, account, accountData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accounts = [];
                    return [4 /*yield*/, (0, elements_interactions_1.dropdownElements)(page, ACCOUNTS_DROPDOWN_SELECTOR)];
                case 1:
                    accountsList = _a.sent();
                    _i = 0, accountsList_1 = accountsList;
                    _a.label = 2;
                case 2:
                    if (!(_i < accountsList_1.length)) return [3 /*break*/, 5];
                    account = accountsList_1[_i];
                    if (!(account.value !== '-1')) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetchAccountData(page, startDate, account.value)];
                case 3:
                    accountData = _a.sent();
                    accounts.push(accountData);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, accounts];
            }
        });
    });
}
function waitForPostLogin(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Promise.race([
                    (0, elements_interactions_1.waitUntilElementFound)(page, '#signoff', true),
                    (0, elements_interactions_1.waitUntilElementFound)(page, '#restore', true),
                ])];
        });
    });
}
var UnionBankScraper = /** @class */ (function (_super) {
    __extends(UnionBankScraper, _super);
    function UnionBankScraper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnionBankScraper.prototype.getLoginOptions = function (credentials) {
        var _this = this;
        return {
            loginUrl: "".concat(BASE_URL),
            fields: createLoginFields(credentials),
            submitButtonSelector: '#enter',
            postAction: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, waitForPostLogin(this.page)];
            }); }); },
            possibleResults: getPossibleLoginResults()
        };
    };
    UnionBankScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultStartMoment, startDate, startMoment, accounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultStartMoment = (0, moment_1["default"])().subtract(1, 'years').add(1, 'day');
                        startDate = this.options.startDate || defaultStartMoment.toDate();
                        startMoment = moment_1["default"].max(defaultStartMoment, (0, moment_1["default"])(startDate));
                        return [4 /*yield*/, this.navigateTo(TRANSACTIONS_URL)];
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
    return UnionBankScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = UnionBankScraper;
