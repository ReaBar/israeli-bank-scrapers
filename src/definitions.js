"use strict";
// NOTICE: avoid changing exported keys as they are part of the public api
var _a;
exports.__esModule = true;
exports.ScraperProgressTypes = exports.SCRAPERS = exports.CompanyTypes = exports.PASSWORD_FIELD = void 0;
exports.PASSWORD_FIELD = 'password';
var CompanyTypes;
(function (CompanyTypes) {
    CompanyTypes["hapoalim"] = "hapoalim";
    CompanyTypes["beinleumi"] = "beinleumi";
    CompanyTypes["union"] = "union";
    CompanyTypes["amex"] = "amex";
    CompanyTypes["isracard"] = "isracard";
    CompanyTypes["visaCal"] = "visaCal";
    CompanyTypes["max"] = "max";
    CompanyTypes["otsarHahayal"] = "otsarHahayal";
    CompanyTypes["discount"] = "discount";
    CompanyTypes["mercantile"] = "mercantile";
    CompanyTypes["mizrahi"] = "mizrahi";
    CompanyTypes["leumi"] = "leumi";
    CompanyTypes["massad"] = "massad";
    CompanyTypes["yahav"] = "yahav";
    CompanyTypes["behatsdaa"] = "behatsdaa";
    CompanyTypes["beyahadBishvilha"] = "beyahadBishvilha";
    CompanyTypes["oneZero"] = "oneZero";
    CompanyTypes["pagi"] = "pagi";
})(CompanyTypes = exports.CompanyTypes || (exports.CompanyTypes = {}));
exports.SCRAPERS = (_a = {},
    _a[CompanyTypes.hapoalim] = {
        name: 'Bank Hapoalim',
        loginFields: ['userCode', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.leumi] = {
        name: 'Bank Leumi',
        loginFields: ['username', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.mizrahi] = {
        name: 'Mizrahi Bank',
        loginFields: ['username', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.discount] = {
        name: 'Discount Bank',
        loginFields: ['id', exports.PASSWORD_FIELD, 'num']
    },
    _a[CompanyTypes.mercantile] = {
        name: 'Mercantile Bank',
        loginFields: ['id', exports.PASSWORD_FIELD, 'num']
    },
    _a[CompanyTypes.otsarHahayal] = {
        name: 'Bank Otsar Hahayal',
        loginFields: ['username', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.max] = {
        name: 'Max',
        loginFields: ['username', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.visaCal] = {
        name: 'Visa Cal',
        loginFields: ['username', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.isracard] = {
        name: 'Isracard',
        loginFields: ['id', 'card6Digits', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.amex] = {
        name: 'Amex',
        loginFields: ['id', 'card6Digits', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.union] = {
        name: 'Union',
        loginFields: ['username', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.beinleumi] = {
        name: 'Beinleumi',
        loginFields: ['username', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.massad] = {
        name: 'Massad',
        loginFields: ['username', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.yahav] = {
        name: 'Bank Yahav',
        loginFields: ['username', 'nationalID', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.beyahadBishvilha] = {
        name: 'Beyahad Bishvilha',
        loginFields: ['id', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.oneZero] = {
        name: 'One Zero',
        loginFields: [
            'email',
            exports.PASSWORD_FIELD,
            'otpCodeRetriever',
            'phoneNumber',
            'otpLongTermToken',
        ]
    },
    _a[CompanyTypes.behatsdaa] = {
        name: 'Behatsdaa',
        loginFields: ['id', exports.PASSWORD_FIELD]
    },
    _a[CompanyTypes.pagi] = {
        name: 'Pagi',
        loginFields: ['username', exports.PASSWORD_FIELD]
    },
    _a);
var ScraperProgressTypes;
(function (ScraperProgressTypes) {
    ScraperProgressTypes["Initializing"] = "INITIALIZING";
    ScraperProgressTypes["StartScraping"] = "START_SCRAPING";
    ScraperProgressTypes["LoggingIn"] = "LOGGING_IN";
    ScraperProgressTypes["LoginSuccess"] = "LOGIN_SUCCESS";
    ScraperProgressTypes["LoginFailed"] = "LOGIN_FAILED";
    ScraperProgressTypes["ChangePassword"] = "CHANGE_PASSWORD";
    ScraperProgressTypes["EndScraping"] = "END_SCRAPING";
    ScraperProgressTypes["Terminating"] = "TERMINATING";
})(ScraperProgressTypes = exports.ScraperProgressTypes || (exports.ScraperProgressTypes = {}));
