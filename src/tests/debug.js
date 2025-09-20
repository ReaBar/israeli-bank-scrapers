"use strict";
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
var _a;
exports.__esModule = true;
var index_1 = require("../index");
var debug_1 = require("debug");
var fs_1 = require("fs");
var path_1 = require("path");
var url_1 = require("url");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1["default"].dirname(__filename);
// Enable debug logs
process.env.DEBUG = 'israeli-bank-scrapers:*';
debug_1["default"].enable('israeli-bank-scrapers:*');
// Configuration for multiple companies
var COMPANY_CONFIGS = (_a = {},
    _a[index_1.CompanyTypes.otsarHahayal] = {
        credentials: {
            username: 'vzb83xr',
            password: 'Vd3EANhVww#jaA'
        },
        enabled: true
    },
    _a[index_1.CompanyTypes.max] = {
        credentials: {
            username: 'rea.bar@gmail.com',
            password: '7WPP5T~tgDLFg'
        },
        enabled: true
    },
    _a['Max Michal'] = {
        credentials: {
            username: 'michalya4@gmail.com',
            password: 'PgedF7&kf4oA'
        },
        enabled: true
    },
    _a[index_1.CompanyTypes.visaCal] = {
        credentials: {
            username: 'reabarcc',
            password: 'v32s5xrPLV'
        },
        enabled: true
    },
    _a[index_1.CompanyTypes.amex] = {
        credentials: {
            id: '200055242',
            card6Digits: '985380',
            password: 'EU9juUTL9f9s'
        },
        enabled: true
    },
    _a[index_1.CompanyTypes.isracard] = {
        credentials: {
            id: '200055242',
            card6Digits: '519122',
            password: 'uafWpL5nRwWS'
        },
        enabled: true
    },
    // Second Isracard account (you can rename this key if needed)
    _a['Isracard Michal'] = {
        credentials: {
            id: '201274222',
            card6Digits: '101085',
            password: 'sS7Rcvzpfbknv'
        },
        enabled: true
    },
    _a);
function debugScraper() {
    return __awaiter(this, void 0, void 0, function () {
        var scraper, combinedResults, enabledCompanies, baseOptions, _loop_1, _i, enabledCompanies_1, _a, companyId, config, now, dateFolder, pad, dateTimeString_1, outputDir_1, combinedOutputFile, e_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    scraper = null;
                    combinedResults = {};
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    console.log('Starting multi-company debug scraper function');
                    enabledCompanies = Object.entries(COMPANY_CONFIGS)
                        .filter(function (_a) {
                        var _ = _a[0], config = _a[1];
                        return config.enabled;
                    })
                        .map(function (_a) {
                        var companyId = _a[0], config = _a[1];
                        return ({ companyId: companyId, config: config });
                    });
                    if (enabledCompanies.length === 0) {
                        console.log('No companies enabled. Please set enabled: true for at least one company in COMPANY_CONFIGS.');
                        return [2 /*return*/];
                    }
                    console.log("Found ".concat(enabledCompanies.length, " enabled companies:"), enabledCompanies.map(function (c) { return c.companyId; }));
                    baseOptions = {
                        startDate: new Date('2025-05-01'),
                        combineInstallments: false,
                        showBrowser: true,
                        verbose: true,
                        slowMo: 10000,
                        timeout: 120000,
                        args: [
                            '--disable-popup-blocking',
                            '--disable-notifications',
                            '--window-size=1920,1080',
                            '--no-sandbox',
                            '--disable-setuid-sandbox',
                            '--disable-dev-shm-usage',
                            '--disable-accelerated-2d-canvas',
                            '--disable-gpu',
                        ],
                        defaultTimeout: 20000,
                        skipCloseBrowser: true
                    };
                    _loop_1 = function (companyId, config) {
                        var actualCompanyId_1, options, scrapeResult, scrapeError_1, actualCompanyId;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    console.log("\n=== Processing ".concat(companyId, " ==="));
                                    _c.label = 1;
                                case 1:
                                    _c.trys.push([1, 6, , 9]);
                                    switch (companyId) {
                                        case 'Max Michal':
                                        case 'max':
                                            actualCompanyId_1 = index_1.CompanyTypes.max;
                                            break;
                                        case 'Cal Michal':
                                            actualCompanyId_1 = index_1.CompanyTypes.visaCal;
                                            break;
                                        case 'Isracard Michal':
                                            actualCompanyId_1 = index_1.CompanyTypes.isracard;
                                            break;
                                        default:
                                            actualCompanyId_1 = companyId;
                                    }
                                    options = __assign(__assign({}, baseOptions), { companyId: actualCompanyId_1 });
                                    console.log("Creating scraper instance for ".concat(companyId, "..."));
                                    scraper = (0, index_1.createScraper)(options);
                                    console.log("Attempting to scrape ".concat(companyId, "..."));
                                    // Set up page event handlers
                                    if (scraper.page) {
                                        scraper.page.on('error', function (err) {
                                            console.error("[".concat(companyId, "] Page error:"), err);
                                        });
                                        scraper.page.on('console', function (msg) {
                                            console.log("[".concat(companyId, "] Browser console:"), msg.text());
                                        });
                                        scraper.page.on('dialog', function (dialog) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        console.log("[".concat(companyId, "] Dialog appeared:"), dialog.message());
                                                        return [4 /*yield*/, dialog.accept()];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        scraper.page.on('close', function () {
                                            console.log("[".concat(companyId, "] Page was closed unexpectedly!"));
                                            process.exit(1);
                                        });
                                    }
                                    return [4 /*yield*/, scraper.scrape(config.credentials)];
                                case 2:
                                    scrapeResult = _c.sent();
                                    console.log("[".concat(companyId, "] Scraping completed"));
                                    if (scrapeResult.success && scrapeResult.accounts) {
                                        console.log("[".concat(companyId, "] Scraping successful!"));
                                        scrapeResult.accounts.forEach(function (account) {
                                            console.log("[".concat(companyId, "] Found ").concat(account.txns.length, " transactions for account number ").concat(account.accountNumber));
                                            console.log("[".concat(companyId, "] Account balance:"), account.balance);
                                            console.log("[".concat(companyId, "] First few transactions:"), account.txns.slice(0, 3));
                                        });
                                        // Add results to the combined object organized by official company type and account
                                        scrapeResult.accounts.forEach(function (account) {
                                            var accountKey = account.accountNumber || 'unknown_account';
                                            // Initialize company object if it doesn't exist
                                            if (!combinedResults[actualCompanyId_1]) {
                                                combinedResults[actualCompanyId_1] = {};
                                            }
                                            // If account already exists (from another config), add a suffix to avoid overwrite
                                            var uniqueAccountKey = accountKey;
                                            var suffix = 2;
                                            while (combinedResults[actualCompanyId_1][uniqueAccountKey]) {
                                                uniqueAccountKey = "".concat(accountKey, "_").concat(suffix++);
                                            }
                                            // Add account results to the company
                                            combinedResults[actualCompanyId_1][uniqueAccountKey] = {
                                                success: true,
                                                accountNumber: account.accountNumber,
                                                balance: account.balance,
                                                transactions: account.txns,
                                                scrapedAt: new Date().toISOString(),
                                                companyType: actualCompanyId_1,
                                                configKey: companyId
                                            };
                                        });
                                    }
                                    else {
                                        console.error("[".concat(companyId, "] Scraping failed with error type:"), scrapeResult.errorType);
                                        console.error("[".concat(companyId, "] Error message:"), scrapeResult.errorMessage);
                                        // Add error results to combined object under official company type
                                        if (!combinedResults[actualCompanyId_1]) {
                                            combinedResults[actualCompanyId_1] = {};
                                        }
                                        // Use configKey as error key to distinguish between configs
                                        combinedResults[actualCompanyId_1]["error_".concat(companyId)] = {
                                            success: false,
                                            errorType: scrapeResult.errorType,
                                            errorMessage: scrapeResult.errorMessage,
                                            scrapedAt: new Date().toISOString(),
                                            companyType: actualCompanyId_1,
                                            configKey: companyId
                                        };
                                    }
                                    if (!((scraper === null || scraper === void 0 ? void 0 : scraper.page) && !scraper.page.isClosed())) return [3 /*break*/, 4];
                                    return [4 /*yield*/, scraper.page.close()];
                                case 3:
                                    _c.sent();
                                    _c.label = 4;
                                case 4:
                                    scraper = null;
                                    // Add a small delay between companies
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                                case 5:
                                    // Add a small delay between companies
                                    _c.sent();
                                    return [3 /*break*/, 9];
                                case 6:
                                    scrapeError_1 = _c.sent();
                                    console.error("[".concat(companyId, "] Error during scraping:"), scrapeError_1);
                                    console.error("[".concat(companyId, "] Error stack:"), scrapeError_1.stack);
                                    if (scrapeError_1.message) {
                                        console.error("[".concat(companyId, "] Error message:"), scrapeError_1.message);
                                    }
                                    actualCompanyId = void 0;
                                    switch (companyId) {
                                        case 'Max Michal':
                                        case 'max':
                                            actualCompanyId = index_1.CompanyTypes.max;
                                            break;
                                        case 'Cal Michal':
                                            actualCompanyId = index_1.CompanyTypes.visaCal;
                                            break;
                                        case 'Isracard Michal':
                                            actualCompanyId = index_1.CompanyTypes.isracard;
                                            break;
                                        default:
                                            actualCompanyId = companyId;
                                    }
                                    if (!combinedResults[actualCompanyId]) {
                                        combinedResults[actualCompanyId] = {};
                                    }
                                    combinedResults[actualCompanyId]["error_".concat(companyId)] = {
                                        success: false,
                                        errorType: 'UNKNOWN_ERROR',
                                        errorMessage: scrapeError_1.message || 'Unknown error occurred',
                                        scrapedAt: new Date().toISOString(),
                                        companyType: actualCompanyId,
                                        configKey: companyId
                                    };
                                    if (!((scraper === null || scraper === void 0 ? void 0 : scraper.page) && !scraper.page.isClosed())) return [3 /*break*/, 8];
                                    return [4 /*yield*/, scraper.page.close()];
                                case 7:
                                    _c.sent();
                                    _c.label = 8;
                                case 8:
                                    scraper = null;
                                    return [3 /*break*/, 9];
                                case 9: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, enabledCompanies_1 = enabledCompanies;
                    _b.label = 2;
                case 2:
                    if (!(_i < enabledCompanies_1.length)) return [3 /*break*/, 5];
                    _a = enabledCompanies_1[_i], companyId = _a.companyId, config = _a.config;
                    return [5 /*yield**/, _loop_1(companyId, config)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('\n=== All companies processed ===');
                    now = new Date();
                    dateFolder = now.toLocaleDateString('en-CA');
                    pad = function (n) { return n.toString().padStart(2, '0'); };
                    dateTimeString_1 = "".concat(now.getFullYear(), "-").concat(pad(now.getMonth() + 1), "-").concat(pad(now.getDate()), "_").concat(pad(now.getHours()), "-").concat(pad(now.getMinutes()));
                    outputDir_1 = path_1["default"].join(__dirname, 'debug_output', dateFolder);
                    if (!fs_1["default"].existsSync(outputDir_1)) {
                        fs_1["default"].mkdirSync(outputDir_1, { recursive: true });
                    }
                    combinedOutputFile = path_1["default"].join(outputDir_1, "combined_results_".concat(dateTimeString_1, ".json"));
                    fs_1["default"].writeFileSync(combinedOutputFile, JSON.stringify(combinedResults, null, 2));
                    console.log("Combined results saved to: ".concat(combinedOutputFile));
                    // Also save individual company results for debugging
                    Object.entries(combinedResults).forEach(function (_a) {
                        var officialCompanyId = _a[0], accounts = _a[1];
                        Object.entries(accounts).forEach(function (_a) {
                            var accountId = _a[0], result = _a[1];
                            var individualFile = path_1["default"].join(outputDir_1, "".concat(officialCompanyId, "_").concat(accountId, "_results_").concat(dateTimeString_1, ".json"));
                            fs_1["default"].writeFileSync(individualFile, JSON.stringify(result, null, 2));
                        });
                    });
                    return [3 /*break*/, 8];
                case 6:
                    e_1 = _b.sent();
                    console.error('Multi-company scraping failed with error:', e_1);
                    console.error('Error stack:', e_1.stack);
                    if (e_1.message) {
                        console.error('Error message:', e_1.message);
                    }
                    return [3 /*break*/, 8];
                case 7:
                    console.log('Debug session completed.');
                    process.exit(0);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Handle the promise properly
void debugScraper();
