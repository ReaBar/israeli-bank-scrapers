"use strict";
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
exports.BaseScraper = void 0;
var events_1 = require("events");
var moment_timezone_1 = require("moment-timezone");
var definitions_1 = require("../definitions");
var waiting_1 = require("../helpers/waiting");
var errors_1 = require("./errors");
var SCRAPE_PROGRESS = 'SCRAPE_PROGRESS';
var BaseScraper = /** @class */ (function () {
    function BaseScraper(options) {
        this.options = options;
        this.eventEmitter = new events_1.EventEmitter();
    }
    // eslint-disable-next-line  @typescript-eslint/require-await
    BaseScraper.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.emitProgress(definitions_1.ScraperProgressTypes.Initializing);
                moment_timezone_1["default"].tz.setDefault('Asia/Jerusalem');
                return [2 /*return*/];
            });
        });
    };
    BaseScraper.prototype.scrape = function (credentials) {
        return __awaiter(this, void 0, void 0, function () {
            var loginResult, e_1, scrapeResult, e_2, success, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.emitProgress(definitions_1.ScraperProgressTypes.StartScraping);
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.login(credentials)];
                    case 3:
                        loginResult = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        loginResult = e_1 instanceof waiting_1.TimeoutError ?
                            (0, errors_1.createTimeoutError)(e_1.message) :
                            (0, errors_1.createGenericError)(e_1.message);
                        return [3 /*break*/, 5];
                    case 5:
                        if (!loginResult.success) return [3 /*break*/, 10];
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.fetchData()];
                    case 7:
                        scrapeResult = _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        e_2 = _a.sent();
                        scrapeResult =
                            e_2 instanceof waiting_1.TimeoutError ?
                                (0, errors_1.createTimeoutError)(e_2.message) :
                                (0, errors_1.createGenericError)(e_2.message);
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        scrapeResult = loginResult;
                        _a.label = 11;
                    case 11:
                        _a.trys.push([11, 13, , 14]);
                        success = scrapeResult && scrapeResult.success === true;
                        return [4 /*yield*/, this.terminate(success)];
                    case 12:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        e_3 = _a.sent();
                        scrapeResult = (0, errors_1.createGenericError)(e_3.message);
                        return [3 /*break*/, 14];
                    case 14:
                        this.emitProgress(definitions_1.ScraperProgressTypes.EndScraping);
                        return [2 /*return*/, scrapeResult];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    BaseScraper.prototype.triggerTwoFactorAuth = function (_phoneNumber) {
        throw new Error("triggerOtp() is not created in ".concat(this.options.companyId));
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    BaseScraper.prototype.getLongTermTwoFactorToken = function (_otpCode) {
        throw new Error("getPermanentOtpToken() is not created in ".concat(this.options.companyId));
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    BaseScraper.prototype.login = function (_credentials) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("login() is not created in ".concat(this.options.companyId));
            });
        });
    };
    // eslint-disable-next-line  @typescript-eslint/require-await
    BaseScraper.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("fetchData() is not created in ".concat(this.options.companyId));
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    BaseScraper.prototype.terminate = function (_success) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.emitProgress(definitions_1.ScraperProgressTypes.Terminating);
                return [2 /*return*/];
            });
        });
    };
    BaseScraper.prototype.emitProgress = function (type) {
        this.emit(SCRAPE_PROGRESS, { type: type });
    };
    BaseScraper.prototype.emit = function (eventName, payload) {
        this.eventEmitter.emit(eventName, this.options.companyId, payload);
    };
    BaseScraper.prototype.onProgress = function (func) {
        this.eventEmitter.on(SCRAPE_PROGRESS, func);
    };
    return BaseScraper;
}());
exports.BaseScraper = BaseScraper;
