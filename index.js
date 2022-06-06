const chalk = require('chalk');
const moment = require('moment');
const tz = require('moment-timezone');
const fs = require('fs');
const path = require('path');
const { Options } = require('./other/Options')
const { Utils } = require('./other/Utils')
const { Custom } = require('./other/Custom')

/**
 * @author ClassyCrafter
 * @description A super package to create a super customisable and advanced logger
 * @version 1.4.35
 * @license GNU-GPL-3.0
 */


/**
 * The Logger class, represents a Logger
 */
class Logger {
    /**
     * 
     * @typedef {Object} Custom The customisation
     * @property {String} character The custom character to split the Title and the Text
     * @property {String} gray The custom gray
     * @property {String} namecolor The custom Logger's name color
     * @property {String} processcolor The custom process's color (process is an optionnal arg of custom function)
     * @property {String} titlecolor The color of the log's title
     * @property {String} textcolor The text color of the log
     * @property {String} datecolor The log's date color
     */
    /**
     * 
     * @typedef {Object} Options The options related to the Logger
     * @property {String} name The Logger's name
     * @property {String} timezone The Logger's timezone
     * @property {Number} tzformat The Logger's timezone format (12 or 24)
     * @property {String} dirpath The Logger's file system path to write the logs
     * @property {Boolean} writelogs If the Logger writes logs or not (true or false)
     * @property {Boolean} enablecustom If the custom is enabled
     * @property {Custom} custom Other parameters for advanced customisation
     */
    /**
     * @constructor
     * @param {Options} Options The options related to the Logger
     */
    constructor(Options) {
        // Defines  E V E R Y T H I N G
        this.name = Options.name;
        this.timezone = Options.timezone;
        this.tzformat = Options.tzformat;
        this.dirpath = Options.dirpath;
        this.writelogs = Options.writelogs;
        this.iscustomenabled = Options.enablecustom;
        this.customisation = Options.custom;

        // Some verifications
        if(!this.name) throw new Error("Please specify the name of the Logger in the constructor.");
        if(!this.timezone) throw new Error("Please specify a timezone in the constructor");
        if(!Utils.isValidTimezone(this.timezone)) throw new Error(`The timezone ${this.timezone} is not a valid timezone.`);
        if(!this.dirpath) this.writelogs === false;
        if(this.writelogs === true && !this.dirpath) throw new Error("The writelogs parameter is enabled, but there is no dirpath specified.");
        if(this.writelogs === true && !Utils.isValidPath(this.dirpath)) throw new Error("The dirpath is invalid.");
        // Custom Verifications
        if(this.iscustomenabled === true && !this.customisation.character) throw new Error("The customisation is enabled but there isn't a character.");
        if(this.iscustomenabled === true && !this.customisation.gray) throw new Error("The customisation is enabled but there isn't a gray HEX.")
        if(this.iscustomenabled === true && !Utils.isValidHEX(this.customisation.gray)) throw new Error("The customisation's gray hexadecimal is invalid.");
        if(this.iscustomenabled === true && !this.customisation.namecolor) throw new Error("The customisation is enabled but there isn't a name color in hexadecimal.");
        if(this.iscustomenabled === true && !Utils.isValidHEX(this.customisation.namecolor)) throw new Error("The customisation's name color isn't a valid hexadecimal.");
        if(this.iscustomenabled === true && !this.customisation.processcolor) throw new Error("The customisation is enabled but there isn't a process color in hexadecimal.");
        if(this.iscustomenabled === true && !Utils.isValidHEX(this.customisation.processcolor)) throw new Error("The customisation's process color isn't a valid hexadecimal.");
        if(this.iscustomenabled === true && !this.customisation.titlecolor) throw new Error("The customisation is enabled but there isn't a title color in hexadecimal.");
        if(this.iscustomenabled === true && !Utils.isValidHEX(this.customisation.title)) throw new Error("The customisation's title color isn't a valid hexadecimal.");
        if(this.iscustomenabled === true && !this.customisation.textcolor) throw new Error("The customisation is enabled but there isn't a text color in hexadecimal.");
        if(this.iscustomenabled === true && !Utils.isValidHEX(this.customisation.textcolor)) throw new Error("The customisation's text color isn't a valid hexadecimal.");
        if(this.iscustomenabled === true && !this.customisation.datecolor) throw new Error("The customisation is enabled but there isn't a date color in hexadecimal.");
        if(this.iscustomenabled === true && !Utils.isValidHEX(this.customisation.datecolor)) throw new Error("The customisation's date color isn't a valid hexadecimal.");

        this.refreshDates();
        // FS Part
        if(this.writelogs === false) return;
        this.filepath = path.join(this.dirpath, `${moment(this.dateRaw).tz(String(this.timezone)).format("D-M-YYYY--HH_mm_ss")}.log`);
    };

    // Some utility functions
    /**
     * Refresh the Logger's dates
     */
    refreshDates() {
        const d = new Date();
        if(this.tzformat === 24) {
            this.dateRaw = d;
            this.date = moment(d).tz(String(this.timezone)).format("HH:mm:ss");
        } else if(this.tzformat === 12) {
            this.date = moment(d).tz(String(this.timezone)).format("hh:mm:ss A");
            this.dateRaw = d;
        } else {
            this.dateRaw = d;
            this.date = moment(d).tz(String(this.timezone)).format("HH:mm:ss");
        };
    };

    /**
     * 
     * @param {String} formattedMessage The formatted message to write!
     */
    writefile(formattedMessage) {
        if(this.writelogs === false) return;
        fs.appendFile(this.filepath, formattedMessage + '\n', (err) => {
            if (err) {
                throw new Error(err);
            };
        });
    };

    // Let's begin the show!!
    /**
     * 
     * @param {String} text The text to log as an info
     * @param {String} process The optionnal ~special~ process
     */
    info(text, process) {
        this.refreshDates();
        if(process) {
            console.log(
                `${chalk.cyan(this.date)}${chalk.gray(` - `)}${chalk.blue("[")}${chalk.cyanBright(`${this.name}`)} ${chalk.grey("/")} ${chalk.hex("#00ffe8")(process)}${chalk.blue("]")} ${chalk.green("Info")} ${chalk.gray("▪")} ${chalk.greenBright(text)}`
            );
            this.writefile(`${this.date} - [${this.name} / ${process}] Info ▪ ${text}`);
        } else {
            console.log(
                `${chalk.cyan(this.date)}${chalk.gray(` - `)}${chalk.blue("[")}${chalk.cyanBright(`${this.name}`)}${chalk.blue("]")} ${chalk.green("Info")} ${chalk.gray("▪")} ${chalk.greenBright(text)}`
            );
            this.writefile(`${this.date} - [${this.name}] Info ▪ ${text}`);
        };
    };

    /**
     * 
     * @param {String} text The text to log as a warn
     * @param {String} process The optionnal process attached to this warning 
     */
    warn(text, process) {
        if(process) {
            console.log(
                `${chalk.cyan(this.date)}${chalk.gray(` - `)}${chalk.blue("[")}${chalk.cyanBright(`${this.name}`)} ${chalk.grey("/")} ${chalk.hex("#00ffe8")(process)}${chalk.blue("]")} ${chalk.yellow("Warn")} ${chalk.gray("▪")} ${chalk.yellowBright(text)}`
            );
            this.writefile(`${this.date} - [${this.name} / ${process}] Warn ▪ ${text}`);
        } else {
            console.log(
                `${chalk.cyan(this.date)}${chalk.gray(` - `)}${chalk.blue("[")}${chalk.cyanBright(`${this.name}`)}${chalk.blue("]")} ${chalk.yellow("Warn")} ${chalk.gray("▪")} ${chalk.yellowBright(text)}`
            );
            this.writefile(`${this.date} - [${this.name}] Warn ▪ ${text}`);
        };
    };


    error(text, process) {
        if(process) {
            console.log(
                `${chalk.cyan(this.date)}${chalk.gray(` - `)}${chalk.blue("[")}${chalk.cyanBright(`${this.name}`)} ${chalk.grey("/")} ${chalk.hex("#00ffe8")(process)}${chalk.blue("]")} ${chalk.red("Error")} ${chalk.gray("▪")} ${chalk.redBright(text)}`
            );
            this.writefile(`${this.date} - [${this.name} / ${process}] Error ▪ ${text}`);
        } else {
            console.log(
                `${chalk.cyan(this.date)}${chalk.gray(` - `)}${chalk.blue("[")}${chalk.cyanBright(`${this.name}`)}${chalk.blue("]")} ${chalk.red("Error")} ${chalk.gray("▪")} ${chalk.redBright(text)}`
            );;
            this.writefile(`${this.date} - [${this.name}] Error ▪ ${text}`);
        };
    };

    /**
     * 
     * @param {String} text The text to log
     * @param {String} title The custom title
     * @param {String} process The optionnal process attached to this log
     */
    custom(text, title, process) {
        this.refreshDates()
        if(process) {
            console.log(
                `${chalk.hex(this.customisation.datecolor)(this.date)}${chalk.hex(this.customisation.gray)(" - ")}${chalk.blue("[")}${chalk.hex(this.customisation.namecolor)(this.name)}${chalk.grey(" / ")}${chalk.hex(this.customisation.processcolor)(process)}${chalk.blue("]")} ${chalk.hex(this.customisation.titlecolor)(title)} ${chalk.hex(this.customisation.gray)(this.customisation.character)} ${chalk.hex(this.customisation.textcolor)(text)}`
            );
            this.writefile(`${this.date} - [${this.name} / ${process}] ${title} ${this.customisation.character} ${text}`);
        } else {
            console.log(
                `${chalk.hex(this.customisation.datecolor)(this.date)}${chalk.hex(this.customisation.gray)(" - ")}${chalk.blue("[")}${chalk.hex(this.customisation.namecolor)(this.name)}${chalk.blue("]")} ${chalk.hex(this.customisation.titlecolor)(title)} ${chalk.hex(this.customisation.gray)(this.customisation.character)} ${chalk.hex(this.customisation.textcolor)(text)}`
            );
            this.writefile(`${this.date} - [${this.name}] ${title} ${this.customisation.character} ${text}`);
        };
    };
};

exports.Logger = Logger;
exports.Utils = Utils;