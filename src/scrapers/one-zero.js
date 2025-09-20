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
var moment_1 = require("moment/moment");
var debug_1 = require("../helpers/debug");
var fetch_1 = require("../helpers/fetch");
var transactions_1 = require("../transactions");
var base_scraper_1 = require("./base-scraper");
var errors_1 = require("./errors");
var one_zero_queries_1 = require("./one-zero-queries");
var HEBREW_WORDS_REGEX = /[\u0590-\u05FF][\u0590-\u05FF"'\-_ /\\]*[\u0590-\u05FF]/g;
var debug = (0, debug_1.getDebug)('one-zero');
var IDENTITY_SERVER_URL = 'https://identity.tfd-bank.com/v1/';
var GRAPHQL_API_URL = 'https://mobile.tfd-bank.com/mobile-graph/graphql';
var OneZeroScraper = /** @class */ (function (_super) {
    __extends(OneZeroScraper, _super);
    function OneZeroScraper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OneZeroScraper.prototype.triggerTwoFactorAuth = function (phoneNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var deviceTokenResponse, deviceToken, otpPrepareResponse, otpContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!phoneNumber.startsWith('+')) {
                            return [2 /*return*/, (0, errors_1.createGenericError)('A full international phone number starting with + and a three digit country code is required')];
                        }
                        debug('Fetching device token');
                        return [4 /*yield*/, (0, fetch_1.fetchPost)("".concat(IDENTITY_SERVER_URL, "/devices/token"), {
                                extClientId: 'mobile',
                                os: 'Android'
                            })];
                    case 1:
                        deviceTokenResponse = _a.sent();
                        deviceToken = deviceTokenResponse.resultData.deviceToken;
                        debug("Sending OTP to phone number ".concat(phoneNumber));
                        return [4 /*yield*/, (0, fetch_1.fetchPost)("".concat(IDENTITY_SERVER_URL, "/otp/prepare"), {
                                factorValue: phoneNumber,
                                deviceToken: deviceToken,
                                otpChannel: 'SMS_OTP'
                            })];
                    case 2:
                        otpPrepareResponse = _a.sent();
                        otpContext = otpPrepareResponse.resultData.otpContext;
                        this.otpContext = otpContext;
                        return [2 /*return*/, {
                                success: true
                            }];
                }
            });
        });
    };
    OneZeroScraper.prototype.getLongTermTwoFactorToken = function (otpCode) {
        return __awaiter(this, void 0, void 0, function () {
            var otpVerifyResponse, otpToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.otpContext) {
                            return [2 /*return*/, (0, errors_1.createGenericError)('triggerOtp was not called before calling getPermenantOtpToken()')];
                        }
                        debug('Requesting OTP token');
                        return [4 /*yield*/, (0, fetch_1.fetchPost)("".concat(IDENTITY_SERVER_URL, "/otp/verify"), {
                                otpContext: this.otpContext,
                                otpCode: otpCode
                            })];
                    case 1:
                        otpVerifyResponse = _a.sent();
                        otpToken = otpVerifyResponse.resultData.otpToken;
                        return [2 /*return*/, { success: true, longTermTwoFactorAuthToken: otpToken }];
                }
            });
        });
    };
    OneZeroScraper.prototype.resolveOtpToken = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var triggerResult, otpCode, otpTokenResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ('otpLongTermToken' in credentials) {
                            if (!credentials.otpLongTermToken) {
                                return [2 /*return*/, (0, errors_1.createGenericError)('Invalid otpLongTermToken')];
                            }
                            return [2 /*return*/, { success: true, longTermTwoFactorAuthToken: credentials.otpLongTermToken }];
                        }
                        if (!credentials.otpCodeRetriever) {
                            return [2 /*return*/, {
                                    success: false,
                                    errorType: errors_1.ScraperErrorTypes.TwoFactorRetrieverMissing,
                                    errorMessage: 'otpCodeRetriever is required when otpPermanentToken is not provided'
                                }];
                        }
                        if (!credentials.phoneNumber) {
                            return [2 /*return*/, (0, errors_1.createGenericError)('phoneNumber is required when providing a otpCodeRetriever callback')];
                        }
                        debug('Triggering user supplied otpCodeRetriever callback');
                        return [4 /*yield*/, this.triggerTwoFactorAuth(credentials.phoneNumber)];
                    case 1:
                        triggerResult = _a.sent();
                        if (!triggerResult.success) {
                            return [2 /*return*/, triggerResult];
                        }
                        return [4 /*yield*/, credentials.otpCodeRetriever()];
                    case 2:
                        otpCode = _a.sent();
                        return [4 /*yield*/, this.getLongTermTwoFactorToken(otpCode)];
                    case 3:
                        otpTokenResult = _a.sent();
                        if (!otpTokenResult.success) {
                            return [2 /*return*/, otpTokenResult];
                        }
                        return [2 /*return*/, { success: true, longTermTwoFactorAuthToken: otpTokenResult.longTermTwoFactorAuthToken }];
                }
            });
        });
    };
    OneZeroScraper.prototype.login = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var otpTokenResult, getIdTokenResponse, idToken, getSessionTokenResponse, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolveOtpToken(credentials)];
                    case 1:
                        otpTokenResult = _a.sent();
                        if (!otpTokenResult.success) {
                            return [2 /*return*/, otpTokenResult];
                        }
                        debug('Requesting id token');
                        return [4 /*yield*/, (0, fetch_1.fetchPost)("".concat(IDENTITY_SERVER_URL, "/getIdToken"), {
                                otpSmsToken: otpTokenResult.longTermTwoFactorAuthToken,
                                email: credentials.email,
                                pass: credentials.password,
                                pinCode: ''
                            })];
                    case 2:
                        getIdTokenResponse = _a.sent();
                        idToken = getIdTokenResponse.resultData.idToken;
                        debug('Requesting session token');
                        return [4 /*yield*/, (0, fetch_1.fetchPost)("".concat(IDENTITY_SERVER_URL, "/sessions/token"), {
                                idToken: idToken,
                                pass: credentials.password
                            })];
                    case 3:
                        getSessionTokenResponse = _a.sent();
                        accessToken = getSessionTokenResponse.resultData.accessToken;
                        this.accessToken = accessToken;
                        return [2 /*return*/, {
                                success: true,
                                persistentOtpToken: otpTokenResult.longTermTwoFactorAuthToken
                            }];
                }
            });
        });
    };
    OneZeroScraper.prototype.fetchPortfolioMovements = function (portfolio, startDate) {
        return __awaiter(this, void 0, void 0, function () {
            var account, cursor, movements, _a, newMovements, pagination, matchingMovements;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        account = portfolio.accounts[0];
                        cursor = null;
                        movements = [];
                        _b.label = 1;
                    case 1:
                        if (!(!movements.length || new Date(movements[0].movementTimestamp) >= startDate)) return [3 /*break*/, 3];
                        debug("Fetching transactions for account ".concat(portfolio.portfolioNum, "..."));
                        return [4 /*yield*/, (0, fetch_1.fetchGraphql)(GRAPHQL_API_URL, one_zero_queries_1.GET_MOVEMENTS, {
                                portfolioId: portfolio.portfolioId,
                                accountId: account.accountId,
                                language: 'HEBREW',
                                pagination: {
                                    cursor: cursor,
                                    limit: 50
                                }
                            }, { authorization: "Bearer ".concat(this.accessToken) })];
                    case 2:
                        _a = (_b.sent()).movements, newMovements = _a.movements, pagination = _a.pagination;
                        movements.unshift.apply(movements, newMovements);
                        cursor = pagination.cursor;
                        if (!pagination.hasMore) {
                            return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 1];
                    case 3:
                        movements.sort(function (x, y) { return new Date(x.movementTimestamp).valueOf() - new Date(y.movementTimestamp).valueOf(); });
                        matchingMovements = movements.filter(function (movement) { return new Date(movement.movementTimestamp) >= startDate; });
                        return [2 /*return*/, {
                                accountNumber: portfolio.portfolioNum,
                                balance: !movements.length ? 0 : parseFloat(movements[movements.length - 1].runningBalance),
                                txns: matchingMovements.map(function (movement) {
                                    var _a, _b, _c;
                                    var hasInstallments = (_c = (_b = (_a = movement.transaction) === null || _a === void 0 ? void 0 : _a.enrichment) === null || _b === void 0 ? void 0 : _b.recurrences) === null || _c === void 0 ? void 0 : _c.some(function (x) { return x.isRecurrent; });
                                    var modifier = movement.creditDebit === 'DEBIT' ? -1 : 1;
                                    return ({
                                        identifier: movement.movementId,
                                        date: movement.valueDate,
                                        chargedAmount: (+movement.movementAmount) * modifier,
                                        chargedCurrency: movement.movementCurrency,
                                        originalAmount: (+movement.movementAmount) * modifier,
                                        originalCurrency: movement.movementCurrency,
                                        description: _this.sanitizeHebrew(movement.description),
                                        processedDate: movement.movementTimestamp,
                                        status: transactions_1.TransactionStatuses.Completed,
                                        type: hasInstallments ? transactions_1.TransactionTypes.Installments : transactions_1.TransactionTypes.Normal
                                    });
                                })
                            }];
                }
            });
        });
    };
    /**
     * one zero hebrew strings are reversed with a unicode control character that forces display in LTR order
     * We need to remove the unicode control character, and then reverse hebrew substrings inside the string
     */
    OneZeroScraper.prototype.sanitizeHebrew = function (text) {
        if (!text.includes('\u202d')) {
            return text.trim();
        }
        var plainString = text.replace(/\u202d/gi, '').trim();
        var hebrewSubStringsRanges = __spreadArray([], plainString.matchAll(HEBREW_WORDS_REGEX), true);
        var rangesToReverse = hebrewSubStringsRanges.map(function (str) { return ({ start: str.index, end: str.index + str[0].length }); });
        var out = [];
        var index = 0;
        for (var _i = 0, rangesToReverse_1 = rangesToReverse; _i < rangesToReverse_1.length; _i++) {
            var _a = rangesToReverse_1[_i], start = _a.start, end = _a.end;
            out.push.apply(out, plainString.substring(index, start));
            index += (start - index);
            var reversed = __spreadArray([], plainString.substring(start, end), true).reverse();
            out.push.apply(out, reversed);
            index += (end - start);
        }
        out.push.apply(out, plainString.substring(index, plainString.length));
        return out.join('');
    };
    OneZeroScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultStartMoment, startDate, startMoment, result, portfolios;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.accessToken) {
                            return [2 /*return*/, (0, errors_1.createGenericError)('login() was not called')];
                        }
                        defaultStartMoment = (0, moment_1["default"])().subtract(1, 'years').add(1, 'day');
                        startDate = this.options.startDate || defaultStartMoment.toDate();
                        startMoment = moment_1["default"].max(defaultStartMoment, (0, moment_1["default"])(startDate));
                        debug('Fetching account list');
                        return [4 /*yield*/, (0, fetch_1.fetchGraphql)(GRAPHQL_API_URL, one_zero_queries_1.GET_CUSTOMER, {}, { authorization: "Bearer ".concat(this.accessToken) })];
                    case 1:
                        result = _b.sent();
                        portfolios = result.customer.flatMap(function (customer) { return (customer.portfolios || []); });
                        _a = {
                            success: true
                        };
                        return [4 /*yield*/, Promise.all(portfolios.map(function (portfolio) { return _this.fetchPortfolioMovements(portfolio, startMoment.toDate()); }))];
                    case 2: return [2 /*return*/, (_a.accounts = _b.sent(),
                            _a)];
                }
            });
        });
    };
    return OneZeroScraper;
}(base_scraper_1.BaseScraper));
exports["default"] = OneZeroScraper;
