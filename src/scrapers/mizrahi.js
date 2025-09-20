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
var fetch_1 = require("../helpers/fetch");
var navigation_1 = require("../helpers/navigation");
var transactions_1 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var errors_1 = require("./errors");
var BASE_WEBSITE_URL = 'https://www.mizrahi-tefahot.co.il';
var LOGIN_URL = "".concat(BASE_WEBSITE_URL, "/login/index.html#/auth-page-he");
var BASE_APP_URL = 'https://mto.mizrahi-tefahot.co.il';
var AFTER_LOGIN_BASE_URL = /https:\/\/mto\.mizrahi-tefahot\.co\.il\/OnlineApp\/.*/;
var OSH_PAGE = '/osh/legacy/legacy-Osh-Main';
var TRANSACTIONS_PAGE = '/osh/legacy/root-main-osh-p428New';
var TRANSACTIONS_REQUEST_URLS = [
    "".concat(BASE_APP_URL, "/OnlinePilot/api/SkyOSH/get428Index"),
    "".concat(BASE_APP_URL, "/Online/api/SkyOSH/get428Index"),
];
var PENDING_TRANSACTIONS_PAGE = '/osh/legacy/legacy-Osh-p420';
var PENDING_TRANSACTIONS_IFRAME = 'p420.aspx';
var CHANGE_PASSWORD_URL = /https:\/\/www\.mizrahi-tefahot\.co\.il\/login\/index\.html#\/change-pass/;
var DATE_FORMAT = 'DD/MM/YYYY';
var MAX_ROWS_PER_REQUEST = 10000000000;
var usernameSelector = '#emailDesktopHeb';
var passwordSelector = '#passwordIDDesktopHEB';
var submitButtonSelector = '.form-desktop button';
var invalidPasswordSelector = 'a[href*="https://sc.mizrahi-tefahot.co.il/SCServices/SC/P010.aspx"]';
var afterLoginSelector = '#dropdownBasic';
var loginSpinnerSelector = 'div.ngx-overlay.loading-foreground';
var accountDropDownItemSelector = '#AccountPicker .item';
var pendingTrxIdentifierId = '#ctl00_ContentPlaceHolder2_panel1';
var checkingAccountTabHebrewName = 'עובר ושב';
var checkingAccountTabEnglishName = 'Checking Account';
function createLoginFields(credentials) {
    return [
        { selector: usernameSelector, value: credentials.username },
        { selector: passwordSelector, value: credentials.password },
    ];
}
function isLoggedIn(options) {
    return __awaiter(this, void 0, void 0, function () {
        var oshXPath, oshTab;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(options === null || options === void 0 ? void 0 : options.page)) {
                        return [2 /*return*/, false];
                    }
                    oshXPath = "//a//span[contains(., \"".concat(checkingAccountTabHebrewName, "\") or contains(., \"").concat(checkingAccountTabEnglishName, "\")]");
                    return [4 /*yield*/, options.page.$$("xpath".concat(oshXPath))];
                case 1:
                    oshTab = _a.sent();
                    return [2 /*return*/, oshTab.length > 0];
            }
        });
    });
}
function getPossibleLoginResults(page) {
    var _a;
    var _this = this;
    return _a = {},
        _a[base_scraper_with_browser_1.LoginResults.Success] = [AFTER_LOGIN_BASE_URL, isLoggedIn],
        _a[base_scraper_with_browser_1.LoginResults.InvalidPassword] = [function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.$(invalidPasswordSelector)];
                    case 1: return [2 /*return*/, !!(_a.sent())];
                }
            }); }); }],
        _a[base_scraper_with_browser_1.LoginResults.ChangePassword] = [CHANGE_PASSWORD_URL],
        _a;
}
function getStartMoment(optionsStartDate) {
    var defaultStartMoment = (0, moment_1["default"])().subtract(1, 'years');
    var startDate = optionsStartDate || defaultStartMoment.toDate();
    return moment_1["default"].max(defaultStartMoment, (0, moment_1["default"])(startDate));
}
function createDataFromRequest(request, optionsStartDate) {
    var data = JSON.parse(request.postData() || '{}');
    data.inFromDate = getStartMoment(optionsStartDate).format(DATE_FORMAT);
    data.inToDate = (0, moment_1["default"])().format(DATE_FORMAT);
    data.table.maxRow = MAX_ROWS_PER_REQUEST;
    return data;
}
function createHeadersFromRequest(request) {
    return {
        'mizrahixsrftoken': request.headers().mizrahixsrftoken,
        'Content-Type': request.headers()['content-type']
    };
}
function convertTransactions(txns) {
    return txns.map(function (row) {
        var txnDate = (0, moment_1["default"])(row.MC02PeulaTaaEZ, moment_1["default"].HTML5_FMT.DATETIME_LOCAL_SECONDS)
            .toISOString();
        return {
            type: transactions_1.TransactionTypes.Normal,
            identifier: row.MC02AsmahtaMekoritEZ ? parseInt(row.MC02AsmahtaMekoritEZ, 10) : undefined,
            date: txnDate,
            processedDate: txnDate,
            originalAmount: row.MC02SchumEZ,
            originalCurrency: constants_1.SHEKEL_CURRENCY,
            chargedAmount: row.MC02SchumEZ,
            description: row.MC02TnuaTeurEZ,
            status: transactions_1.TransactionStatuses.Completed
        };
    });
}
function extractPendingTransactions(page) {
    return __awaiter(this, void 0, void 0, function () {
        var pendingTxn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elements_interactions_1.pageEvalAll)(page, 'tr.rgRow', [], function (trs) {
                        return trs.map(function (tr) { return Array.from(tr.querySelectorAll('td'), function (td) { return td.textContent || ''; }); });
                    })];
                case 1:
                    pendingTxn = _a.sent();
                    return [2 /*return*/, pendingTxn.map(function (txn) {
                            var date = (0, moment_1["default"])(txn[0], 'DD/MM/YY').toISOString();
                            var amount = parseInt(txn[3], 10);
                            return {
                                type: transactions_1.TransactionTypes.Normal,
                                date: date,
                                processedDate: date,
                                originalAmount: amount,
                                originalCurrency: constants_1.SHEKEL_CURRENCY,
                                chargedAmount: amount,
                                description: txn[1],
                                status: transactions_1.TransactionStatuses.Pending
                            };
                        })];
            }
        });
    });
}
function postLogin(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.race([
                        (0, elements_interactions_1.waitUntilElementFound)(page, afterLoginSelector),
                        (0, elements_interactions_1.waitUntilElementFound)(page, invalidPasswordSelector),
                        (0, navigation_1.waitForUrl)(page, CHANGE_PASSWORD_URL),
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var MizrahiScraper = /** @class */ (function (_super) {
    __extends(MizrahiScraper, _super);
    function MizrahiScraper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MizrahiScraper.prototype.getLoginOptions = function (credentials) {
        var _this = this;
        return {
            loginUrl: LOGIN_URL,
            fields: createLoginFields(credentials),
            submitButtonSelector: submitButtonSelector,
            checkReadiness: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, (0, elements_interactions_1.waitUntilElementDisappear)(this.page, loginSpinnerSelector)];
            }); }); },
            postAction: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, postLogin(this.page)];
            }); }); },
            possibleResults: getPossibleLoginResults(this.page)
        };
    };
    MizrahiScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var numOfAccounts, results, i, _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.page.$eval('#dropdownBasic, .item', function (el) { return el.click(); })];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, this.page.$$(accountDropDownItemSelector)];
                    case 2:
                        numOfAccounts = (_c.sent()).length;
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 11, , 12]);
                        results = [];
                        i = 0;
                        _c.label = 4;
                    case 4:
                        if (!(i < numOfAccounts)) return [3 /*break*/, 10];
                        if (!(i > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.page.$eval('#dropdownBasic, .item', function (el) { return el.click(); })];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6: return [4 /*yield*/, this.page.$eval("".concat(accountDropDownItemSelector, ":nth-child(").concat(i + 1, ")"), function (el) { return el.click(); })];
                    case 7:
                        _c.sent();
                        _b = (_a = results).push;
                        return [4 /*yield*/, this.fetchAccount()];
                    case 8:
                        _b.apply(_a, [(_c.sent())]);
                        _c.label = 9;
                    case 9:
                        i += 1;
                        return [3 /*break*/, 4];
                    case 10: return [2 /*return*/, {
                            success: true,
                            accounts: results
                        }];
                    case 11:
                        e_1 = _c.sent();
                        return [2 /*return*/, {
                                success: false,
                                errorType: errors_1.ScraperErrorTypes.Generic,
                                errorMessage: e_1.message
                            }];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    MizrahiScraper.prototype.getPendingTransactions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var frame, isPending, pendingTxn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.$eval("a[href*=\"".concat(PENDING_TRANSACTIONS_PAGE, "\"]"), function (el) { return el.click(); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, elements_interactions_1.waitUntilIframeFound)(this.page, function (f) { return f.url().includes(PENDING_TRANSACTIONS_IFRAME); })];
                    case 2:
                        frame = _a.sent();
                        return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(frame, pendingTrxIdentifierId).then(function () { return true; })["catch"](function () { return false; })];
                    case 3:
                        isPending = _a.sent();
                        if (!isPending) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, extractPendingTransactions(frame)];
                    case 4:
                        pendingTxn = _a.sent();
                        return [2 /*return*/, pendingTxn];
                }
            });
        });
    };
    MizrahiScraper.prototype.fetchAccount = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var accountNumberElement, accountNumberHandle, accountNumber, response, relevantRows, oshTxn, startMoment, oshTxnAfterStartDate, pendingTxn, allTxn;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.page.waitForSelector("a[href*=\"".concat(OSH_PAGE, "\"]"))];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.page.$eval("a[href*=\"".concat(OSH_PAGE, "\"]"), function (el) { return el.click(); })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(this.page, "a[href*=\"".concat(TRANSACTIONS_PAGE, "\"]"))];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.page.$eval("a[href*=\"".concat(TRANSACTIONS_PAGE, "\"]"), function (el) { return el.click(); })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.page.$('#dropdownBasic b span')];
                    case 5:
                        accountNumberElement = _b.sent();
                        return [4 /*yield*/, (accountNumberElement === null || accountNumberElement === void 0 ? void 0 : accountNumberElement.getProperty('title'))];
                    case 6:
                        accountNumberHandle = _b.sent();
                        return [4 /*yield*/, (accountNumberHandle === null || accountNumberHandle === void 0 ? void 0 : accountNumberHandle.jsonValue())];
                    case 7:
                        accountNumber = (_b.sent());
                        if (!accountNumber) {
                            throw new Error('Account number not found');
                        }
                        return [4 /*yield*/, Promise.any(TRANSACTIONS_REQUEST_URLS.map(function (url) { return __awaiter(_this, void 0, void 0, function () {
                                var request, data, headers;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.page.waitForRequest(url)];
                                        case 1:
                                            request = _a.sent();
                                            data = createDataFromRequest(request, this.options.startDate);
                                            headers = createHeadersFromRequest(request);
                                            return [2 /*return*/, (0, fetch_1.fetchPostWithinPage)(this.page, url, data, headers)];
                                    }
                                });
                            }); }))];
                    case 8:
                        response = _b.sent();
                        if (!response || response.header.success === false) {
                            throw new Error("Error fetching transaction. Response message: ".concat(response ? response.header.messages[0].text : ''));
                        }
                        relevantRows = response.body.table.rows.filter(function (row) { return row.RecTypeSpecified; });
                        oshTxn = convertTransactions(relevantRows);
                        startMoment = getStartMoment(this.options.startDate);
                        oshTxnAfterStartDate = oshTxn.filter(function (txn) { return (0, moment_1["default"])(txn.date).isSameOrAfter(startMoment); });
                        return [4 /*yield*/, this.getPendingTransactions()];
                    case 9:
                        pendingTxn = _b.sent();
                        allTxn = oshTxnAfterStartDate.concat(pendingTxn);
                        return [2 /*return*/, {
                                accountNumber: accountNumber,
                                txns: allTxn,
                                balance: +((_a = response.body.fields) === null || _a === void 0 ? void 0 : _a.Yitra)
                            }];
                }
            });
        });
    };
    return MizrahiScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = MizrahiScraper;
