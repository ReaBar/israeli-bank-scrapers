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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.BaseScraperWithBrowser = exports.LoginResults = void 0;
var puppeteer_1 = require("puppeteer");
var definitions_1 = require("../definitions");
var debug_1 = require("../helpers/debug");
var elements_interactions_1 = require("../helpers/elements-interactions");
var navigation_1 = require("../helpers/navigation");
var base_scraper_1 = require("./base-scraper");
var errors_1 = require("./errors");
var VIEWPORT_WIDTH = 1024;
var VIEWPORT_HEIGHT = 768;
var OK_STATUS = 200;
var debug = (0, debug_1.getDebug)('base-scraper-with-browser');
var LoginBaseResults;
(function (LoginBaseResults) {
    LoginBaseResults["Success"] = "SUCCESS";
    LoginBaseResults["UnknownError"] = "UNKNOWN_ERROR";
})(LoginBaseResults || (LoginBaseResults = {}));
var Timeout = errors_1.ScraperErrorTypes.Timeout, Generic = errors_1.ScraperErrorTypes.Generic, General = errors_1.ScraperErrorTypes.General, rest = __rest(errors_1.ScraperErrorTypes, ["Timeout", "Generic", "General"]);
exports.LoginResults = __assign(__assign({}, rest), LoginBaseResults);
function getKeyByValue(object, value, page) {
    return __awaiter(this, void 0, void 0, function () {
        var keys, _i, keys_1, key, conditions, _a, conditions_1, condition, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    keys = Object.keys(object);
                    _i = 0, keys_1 = keys;
                    _b.label = 1;
                case 1:
                    if (!(_i < keys_1.length)) return [3 /*break*/, 9];
                    key = keys_1[_i];
                    conditions = object[key];
                    _a = 0, conditions_1 = conditions;
                    _b.label = 2;
                case 2:
                    if (!(_a < conditions_1.length)) return [3 /*break*/, 8];
                    condition = conditions_1[_a];
                    result = false;
                    if (!(condition instanceof RegExp)) return [3 /*break*/, 3];
                    result = condition.test(value);
                    return [3 /*break*/, 6];
                case 3:
                    if (!(typeof condition === 'function')) return [3 /*break*/, 5];
                    return [4 /*yield*/, condition({ page: page, value: value })];
                case 4:
                    result = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    result = value.toLowerCase().includes(condition.toLowerCase());
                    _b.label = 6;
                case 6:
                    if (result) {
                        // @ts-ignore
                        return [2 /*return*/, Promise.resolve(key)];
                    }
                    _b.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 2];
                case 8:
                    _i++;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/, Promise.resolve(exports.LoginResults.UnknownError)];
            }
        });
    });
}
function createGeneralError() {
    return {
        success: false,
        errorType: errors_1.ScraperErrorTypes.General
    };
}
var BaseScraperWithBrowser = /** @class */ (function (_super) {
    __extends(BaseScraperWithBrowser, _super);
    function BaseScraperWithBrowser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cleanups = [];
        return _this;
    }
    BaseScraperWithBrowser.prototype.getViewPort = function () {
        return {
            width: VIEWPORT_WIDTH,
            height: VIEWPORT_HEIGHT
        };
    };
    BaseScraperWithBrowser.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, viewport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.initialize.call(this)];
                    case 1:
                        _a.sent();
                        debug('initialize scraper');
                        this.emitProgress(definitions_1.ScraperProgressTypes.Initializing);
                        return [4 /*yield*/, this.initializePage()];
                    case 2:
                        page = _a.sent();
                        return [4 /*yield*/, page.setCacheEnabled(false)];
                    case 3:
                        _a.sent(); // Clear cache and avoid 300's response status
                        if (!page) {
                            debug('failed to initiate a browser page, exit');
                            return [2 /*return*/];
                        }
                        this.page = page;
                        this.cleanups.push(function () { return page.close(); });
                        if (this.options.defaultTimeout) {
                            this.page.setDefaultTimeout(this.options.defaultTimeout);
                        }
                        if (!this.options.preparePage) return [3 /*break*/, 5];
                        debug("execute 'preparePage' interceptor provided in options");
                        return [4 /*yield*/, this.options.preparePage(this.page)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        viewport = this.getViewPort();
                        debug("set viewport to width ".concat(viewport.width, ", height ").concat(viewport.height));
                        return [4 /*yield*/, this.page.setViewport({
                                width: viewport.width,
                                height: viewport.height
                            })];
                    case 6:
                        _a.sent();
                        this.page.on('requestfailed', function (request) {
                            var _a;
                            debug('Request failed: %s %s', (_a = request.failure()) === null || _a === void 0 ? void 0 : _a.errorText, request.url());
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseScraperWithBrowser.prototype.initializePage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var browser_1, _a, timeout, args, executablePath, showBrowser, headless, browser;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        debug('initialize browser page');
                        if ('browserContext' in this.options) {
                            debug('Using the browser context provided in options');
                            return [2 /*return*/, this.options.browserContext.newPage()];
                        }
                        if ('browser' in this.options) {
                            debug('Using the browser instance provided in options');
                            browser_1 = this.options.browser;
                            /**
                             * For backward compatibility, we will close the browser even if we didn't create it
                             */
                            if (!this.options.skipCloseBrowser) {
                                this.cleanups.push(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                debug('closing the browser');
                                                return [4 /*yield*/, browser_1.close()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }
                            return [2 /*return*/, browser_1.newPage()];
                        }
                        _a = this.options, timeout = _a.timeout, args = _a.args, executablePath = _a.executablePath, showBrowser = _a.showBrowser;
                        headless = !showBrowser;
                        debug("launch a browser with headless mode = ".concat(headless));
                        return [4 /*yield*/, puppeteer_1["default"].launch({
                                env: this.options.verbose ? __assign({ DEBUG: '*' }, process.env) : undefined,
                                headless: headless,
                                executablePath: executablePath,
                                args: args,
                                timeout: timeout
                            })];
                    case 1:
                        browser = _b.sent();
                        this.cleanups.push(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        debug('closing the browser');
                                        return [4 /*yield*/, browser.close()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        if (!this.options.prepareBrowser) return [3 /*break*/, 3];
                        debug("execute 'prepareBrowser' interceptor provided in options");
                        return [4 /*yield*/, this.options.prepareBrowser(browser)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        debug('create a new browser page');
                        return [2 /*return*/, browser.newPage()];
                }
            });
        });
    };
    BaseScraperWithBrowser.prototype.navigateTo = function (url, page, timeout, waitUntil) {
        if (waitUntil === void 0) { waitUntil = 'load'; }
        return __awaiter(this, void 0, void 0, function () {
            var pageToUse, options, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageToUse = page || this.page;
                        if (!pageToUse) {
                            return [2 /*return*/];
                        }
                        options = __assign(__assign({}, (timeout === null ? null : { timeout: timeout })), { waitUntil: waitUntil });
                        return [4 /*yield*/, pageToUse.goto(url, options)];
                    case 1:
                        response = _a.sent();
                        // note: response will be null when navigating to same url while changing the hash part. the condition below will always accept null as valid result.
                        if (response !== null && (response === undefined || response.status() !== OK_STATUS)) {
                            throw new Error("Error while trying to navigate to url ".concat(url));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    BaseScraperWithBrowser.prototype.getLoginOptions = function (_credentials) {
        throw new Error("getLoginOptions() is not created in ".concat(this.options.companyId));
    };
    BaseScraperWithBrowser.prototype.fillInputs = function (pageOrFrame, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var modified, input;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modified = __spreadArray([], fields, true);
                        input = modified.shift();
                        if (!input) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (0, elements_interactions_1.fillInput)(pageOrFrame, input.selector, input.value)];
                    case 1:
                        _a.sent();
                        if (!modified.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fillInputs(pageOrFrame, modified)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseScraperWithBrowser.prototype.login = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var loginOptions, loginFrameOrPage, current, loginResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!credentials || !this.page) {
                            return [2 /*return*/, createGeneralError()];
                        }
                        debug('execute login process');
                        loginOptions = this.getLoginOptions(credentials);
                        if (!loginOptions.userAgent) return [3 /*break*/, 2];
                        debug('set custom user agent provided in options');
                        return [4 /*yield*/, this.page.setUserAgent(loginOptions.userAgent)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        debug('navigate to login url');
                        return [4 /*yield*/, this.navigateTo(loginOptions.loginUrl, undefined, undefined, loginOptions.waitUntil)];
                    case 3:
                        _a.sent();
                        if (!loginOptions.checkReadiness) return [3 /*break*/, 5];
                        debug("execute 'checkReadiness' interceptor provided in login options");
                        return [4 /*yield*/, loginOptions.checkReadiness()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(typeof loginOptions.submitButtonSelector === 'string')) return [3 /*break*/, 7];
                        debug('wait until submit button is available');
                        return [4 /*yield*/, (0, elements_interactions_1.waitUntilElementFound)(this.page, loginOptions.submitButtonSelector)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        loginFrameOrPage = this.page;
                        if (!loginOptions.preAction) return [3 /*break*/, 9];
                        debug("execute 'preAction' interceptor provided in login options");
                        return [4 /*yield*/, loginOptions.preAction()];
                    case 8:
                        loginFrameOrPage = (_a.sent()) || this.page;
                        _a.label = 9;
                    case 9:
                        debug('fill login components input with relevant values');
                        return [4 /*yield*/, this.fillInputs(loginFrameOrPage, loginOptions.fields)];
                    case 10:
                        _a.sent();
                        debug('click on login submit button');
                        if (!(typeof loginOptions.submitButtonSelector === 'string')) return [3 /*break*/, 12];
                        return [4 /*yield*/, (0, elements_interactions_1.clickButton)(loginFrameOrPage, loginOptions.submitButtonSelector)];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, loginOptions.submitButtonSelector()];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        this.emitProgress(definitions_1.ScraperProgressTypes.LoggingIn);
                        if (!loginOptions.postAction) return [3 /*break*/, 16];
                        debug("execute 'postAction' interceptor provided in login options");
                        return [4 /*yield*/, loginOptions.postAction()];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 18];
                    case 16:
                        debug('wait for page navigation');
                        return [4 /*yield*/, (0, navigation_1.waitForNavigation)(this.page)];
                    case 17:
                        _a.sent();
                        _a.label = 18;
                    case 18:
                        debug('check login result');
                        return [4 /*yield*/, (0, navigation_1.getCurrentUrl)(this.page, true)];
                    case 19:
                        current = _a.sent();
                        return [4 /*yield*/, getKeyByValue(loginOptions.possibleResults, current, this.page)];
                    case 20:
                        loginResult = _a.sent();
                        debug("handle login results ".concat(loginResult));
                        return [2 /*return*/, this.handleLoginResult(loginResult)];
                }
            });
        });
    };
    BaseScraperWithBrowser.prototype.terminate = function (_success) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debug("terminating browser with success = ".concat(_success));
                        this.emitProgress(definitions_1.ScraperProgressTypes.Terminating);
                        if (!(!_success && !!this.options.storeFailureScreenShotPath)) return [3 /*break*/, 2];
                        debug("create a snapshot before terminated in ".concat(this.options.storeFailureScreenShotPath));
                        return [4 /*yield*/, this.page.screenshot({
                                path: this.options.storeFailureScreenShotPath,
                                fullPage: true
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, Promise.all(this.cleanups.reverse().map(function (cleanup) { return cleanup(); }))];
                    case 3:
                        _a.sent();
                        this.cleanups = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseScraperWithBrowser.prototype.handleLoginResult = function (loginResult) {
        switch (loginResult) {
            case exports.LoginResults.Success:
                this.emitProgress(definitions_1.ScraperProgressTypes.LoginSuccess);
                return { success: true };
            case exports.LoginResults.InvalidPassword:
            case exports.LoginResults.UnknownError:
                this.emitProgress(definitions_1.ScraperProgressTypes.LoginFailed);
                return {
                    success: false,
                    errorType: loginResult === exports.LoginResults.InvalidPassword ?
                        errors_1.ScraperErrorTypes.InvalidPassword :
                        errors_1.ScraperErrorTypes.General,
                    errorMessage: "Login failed with ".concat(loginResult, " error")
                };
            case exports.LoginResults.ChangePassword:
                this.emitProgress(definitions_1.ScraperProgressTypes.ChangePassword);
                return {
                    success: false,
                    errorType: errors_1.ScraperErrorTypes.ChangePassword
                };
            default:
                throw new Error("unexpected login result \"".concat(loginResult, "\""));
        }
    };
    return BaseScraperWithBrowser;
}(base_scraper_1.BaseScraper));
exports.BaseScraperWithBrowser = BaseScraperWithBrowser;
