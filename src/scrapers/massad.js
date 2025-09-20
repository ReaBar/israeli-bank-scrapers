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
var base_beinleumi_group_1 = require("./base-beinleumi-group");
var MassadScraper = /** @class */ (function (_super) {
    __extends(MassadScraper, _super);
    function MassadScraper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BASE_URL = 'https://online.bankmassad.co.il';
        _this.LOGIN_URL = "".concat(_this.BASE_URL, "/MatafLoginService/MatafLoginServlet?bankId=MASADPRTAL&site=Private&KODSAFA=HE");
        _this.TRANSACTIONS_URL = "".concat(_this.BASE_URL, "/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/PrivateAccountFlow");
        return _this;
    }
    return MassadScraper;
}(base_beinleumi_group_1["default"]));
exports["default"] = MassadScraper;
