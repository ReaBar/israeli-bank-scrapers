"use strict";
exports.__esModule = true;
var assertNever_1 = require("../assertNever");
var definitions_1 = require("../definitions");
var amex_1 = require("./amex");
var behatsdaa_1 = require("./behatsdaa");
var beinleumi_1 = require("./beinleumi");
var beyahad_bishvilha_1 = require("./beyahad-bishvilha");
var discount_1 = require("./discount");
var hapoalim_1 = require("./hapoalim");
var isracard_1 = require("./isracard");
var leumi_1 = require("./leumi");
var massad_1 = require("./massad");
var max_1 = require("./max");
var mercantile_1 = require("./mercantile");
var mizrahi_1 = require("./mizrahi");
var one_zero_1 = require("./one-zero");
var otsar_hahayal_1 = require("./otsar-hahayal");
var pagi_1 = require("./pagi");
var union_bank_1 = require("./union-bank");
var visa_cal_1 = require("./visa-cal");
var yahav_1 = require("./yahav");
function createScraper(options) {
    switch (options.companyId) {
        case definitions_1.CompanyTypes.hapoalim:
            return new hapoalim_1["default"](options);
        case definitions_1.CompanyTypes.leumi:
            return new leumi_1["default"](options);
        case definitions_1.CompanyTypes.beyahadBishvilha:
            return new beyahad_bishvilha_1["default"](options);
        case definitions_1.CompanyTypes.mizrahi:
            return new mizrahi_1["default"](options);
        case definitions_1.CompanyTypes.discount:
            return new discount_1["default"](options);
        case definitions_1.CompanyTypes.mercantile:
            return new mercantile_1["default"](options);
        case definitions_1.CompanyTypes.otsarHahayal:
            return new otsar_hahayal_1["default"](options);
        case definitions_1.CompanyTypes.visaCal:
            return new visa_cal_1["default"](options);
        case definitions_1.CompanyTypes.max:
            return new max_1["default"](options);
        case definitions_1.CompanyTypes.isracard:
            return new isracard_1["default"](options);
        case definitions_1.CompanyTypes.amex:
            return new amex_1["default"](options);
        case definitions_1.CompanyTypes.union:
            return new union_bank_1["default"](options);
        case definitions_1.CompanyTypes.beinleumi:
            return new beinleumi_1["default"](options);
        case definitions_1.CompanyTypes.massad:
            return new massad_1["default"](options);
        case definitions_1.CompanyTypes.yahav:
            return new yahav_1["default"](options);
        case definitions_1.CompanyTypes.oneZero:
            return new one_zero_1["default"](options);
        case definitions_1.CompanyTypes.behatsdaa:
            return new behatsdaa_1["default"](options);
        case definitions_1.CompanyTypes.pagi:
            return new pagi_1["default"](options);
        default:
            return (0, assertNever_1.assertNever)(options.companyId, "unknown company id ".concat(options.companyId));
    }
}
exports["default"] = createScraper;
