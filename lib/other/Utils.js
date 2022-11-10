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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("moment-timezone");
var fs_1 = __importDefault(require("fs"));
var tz = __importStar(require("moment-timezone"));
/**
 * Utils class to do some things
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     *
     * @param {string} timezone The timezone to verify
     * @returns {Boolean} Boolean true or false
     */
    Utils.isValidTimezone = function (timezone) {
        return !!tz.tz.zone(timezone);
    };
    ;
    /**
     *
     * @param {string} path The path to verify
     * @returns {Boolean} Boolean true or false
     */
    Utils.isValidPath = function (path) {
        return fs_1.default.existsSync(path);
    };
    ;
    /**
     *
     * @param {string} hex The hexadecimal to verify
     * @returns {Boolean} Boolean true or false
     */
    Utils.isValidHEX = function (hex) {
        var filter = /^#[0-9A-F]{6}$/i;
        return filter.test(hex);
    };
    ;
    return Utils;
}());
exports.default = Utils;
