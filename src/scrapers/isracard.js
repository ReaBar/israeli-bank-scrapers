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
exports.__esModule = true;
var base_isracard_amex_1 = require("./base-isracard-amex");
var BASE_URL = 'https://digital.isracard.co.il';
var COMPANY_CODE = '11';
var IsracardScraper = /** @class */ (function (_super) {
    __extends(IsracardScraper, _super);
    function IsracardScraper(options) {
        return _super.call(this, options, BASE_URL, COMPANY_CODE) || this;
    }
    return IsracardScraper;
}(base_isracard_amex_1["default"]));
exports["default"] = IsracardScraper;
