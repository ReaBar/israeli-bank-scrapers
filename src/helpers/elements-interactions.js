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
exports.waitUntilIframeFound = exports.waitUntilElementFound = exports.waitUntilElementDisappear = exports.setValue = exports.pageEvalAll = exports.pageEval = exports.fillInput = exports.elementPresentOnPage = exports.dropdownSelect = exports.dropdownElements = exports.clickLink = exports.clickButton = void 0;
var waiting_1 = require("./waiting");
function waitUntilElementFound(page, elementSelector, onlyVisible, timeout) {
    if (onlyVisible === void 0) { onlyVisible = false; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForSelector(elementSelector, { visible: onlyVisible, timeout: timeout })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.waitUntilElementFound = waitUntilElementFound;
function waitUntilElementDisappear(page, elementSelector, timeout) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForSelector(elementSelector, { hidden: true, timeout: timeout })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.waitUntilElementDisappear = waitUntilElementDisappear;
function waitUntilIframeFound(page, framePredicate, description, timeout) {
    if (description === void 0) { description = ''; }
    if (timeout === void 0) { timeout = 30000; }
    return __awaiter(this, void 0, void 0, function () {
        var frame;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, waiting_1.waitUntil)(function () {
                        frame = page
                            .frames()
                            .find(framePredicate);
                        return Promise.resolve(!!frame);
                    }, description, timeout, 1000)];
                case 1:
                    _a.sent();
                    if (!frame) {
                        throw new Error('failed to find iframe');
                    }
                    return [2 /*return*/, frame];
            }
        });
    });
}
exports.waitUntilIframeFound = waitUntilIframeFound;
function fillInput(pageOrFrame, inputSelector, inputValue) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pageOrFrame.$eval(inputSelector, function (input) {
                        var inputElement = input;
                        // @ts-ignore
                        inputElement.value = '';
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, pageOrFrame.type(inputSelector, inputValue)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.fillInput = fillInput;
function setValue(pageOrFrame, inputSelector, inputValue) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pageOrFrame.$eval(inputSelector, function (input, value) {
                        var inputElement = input;
                        // @ts-ignore
                        inputElement.value = value;
                    }, [inputValue])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.setValue = setValue;
function clickButton(page, buttonSelector) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.$eval(buttonSelector, function (el) { return el.click(); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.clickButton = clickButton;
function clickLink(page, aSelector) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.$eval(aSelector, function (el) {
                        if (!el || typeof el.click === 'undefined') {
                            return;
                        }
                        el.click();
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.clickLink = clickLink;
function pageEvalAll(page, selector, defaultResult, callback) {
    var args = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        args[_i - 4] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = defaultResult;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, page.$$eval.apply(page, __spreadArray([selector, callback], args, false))];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    // TODO temporary workaround to puppeteer@1.5.0 which breaks $$eval bevahvior until they will release a new version.
                    if (!e_1.message.startsWith('Error: failed to find elements matching selector')) {
                        throw e_1;
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, result];
            }
        });
    });
}
exports.pageEvalAll = pageEvalAll;
function pageEval(pageOrFrame, selector, defaultResult, callback) {
    var args = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        args[_i - 4] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = defaultResult;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pageOrFrame.$eval.apply(pageOrFrame, __spreadArray([selector, callback], args, false))];
                case 2:
                    result = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    // TODO temporary workaround to puppeteer@1.5.0 which breaks $$eval bevahvior until they will release a new version.
                    if (!e_2.message.startsWith('Error: failed to find element matching selector')) {
                        throw e_2;
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, result];
            }
        });
    });
}
exports.pageEval = pageEval;
function elementPresentOnPage(pageOrFrame, selector) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pageOrFrame.$(selector)];
                case 1: return [2 /*return*/, (_a.sent()) !== null];
            }
        });
    });
}
exports.elementPresentOnPage = elementPresentOnPage;
function dropdownSelect(page, selectSelector, value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.select(selectSelector, value)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.dropdownSelect = dropdownSelect;
function dropdownElements(page, selector) {
    return __awaiter(this, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function (optionSelector) {
                        return Array.from(document.querySelectorAll(optionSelector))
                            .filter(function (o) { return o.value; })
                            .map(function (o) {
                            return {
                                name: o.text,
                                value: o.value
                            };
                        });
                    }, "".concat(selector, " > option"))];
                case 1:
                    options = _a.sent();
                    return [2 /*return*/, options];
            }
        });
    });
}
exports.dropdownElements = dropdownElements;
