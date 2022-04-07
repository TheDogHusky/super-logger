const tz = require('moment-timezone');
const fs = require('fs')

/**
 * Utils class to do some utils things
 */
class Utils {
    /**
     * 
     * @param {String} timezone The timezone to verify
     * @returns Boolean true or false
     */
    static isValidTimezone(timezone) {
        return tz.tz.zone(timezone);
    }

    /**
     * 
     * @param {String} path The path to verify
     * @returns Boolean true or false
     */
    static isValidPath(path) {
        return fs.existsSync(path);
    }

    /**
     * 
     * @param {String} hex The hexadecimal to verify
     * @returns Boolean true or false
     */
    static isValidHEX(hex) {
        const filter = /^#[0-9A-F]{6}$/i;
        return filter.test(hex);
    }
}

exports.Utils = Utils;