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
exports.__esModule = true;
exports.fetchPostWithinPage = exports.fetchGetWithinPage = exports.fetchGraphql = exports.fetchPost = exports.fetchGet = void 0;
var node_fetch_1 = require("node-fetch");
var JSON_CONTENT_TYPE = 'application/json';
function getJsonHeaders() {
    return {
        'Accept': JSON_CONTENT_TYPE,
        'Content-Type': JSON_CONTENT_TYPE
    };
}
function fetchGet(url, extraHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, request, fetchResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = getJsonHeaders();
                    if (extraHeaders) {
                        headers = Object.assign(headers, extraHeaders);
                    }
                    request = {
                        method: 'GET',
                        headers: headers
                    };
                    return [4 /*yield*/, (0, node_fetch_1["default"])(url, request)];
                case 1:
                    fetchResult = _a.sent();
                    if (fetchResult.status !== 200) {
                        throw new Error("sending a request to the institute server returned with status code ".concat(fetchResult.status));
                    }
                    return [2 /*return*/, fetchResult.json()];
            }
        });
    });
}
exports.fetchGet = fetchGet;
function fetchPost(url, data, extraHeaders) {
    if (extraHeaders === void 0) { extraHeaders = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var request, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request = {
                        method: 'POST',
                        headers: __assign(__assign({}, getJsonHeaders()), extraHeaders),
                        body: JSON.stringify(data)
                    };
                    return [4 /*yield*/, (0, node_fetch_1["default"])(url, request)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.json()];
            }
        });
    });
}
exports.fetchPost = fetchPost;
function fetchGraphql(url, query, variables, extraHeaders) {
    var _a;
    if (variables === void 0) { variables = {}; }
    if (extraHeaders === void 0) { extraHeaders = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetchPost(url, { operationName: null, query: query, variables: variables }, extraHeaders)];
                case 1:
                    result = _b.sent();
                    if ((_a = result.errors) === null || _a === void 0 ? void 0 : _a.length) {
                        throw new Error(result.errors[0].message);
                    }
                    return [2 /*return*/, result.data];
            }
        });
    });
}
exports.fetchGraphql = fetchGraphql;
function fetchGetWithinPage(page, url) {
    return page.evaluate(function (innerUrl) {
        return new Promise(function (resolve, reject) {
            fetch(innerUrl, {
                credentials: 'include'
            }).then(function (result) {
                if (result.status === 204) {
                    resolve(null);
                }
                else {
                    resolve(result.json());
                }
            })["catch"](function (e) {
                reject(e);
            });
        });
    }, url);
}
exports.fetchGetWithinPage = fetchGetWithinPage;
function fetchPostWithinPage(page, url, data, extraHeaders) {
    if (extraHeaders === void 0) { extraHeaders = {}; }
    return page.evaluate(function (innerUrl, innerData, innerExtraHeaders) {
        return new Promise(function (resolve, reject) {
            fetch(innerUrl, {
                method: 'POST',
                body: JSON.stringify(innerData),
                credentials: 'include',
                // eslint-disable-next-line prefer-object-spread
                headers: Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, innerExtraHeaders)
            }).then(function (result) {
                if (result.status === 204) {
                    // No content response
                    resolve(null);
                }
                else {
                    resolve(result.json());
                }
            })["catch"](function (e) {
                reject(e);
            });
        });
    }, url, data, extraHeaders);
}
exports.fetchPostWithinPage = fetchPostWithinPage;
