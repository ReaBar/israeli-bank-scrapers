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
var debug_1 = require("../helpers/debug");
var elements_interactions_1 = require("../helpers/elements-interactions");
var fetch_1 = require("../helpers/fetch");
var waiting_1 = require("../helpers/waiting");
var transactions_1 = require("../transactions");
var base_scraper_with_browser_1 = require("./base-scraper-with-browser");
var BASE_URL = 'https://www.behatsdaa.org.il';
var LOGIN_URL = "".concat(BASE_URL, "/login");
var PURCHASE_HISTORY_URL = 'https://back.behatsdaa.org.il/api/purchases/purchaseHistory';
var debug = (0, debug_1.getDebug)('behatsdaa');
function variantToTransaction(variant) {
    // The price is positive, make it negative as it's an expense
    var originalAmount = -variant.customerPrice;
    return {
        type: transactions_1.TransactionTypes.Normal,
        identifier: variant.tTransactionID,
        date: (0, moment_1["default"])(variant.orderDate).format('YYYY-MM-DD'),
        processedDate: (0, moment_1["default"])(variant.orderDate).format('YYYY-MM-DD'),
        originalAmount: originalAmount,
        originalCurrency: 'ILS',
        chargedAmount: originalAmount,
        chargedCurrency: 'ILS',
        description: variant.name,
        status: transactions_1.TransactionStatuses.Completed,
        memo: variant.variantName
    };
}
var BehatsdaaScraper = /** @class */ (function (_super) {
    __extends(BehatsdaaScraper, _super);
    function BehatsdaaScraper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BehatsdaaScraper.prototype.getLoginOptions = function (credentials) {
        var _a;
        var _this = this;
        return {
            loginUrl: LOGIN_URL,
            fields: [
                { selector: '#loginId', value: credentials.id },
                { selector: '#loginPassword', value: credentials.password },
            ],
            checkReadiness: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                (0, elements_interactions_1.waitUntilElementFound)(this.page, '#loginPassword'),
                                (0, elements_interactions_1.waitUntilElementFound)(this.page, '#loginId'),
                            ])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            possibleResults: (_a = {},
                _a[base_scraper_with_browser_1.LoginResults.Success] = ["".concat(BASE_URL, "/")],
                _a[base_scraper_with_browser_1.LoginResults.InvalidPassword] = ['.custom-input-error-label'],
                _a),
            submitButtonSelector: function () { return __awaiter(_this, void 0, void 0, function () {
                var button;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, waiting_1.sleep)(1000)];
                        case 1:
                            _a.sent();
                            debug('Trying to find submit button');
                            return [4 /*yield*/, this.page.$('xpath=//button[contains(., "התחברות")]')];
                        case 2:
                            button = _a.sent();
                            if (!button) return [3 /*break*/, 4];
                            debug('Submit button found');
                            return [4 /*yield*/, button.click()];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            debug('Submit button not found');
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); }
        };
    };
    BehatsdaaScraper.prototype.fetchData = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var token, body, res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () { return window.localStorage.getItem('userToken'); })];
                    case 1:
                        token = _c.sent();
                        if (!token) {
                            debug('Token not found in local storage');
                            return [2 /*return*/, {
                                    success: false,
                                    errorMessage: 'TokenNotFound'
                                }];
                        }
                        body = {
                            FromDate: (0, moment_1["default"])(this.options.startDate).format('YYYY-MM-DDTHH:mm:ss'),
                            ToDate: (0, moment_1["default"])().format('YYYY-MM-DDTHH:mm:ss'),
                            BenefitStatusId: null
                        };
                        debug('Fetching data');
                        return [4 /*yield*/, (0, fetch_1.fetchPostWithinPage)(this.page, PURCHASE_HISTORY_URL, body, {
                                'authorization': "Bearer ".concat(token),
                                'Content-Type': 'application/json',
                                'organizationid': '20'
                            })];
                    case 2:
                        res = _c.sent();
                        debug('Data fetched');
                        if ((res === null || res === void 0 ? void 0 : res.errorDescription) || ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.errorDescription)) {
                            debug('Error fetching data', res.errorDescription || ((_b = res.data) === null || _b === void 0 ? void 0 : _b.errorDescription));
                            return [2 /*return*/, { success: false, errorMessage: res.errorDescription }];
                        }
                        if (!(res === null || res === void 0 ? void 0 : res.data)) {
                            debug('No data found');
                            return [2 /*return*/, { success: false, errorMessage: 'NoData' }];
                        }
                        debug('Data fetched successfully');
                        return [2 /*return*/, {
                                success: true,
                                accounts: [{
                                        accountNumber: res.data.memberId,
                                        txns: res.data.variants.map(variantToTransaction)
                                    }]
                            }];
                }
            });
        });
    };
    return BehatsdaaScraper;
}(base_scraper_with_browser_1.BaseScraperWithBrowser));
exports["default"] = BehatsdaaScraper;
