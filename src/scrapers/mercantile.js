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
exports.__esModule = true;
var discount_1 = require("./discount");
var MercantileScraper = /** @class */ (function (_super) {
    __extends(MercantileScraper, _super);
    function MercantileScraper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MercantileScraper.prototype.getLoginOptions = function (credentials) {
        return __assign(__assign({}, _super.prototype.getLoginOptions.call(this, credentials)), { loginUrl: 'https://start.telebank.co.il/login/?bank=m' });
    };
    return MercantileScraper;
}(discount_1["default"]));
exports["default"] = MercantileScraper;
