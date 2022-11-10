import 'moment-timezone';
import fs from 'fs';
import * as tz from "moment-timezone";


/**
 * Utils class to do some things
 */
class Utils {
    /**
     * 
     * @param {string} timezone The timezone to verify
     * @returns {Boolean} Boolean true or false
     */
    static isValidTimezone(timezone: string): boolean {
        return !!tz.tz.zone(timezone);
    };

    /**
     * 
     * @param {string} path The path to verify
     * @returns {Boolean} Boolean true or false
     */
    static isValidPath(path: string): boolean {
        return fs.existsSync(path);
    };

    /**
     * 
     * @param {string} hex The hexadecimal to verify
     * @returns {Boolean} Boolean true or false
     */
    static isValidHEX(hex: string | any): boolean {
        const filter = /^#[0-9A-F]{6}$/i;
        return filter.test(hex);
    };
}


export default Utils;