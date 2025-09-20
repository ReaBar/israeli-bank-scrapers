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
var debug_1 = require("../helpers/debug");
var elements_interactions_1 = require("../helpers/elements-interactions");
var fetch_1 = require("../helpers/fetch");
var navigation_1 = require("../helpers/navigation");
var storage_1 = require("../helpers/storage");
var transactions_1 = require("../helpers/transactions");
var waiting_1 = require("../helpers/waiting");
var transactions_2 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var LOGIN_URL = 'https://www.cal-online.co.il/';
var TRANSACTIONS_REQUEST_ENDPOINT = 'https://api.cal-online.co.il/Transactions/api/transactionsDetails/getCardTransactionsDetails';
var PENDING_TRANSACTIONS_REQUEST_ENDPOINT = 'https://api.cal-online.co.il/Transactions/api/approvals/getClearanceRequests';
var InvalidPasswordMessage = 'שם המשתמש או הסיסמה שהוזנו שגויים';
var debug = (0, debug_1.getDebug)('visa-cal');
var TrnTypeCode;
(function (TrnTypeCode) {
    TrnTypeCode["regular"] = "5";
    TrnTypeCode["credit"] = "6";
    TrnTypeCode["installments"] = "8";
    TrnTypeCode["standingOrder"] = "9";
})(TrnTypeCode || (TrnTypeCode = {}));
function isPending(transaction) {
    return transaction.debCrdDate === undefined; // an arbitrary field that only appears in a completed transaction
}
function isCardTransactionDetails(result) {
    return result.result !== undefined;
}
function isCardPendingTransactionDetails(result) {
    return result.result !== undefined;
}
function getLoginFrame(page) {
    return __awaiter(this, void 0, void 0, function () {
        var frame;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    frame = null;
                    debug('wait until login frame found');
                    return [4 /*yield*/, (0, waiting_1.waitUntil)(function () {
                            frame = page
                                .frames()
                                .find(function (f) { return f.url().includes('connect'); }) || null;
                            return Promise.resolve(!!frame);
                        }, 'wait for iframe with login form', 10000, 1000)];
                case 1:
                    _a.sent();
                    if (!frame) {
                        debug('failed to find login frame for 10 seconds');
                        throw new Error('failed to extract login iframe');
                    }
                    return [2 /*return*/, frame];
            }
        });
    });
}
function hasInvalidPasswordError(page) {
    return __awaiter(this, void 0, void 0, function () {
        var frame, errorFound, errorMessage, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getLoginFrame(page)];
                case 1:
                    frame = _b.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.elementPresentOnPage)(frame, 'div.general-error > div')];
                case 2:
                    errorFound = _b.sent();
                    if (!errorFound) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, elements_interactions_1.pageEval)(frame, 'div.general-error > div', '', function (item) {
                            return item.innerText;
                        })];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = '';
                    _b.label = 5;
                case 5:
                    errorMessage = _a;
                    return [2 /*return*/, errorMessage === InvalidPasswordMessage];
            }
        });
    });
}
function hasChangePasswordForm(page) {
    return __awaiter(this, void 0, void 0, function () {
        var frame, errorFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getLoginFrame(page)];
                case 1:
                    frame = _a.sent();
                    return [4 /*yield*/, (0, elements_interactions_1.elementPresentOnPage)(frame, '.change-password-subtitle')];
                case 2:
                    errorFound = _a.sent();
                    return [2 /*return*/, errorFound];
            }
        });
    });
}
function getPossibleLoginResults() {
    var _a;
    var _this = this;
    debug('return possible login results');
    var urls = (_a = {},
        _a[base_scraper_with_browser_1.LoginResults.Success] = [/dashboard/i],
        _a[base_scraper_with_browser_1.LoginResults.InvalidPassword] = [function (options) { return __awaiter(_this, void 0, void 0, function () {
                var page;
                return __generator(this, function (_a) {
                    page = options === null || options === void 0 ? void 0 : options.page;
                    if (!page) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, hasInvalidPasswordError(page)];
                });
            }); }],
        // [LoginResults.AccountBlocked]: [], // TODO add when reaching this scenario
        _a[base_scraper_with_browser_1.LoginResults.ChangePassword] = [function (options) { return __awaiter(_this, void 0, void 0, function () {
                var page;
                return __generator(this, function (_a) {
                    page = options === null || options === void 0 ? void 0 : options.page;
                    if (!page) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, hasChangePasswordForm(page)];
                });
            }); }],
        _a);
    return urls;
}
function createLoginFields(credentials) {
    debug('create login fields for username and password');
    return [
        { selector: '[formcontrolname="userName"]', value: credentials.username },
        { selector: '[formcontrolname="password"]', value: credentials.password },
    ];
}
function convertParsedDataToTransactions(data, pendingData) {
    var pendingTransactions = (pendingData === null || pendingData === void 0 ? void 0 : pendingData.result) ?
        pendingData.result.cardsList.flatMap(function (card) { return card.authDetalisList; }) :
        [];
    var bankAccounts = data
        .flatMap(function (monthData) { return monthData.result.bankAccounts; });
    var regularDebitDays = bankAccounts
        .flatMap(function (accounts) { return accounts.debitDates; });
    var immediateDebitDays = bankAccounts
        .flatMap(function (accounts) { return accounts.immidiateDebits.debitDays; });
    var completedTransactions = __spreadArray(__spreadArray([], regularDebitDays, true), immediateDebitDays, true).flatMap(function (debitDate) { return debitDate.transactions; });
    var all = __spreadArray(__spreadArray([], pendingTransactions, true), completedTransactions, true);
    return all.map(function (transaction) {
        var numOfPayments = isPending(transaction) ? transaction.numberOfPayments : transaction.numOfPayments;
        var installments = numOfPayments ?
            {
                number: isPending(transaction) ? 1 : transaction.curPaymentNum,
                total: numOfPayments
            } :
            undefined;
        var date = (0, moment_1["default"])(transaction.trnPurchaseDate);
        var chargedAmount = isPending(transaction) ? transaction.trnAmt * (-1) : transaction.amtBeforeConvAndIndex * (-1);
        var originalAmount = transaction.trnAmt * (-1);
        if (transaction.trnTypeCode === TrnTypeCode.credit) {
            chargedAmount = isPending(transaction) ? transaction.trnAmt : transaction.amtBeforeConvAndIndex;
            originalAmount = transaction.trnAmt;
        }
        var result = {
            identifier: !isPending(transaction) ? transaction.trnIntId : undefined,
            type: [TrnTypeCode.regular, TrnTypeCode.standingOrder].includes(transaction.trnTypeCode) ?
                transactions_2.TransactionTypes.Normal :
                transactions_2.TransactionTypes.Installments,
            status: isPending(transaction) ? transactions_2.TransactionStatuses.Pending : transactions_2.TransactionStatuses.Completed,
            date: installments ?
                date.add(installments.number - 1, 'month').toISOString() :
                date.toISOString(),
            processedDate: isPending(transaction) ? date.toISOString() : new Date(transaction.debCrdDate).toISOString(),
            originalAmount: originalAmount,
            originalCurrency: transaction.trnCurrencySymbol,
            chargedAmount: chargedAmount,
            chargedCurrency: !isPending(transaction) ? transaction.debCrdCurrencySymbol : undefined,
            description: transaction.merchantName,
            memo: transaction.transTypeCommentDetails.toString(),
            category: transaction.branchCodeDesc
        };
        if (installments) {
            result.installments = installments;
        }
        return result;
    });
}
var VisaCalScraper = /** @class */ (function (_super) {
    __extends(VisaCalScraper, _super);
    function VisaCalScraper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openLoginPopup = function () { return __awaiter(_this, void 0, void 0, function () {
            var frame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debug('open login popup, wait until login button available');
                        return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(this.page, '#ccLoginDesktopBtn', true)];
                    case 1:
                        _a.sent();
                        debug('click on the login button');
                        return [4 /*yield*/, (0, elements_interactions_1.clickButton)(this.page, '#ccLoginDesktopBtn')];
                    case 2:
                        _a.sent();
                        debug('get the frame that holds the login');
                        return [4 /*yield*/, getLoginFrame(this.page)];
                    case 3:
                        frame = _a.sent();
                        debug('wait until the password login tab header is available');
                        return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(frame, '#regular-login')];
                    case 4:
                        _a.sent();
                        debug('navigate to the password login tab');
                        return [4 /*yield*/, (0, elements_interactions_1.clickButton)(frame, '#regular-login')];
                    case 5:
                        _a.sent();
                        debug('wait until the password login tab is active');
                        return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(frame, 'regular-login')];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, frame];
                }
            });
        }); };
        return _this;
    }
    VisaCalScraper.prototype.getCards = function () {
        return __awaiter(this, void 0, void 0, function () {
            var initData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, waiting_1.waitUntil)(function () { return (0, storage_1.getFromSessionStorage)(_this.page, 'init'); }, 'get init data in session storage', 10000, 1000)];
                    case 1:
                        initData = _a.sent();
                        if (!initData) {
                            throw new Error('could not find \'init\' data in session storage');
                        }
                        return [2 /*return*/, initData === null || initData === void 0 ? void 0 : initData.result.cards.map(function (_a) {
                                var cardUniqueId = _a.cardUniqueId, last4Digits = _a.last4Digits;
                                return ({ cardUniqueId: cardUniqueId, last4Digits: last4Digits });
                            })];
                }
            });
        });
    };
    VisaCalScraper.prototype.getAuthorizationHeader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var authModule;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, storage_1.getFromSessionStorage)(this.page, 'auth-module')];
                    case 1:
                        authModule = _a.sent();
                        if (!authModule) {
                            throw new Error('could not find \'auth-module\' in session storage');
                        }
                        return [2 /*return*/, "CALAuthScheme ".concat(authModule.auth.calConnectToken)];
                }
            });
        });
    };
    VisaCalScraper.prototype.getXSiteId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /*
                  I don't know if the constant below will change in the feature.
                  If so, use the next code:
            
                  return this.page.evaluate(() => new Ut().xSiteId);
            
                  To get the classname search for 'xSiteId' in the page source
                  class Ut {
                    constructor(_e, on, yn) {
                        this.store = _e,
                        this.config = on,
                        this.eventBusService = yn,
                        this.xSiteId = "09031987-273E-2311-906C-8AF85B17C8D9",
                */
                return [2 /*return*/, Promise.resolve('09031987-273E-2311-906C-8AF85B17C8D9')];
            });
        });
    };
    VisaCalScraper.prototype.getLoginOptions = function (credentials) {
        var _this = this;
        return {
            loginUrl: "".concat(LOGIN_URL),
            fields: createLoginFields(credentials),
            submitButtonSelector: 'button[type="submit"]',
            possibleResults: getPossibleLoginResults(),
            checkReadiness: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (0, elements_interactions_1.waitUntilElementFound)(this.page, '#ccLoginDesktopBtn')];
            }); }); },
            preAction: this.openLoginPopup,
            postAction: function () { return __awaiter(_this, void 0, void 0, function () {
                var currentUrl, e_1, currentUrl, requiresChangePassword;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 8]);
                            return [4 /*yield*/, (0, navigation_1.waitForNavigation)(this.page)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, navigation_1.getCurrentUrl)(this.page)];
                        case 2:
                            currentUrl = _a.sent();
                            if (!currentUrl.endsWith('site-tutorial')) return [3 /*break*/, 4];
                            return [4 /*yield*/, (0, elements_interactions_1.clickButton)(this.page, 'button.btn-close')];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [3 /*break*/, 8];
                        case 5:
                            e_1 = _a.sent();
                            return [4 /*yield*/, (0, navigation_1.getCurrentUrl)(this.page)];
                        case 6:
                            currentUrl = _a.sent();
                            if (currentUrl.endsWith('dashboard'))
                                return [2 /*return*/];
                            return [4 /*yield*/, hasChangePasswordForm(this.page)];
                        case 7:
                            requiresChangePassword = _a.sent();
                            if (requiresChangePassword)
                                return [2 /*return*/];
                            throw e_1;
                        case 8: return [2 /*return*/];
                    }
                });
            }); },
            userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
        };
    };
    VisaCalScraper.prototype.fetchData = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var defaultStartMoment, startDate, startMoment, Authorization, cards, xSiteId, futureMonthsToScrape, accounts;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        defaultStartMoment = (0, moment_1["default"])().subtract(1, 'years').subtract(6, 'months').add(1, 'day');
                        startDate = this.options.startDate || defaultStartMoment.toDate();
                        startMoment = moment_1["default"].max(defaultStartMoment, (0, moment_1["default"])(startDate));
                        debug("fetch transactions starting ".concat(startMoment.format()));
                        return [4 /*yield*/, this.getAuthorizationHeader()];
                    case 1:
                        Authorization = _b.sent();
                        return [4 /*yield*/, this.getCards()];
                    case 2:
                        cards = _b.sent();
                        return [4 /*yield*/, this.getXSiteId()];
                    case 3:
                        xSiteId = _b.sent();
                        futureMonthsToScrape = (_a = this.options.futureMonthsToScrape) !== null && _a !== void 0 ? _a : 1;
                        return [4 /*yield*/, Promise.all(cards.map(function (card) { return __awaiter(_this, void 0, void 0, function () {
                                var finalMonthToFetchMoment, months, allMonthsData, pendingData, i, month, monthData, transactions, txns;
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            finalMonthToFetchMoment = (0, moment_1["default"])().add(futureMonthsToScrape, 'month');
                                            months = finalMonthToFetchMoment.diff(startMoment, 'months');
                                            allMonthsData = [];
                                            debug("fetch pending transactions for card ".concat(card.cardUniqueId));
                                            return [4 /*yield*/, (0, fetch_1.fetchPostWithinPage)(this.page, PENDING_TRANSACTIONS_REQUEST_ENDPOINT, { cardUniqueIDArray: [card.cardUniqueId] }, {
                                                    Authorization: Authorization,
                                                    'X-Site-Id': xSiteId,
                                                    'Content-Type': 'application/json'
                                                })];
                                        case 1:
                                            pendingData = _c.sent();
                                            debug("fetch completed transactions for card ".concat(card.cardUniqueId));
                                            i = 0;
                                            _c.label = 2;
                                        case 2:
                                            if (!(i <= months)) return [3 /*break*/, 5];
                                            month = finalMonthToFetchMoment.clone().subtract(i, 'months');
                                            return [4 /*yield*/, (0, fetch_1.fetchPostWithinPage)(this.page, TRANSACTIONS_REQUEST_ENDPOINT, { cardUniqueId: card.cardUniqueId, month: month.format('M'), year: month.format('YYYY') }, {
                                                    Authorization: Authorization,
                                                    'X-Site-Id': xSiteId,
                                                    'Content-Type': 'application/json'
                                                })];
                                        case 3:
                                            monthData = _c.sent();
                                            if ((monthData === null || monthData === void 0 ? void 0 : monthData.statusCode) !== 1)
                                                throw new Error("failed to fetch transactions for card ".concat(card.last4Digits, ". Message: ").concat((monthData === null || monthData === void 0 ? void 0 : monthData.title) || ''));
                                            if (!isCardTransactionDetails(monthData)) {
                                                throw new Error('monthData is not of type CardTransactionDetails');
                                            }
                                            allMonthsData.push(monthData);
                                            _c.label = 4;
                                        case 4:
                                            i += 1;
                                            return [3 /*break*/, 2];
                                        case 5:
                                            if ((pendingData === null || pendingData === void 0 ? void 0 : pendingData.statusCode) !== 1 && (pendingData === null || pendingData === void 0 ? void 0 : pendingData.statusCode) !== 96) {
                                                debug("failed to fetch pending transactions for card ".concat(card.last4Digits, ". Message: ").concat((pendingData === null || pendingData === void 0 ? void 0 : pendingData.title) || ''));
                                                pendingData = null;
                                            }
                                            else if (!isCardPendingTransactionDetails(pendingData)) {
                                                debug('pendingData is not of type CardTransactionDetails');
                                                pendingData = null;
                                            }
                                            transactions = convertParsedDataToTransactions(allMonthsData, pendingData);
                                            debug('filer out old transactions');
                                            txns = ((_b = (_a = this.options.outputData) === null || _a === void 0 ? void 0 : _a.enableTransactionsFilterByDate) !== null && _b !== void 0 ? _b : true) ?
                                                (0, transactions_1.filterOldTransactions)(transactions, (0, moment_1["default"])(startDate), this.options.combineInstallments || false) :
                                                transactions;
                                            return [2 /*return*/, {
                                                    txns: txns,
                                                    accountNumber: card.last4Digits
                                                }];
                                    }
                                });
                            }); }))];
                    case 4:
                        accounts = _b.sent();
                        debug('return the scraped accounts');
                        debug(JSON.stringify(accounts, null, 2));
                        return [2 /*return*/, {
                                success: true,
                                accounts: accounts
                            }];
                }
            });
        });
    };
    return VisaCalScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = VisaCalScraper;
