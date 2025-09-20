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
var debug_1 = require("../helpers/debug");
var elements_interactions_1 = require("../helpers/elements-interactions");
var transactions_1 = require("../helpers/transactions");
var transactions_2 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var debug = (0, debug_1.getDebug)('beyahadBishvilha');
var DATE_FORMAT = 'DD/MM/YY';
var LOGIN_URL = 'https://www.hist.org.il/login';
var SUCCESS_URL = 'https://www.hist.org.il/';
var CARD_URL = 'https://www.hist.org.il/card/balanceAndUses';
function getAmountData(amountStr) {
    var amountStrCln = amountStr.replace(',', '');
    var currency = null;
    var amount = null;
    if (amountStrCln.includes(constants_1.SHEKEL_CURRENCY_SYMBOL)) {
        amount = parseFloat(amountStrCln.replace(constants_1.SHEKEL_CURRENCY_SYMBOL, ''));
        currency = constants_1.SHEKEL_CURRENCY;
    }
    else if (amountStrCln.includes(constants_1.DOLLAR_CURRENCY_SYMBOL)) {
        amount = parseFloat(amountStrCln.replace(constants_1.DOLLAR_CURRENCY_SYMBOL, ''));
        currency = constants_1.DOLLAR_CURRENCY;
    }
    else if (amountStrCln.includes(constants_1.EURO_CURRENCY_SYMBOL)) {
        amount = parseFloat(amountStrCln.replace(constants_1.EURO_CURRENCY_SYMBOL, ''));
        currency = constants_1.EURO_CURRENCY;
    }
    else {
        var parts = amountStrCln.split(' ');
        currency = parts[0];
        amount = parseFloat(parts[1]);
    }
    return {
        amount: amount,
        currency: currency
    };
}
function convertTransactions(txns) {
    debug("convert ".concat(txns.length, " raw transactions to official Transaction structure"));
    return txns.map(function (txn) {
        var chargedAmountTuple = getAmountData(txn.chargedAmount || '');
        var txnProcessedDate = (0, moment_1["default"])(txn.date, DATE_FORMAT);
        var result = {
            type: transactions_2.TransactionTypes.Normal,
            status: transactions_2.TransactionStatuses.Completed,
            date: txnProcessedDate.toISOString(),
            processedDate: txnProcessedDate.toISOString(),
            originalAmount: chargedAmountTuple.amount,
            originalCurrency: chargedAmountTuple.currency,
            chargedAmount: chargedAmountTuple.amount,
            chargedCurrency: chargedAmountTuple.currency,
            description: txn.description || '',
            memo: '',
            identifier: txn.identifier
        };
        return result;
    });
}
function fetchTransactions(page, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var defaultStartMoment, startDate, startMoment, accountNumber, balance, rawTransactions, accountTransactions, txns;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, page.goto(CARD_URL)];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(page, '.react-loading.hide', false)];
                case 2:
                    _c.sent();
                    defaultStartMoment = (0, moment_1["default"])().subtract(1, 'years');
                    startDate = options.startDate || defaultStartMoment.toDate();
                    startMoment = moment_1["default"].max(defaultStartMoment, (0, moment_1["default"])(startDate));
                    return [4 /*yield*/, (0, elements_interactions_1.pageEval)(page, '.wallet-details div:nth-of-type(2)', null, function (element) {
                            return element.innerText.replace('מספר כרטיס ', '');
                        })];
                case 3:
                    accountNumber = _c.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.pageEval)(page, '.wallet-details div:nth-of-type(4) > span:nth-of-type(2)', null, function (element) {
                            return element.innerText;
                        })];
                case 4:
                    balance = _c.sent();
                    debug('fetch raw transactions from page');
                    return [4 /*yield*/, (0, elements_interactions_1.pageEvalAll)(page, '.transaction-container, .transaction-component-container', [], function (items) {
                            return (items).map(function (el) {
                                var columns = el.querySelectorAll('.transaction-item > span');
                                if (columns.length === 7) {
                                    return {
                                        date: columns[0].innerText,
                                        identifier: columns[1].innerText,
                                        description: columns[3].innerText,
                                        type: columns[5].innerText,
                                        chargedAmount: columns[6].innerText
                                    };
                                }
                                return null;
                            });
                        })];
                case 5:
                    rawTransactions = _c.sent();
                    debug("fetched ".concat(rawTransactions.length, " raw transactions from page"));
                    accountTransactions = convertTransactions(rawTransactions.filter(function (item) { return !!item; }));
                    debug('filer out old transactions');
                    txns = ((_b = (_a = options.outputData) === null || _a === void 0 ? void 0 : _a.enableTransactionsFilterByDate) !== null && _b !== void 0 ? _b : true) ?
                        (0, transactions_1.filterOldTransactions)(accountTransactions, startMoment, false) :
                        accountTransactions;
                    debug("found ".concat(txns.length, " valid transactions out of ").concat(accountTransactions.length, " transactions for account ending with ").concat(accountNumber.substring(accountNumber.length - 2)));
                    return [2 /*return*/, {
                            accountNumber: accountNumber,
                            balance: getAmountData(balance).amount,
                            txns: txns
                        }];
            }
        });
    });
}
function getPossibleLoginResults() {
    var urls = {};
    urls[base_scraper_with_browser_1.LoginResults.Success] = [SUCCESS_URL];
    urls[base_scraper_with_browser_1.LoginResults.ChangePassword] = []; // TODO
    urls[base_scraper_with_browser_1.LoginResults.InvalidPassword] = []; // TODO
    urls[base_scraper_with_browser_1.LoginResults.UnknownError] = []; // TODO
    return urls;
}
function createLoginFields(credentials) {
    return [
        { selector: '#loginId', value: credentials.id },
        { selector: '#loginPassword', value: credentials.password },
    ];
}
var BeyahadBishvilhaScraper = /** @class */ (function (_super) {
    __extends(BeyahadBishvilhaScraper, _super);
    function BeyahadBishvilhaScraper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BeyahadBishvilhaScraper.prototype.getViewPort = function () {
        return {
            width: 1500,
            height: 800
        };
    };
    BeyahadBishvilhaScraper.prototype.getLoginOptions = function (credentials) {
        var _this = this;
        return {
            loginUrl: LOGIN_URL,
            fields: createLoginFields(credentials),
            submitButtonSelector: function () { return __awaiter(_this, void 0, void 0, function () {
                var button;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.page.$('xpath//button[contains(., "התחבר")]')];
                        case 1:
                            button = _a.sent();
                            if (!button) return [3 /*break*/, 3];
                            return [4 /*yield*/, button.click()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); },
            possibleResults: getPossibleLoginResults()
        };
    };
    BeyahadBishvilhaScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchTransactions(this.page, this.options)];
                    case 1:
                        account = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                accounts: [account]
                            }];
                }
            });
        });
    };
    return BeyahadBishvilhaScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = BeyahadBishvilhaScraper;
