"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.getPuppeteerConfig = exports.OneZeroScraper = exports.createScraper = exports.SCRAPERS = exports.CompanyTypes = void 0;
var definitions_1 = require("./definitions");
__createBinding(exports, definitions_1, "CompanyTypes");
__createBinding(exports, definitions_1, "SCRAPERS");
var factory_1 = require("./scrapers/factory");
__createBinding(exports, factory_1, "default", "createScraper");
var one_zero_1 = require("./scrapers/one-zero");
__createBinding(exports, one_zero_1, "default", "OneZeroScraper");
function getPuppeteerConfig() {
    return { chromiumRevision: '1250580' }; // https://github.com/puppeteer/puppeteer/releases/tag/puppeteer-core-v22.5.0
}
exports.getPuppeteerConfig = getPuppeteerConfig;
