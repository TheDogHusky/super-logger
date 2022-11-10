import chalk from 'chalk';
import moment from 'moment';
import 'moment-timezone';
import fs from 'fs';
import path from 'path';
// @ts-ignore
import Utils from './other/Utils';
import utils from "./other/Utils";

export type LoggerOptions = {
    name?: string;
    timezone?: string;
    tzformat?: number;
    dirpath?: string;
    writelogs?: boolean;
    enablecustom?: boolean;
    colored?: boolean;
    custom?: {
        character?: string;
        gray?: string;
        namecolor?: string;
        processcolor?: string;
        titlecolor?: string;
        textcolor?: string;
        datecolor?: string;
    };
    colors?: {
        grey?: string;
        gray?: string;
        blue?: string;
        loggernamecolor?: string;
        processcolor?: string;
        info?: {
            color?: string;
            dark?: string;
            background?: string;
            highlight?: boolean;
        },
        debug?: {
            color?: string;
            dark?: string;
            background?: string;
            highlight?: boolean;
        },
        warn?: {
            color?: string;
            dark?: string;
            background?: string;
            highlight?: boolean;
        },
        error?: {
            color?: string;
            dark?: string;
            background?: string;
            highlight?: boolean;
        },
        fatal?: {
            color?: string;
            dark?: string;
            background?: string;
            highlight?: boolean;
        }
    }
};

export type LogType = 'info' | 'warn' | 'error' | 'fatal' | 'custom' | string;

export class LoggerError extends Error {

    public name = 'LoggerError';

    constructor(message: string, name?: string) {
        super(message);
        this.name = name || this.name;
    };
}

const colors: { grey?: string; gray?: string; blue?: string; loggernamecolor?: string; processcolor?: string; info?: { color?: string; dark?: string; background?: string; highlight?: boolean }; debug?: { color?: string; dark?: string; background?: string; highlight?: boolean }; warn?: { color?: string; dark?: string; background?: string; highlight?: boolean }; error?: { color?: string; dark?: string; background?: string; highlight?: boolean }; fatal?: { color?: string; dark?: string; background?: string; highlight?: boolean } } = {
    grey: '#bbbbbb',
    gray: '#4C4C4C',
    blue: '#48ACF8',
    loggernamecolor: '#4CBAFF',
    processcolor: '#4C70FF',
    info: {
        color: '#59E77D',
        dark: '#11cc37',
        background: '#D2EED9',
        highlight: false,
    },
    debug: {
        color: '#68E3DF',
        dark: '#13aba4',
        background: '#D5F5F4',
        highlight: false,
    },
    warn: {
        color: '#F2D349',
        dark: '#c9a81b',
        background: '#FAEFBB',
        highlight: false,
    },
    error: {
        color: '#F6545C',
        dark: '#dc222c',
        background: '#FACBCD',
        highlight: false,
    },
    fatal   : {
        color: '#F71111',
        dark: '#9b0000',
        background: '#FAACAC',
        highlight: true,
    }
};


/**
 * @author ClassyCrafter
 * @description A super package to create a super customisable and advanced logger
 * @version 2.0.00
 * @license GNU-GPL-3.0
 */


/**
 * The Logger class, represents a Logger
 */
export class Logger {

    public name: string | undefined;
    public timezone: string | undefined;
    public tzformat: number | undefined;
    public dirpath: string | undefined;
    public writelogs: boolean | undefined;
    public enablecustom: boolean | undefined;
    public customisation: { character?: string; gray?: string; namecolor?: string; processcolor?: string; titlecolor?: string; textcolor?: string; datecolor?: string } | undefined;
    public colored: boolean | undefined = true;
    public filepath = '';
    public dateRaw = new Date();
    public date = '';
    public colors = colors;

    /**
     * @constructor
     * @param {LoggerOptions} Options The options related to the Logger
     */
    constructor(Options: LoggerOptions) {
        // Defines  E V E R Y T H I N G
        this.name = Options.name;
        this.timezone = Options.timezone;
        this.tzformat = Options.tzformat;
        this.dirpath = Options.dirpath;
        this.writelogs = Options.writelogs;
        this.enablecustom = Options.enablecustom;
        this.colored = Options.colored;
        this.customisation = Options.custom;
        this.colors = Options.colors ?? colors;

        // Some verifications
        if(!this.name) throw new LoggerError("Please specify the name of the Logger in the constructor.");
        if(!this.timezone) throw new LoggerError("Please specify a timezone in the constructor");
        if(!Utils.isValidTimezone(this.timezone)) throw new LoggerError(`The timezone ${this.timezone} is not a valid timezone.`);
        if(!this.dirpath) this.writelogs === false;
        if(this.writelogs === true && !this.dirpath) throw new LoggerError("The writelogs parameter is enabled, but there is no dirpath specified.");
        if(this.writelogs === true && !Utils.isValidPath(this.dirpath as string)) throw new LoggerError("The dirpath is invalid.");
        // Custom Verifications
        if(this.enablecustom === true && !this.customisation) throw new LoggerError("The enablecustom parameter is enabled, but there is no customisation specified.");
        if(this.enablecustom === true && !this.customisation?.character) throw new LoggerError("The customisation is enabled but there isn't a character.");
        if(this.enablecustom === true && !this.customisation?.gray) throw new LoggerError("The customisation is enabled but there isn't a gray HEX.");
        if(this.enablecustom === true && !Utils.isValidHEX(this.customisation?.gray)) throw new LoggerError("The customisation's gray hexadecimal is invalid.");
        if(this.enablecustom === true && !this.customisation?.namecolor) throw new LoggerError("The customisation is enabled but there isn't a name color in hexadecimal.");
        if(this.enablecustom === true && !Utils.isValidHEX(this.customisation?.namecolor)) throw new LoggerError("The customisation's name color isn't a valid hexadecimal.");
        if(this.enablecustom === true && !this.customisation?.processcolor) throw new LoggerError("The customisation is enabled but there isn't a process color in hexadecimal.");
        if(this.enablecustom === true && !Utils.isValidHEX(this.customisation?.processcolor)) throw new LoggerError("The customisation's process color isn't a valid hexadecimal.");
        if(this.enablecustom === true && !this.customisation?.titlecolor) throw new LoggerError("The customisation is enabled but there isn't a title color in hexadecimal.");
        if(this.enablecustom === true && !Utils.isValidHEX(this.customisation?.titlecolor)) throw new LoggerError("The customisation's title color isn't a valid hexadecimal.");
        if(this.enablecustom === true && !this.customisation?.textcolor) throw new LoggerError("The customisation is enabled but there isn't a text color in hexadecimal.");
        if(this.enablecustom === true && !Utils.isValidHEX(this.customisation?.textcolor)) throw new LoggerError("The customisation's text color isn't a valid hexadecimal.");
        if(this.enablecustom === true && !this.customisation?.datecolor) throw new LoggerError("The customisation is enabled but there isn't a date color in hexadecimal.");
        if(this.enablecustom === true && !Utils.isValidHEX(this.customisation?.datecolor)) throw new LoggerError("The customisation's date color isn't a valid hexadecimal.");

        this.refreshDates();
        // FS Part
        if(this.writelogs === false) return;
        if(!utils.isValidPath(this.dirpath as string)) throw new LoggerError("The dirpath is invalid.");
        //@ts-ignore
        this.filepath = path.join(this.dirpath, `${moment(this.dateRaw).tz(String(this.timezone)).format("D-M-YYYY_HH-mm-ss")}.log`);
    };

    /**
     * Refresh the Logger's dates
     */
    refreshDates(): void {
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
        }
    };

    /**
     * Formats a Log Message into a string
     * @param {LogType} type The type of the log
     * @param {string} message The message
     * @param {string} [msgprocess] The process
     * @returns {string[]} The formatted message (colored and not)
     */
    formatLog(type: LogType, message: string, msgprocess?: string): string[] {
        this.refreshDates();
        if(type !== 'custom') {
            const loggernamecolor = this.colors.loggernamecolor;
            const processcolor = this.colors.processcolor;
            const blue = this.colors.blue;
            const grey = this.colors.grey;
            // @ts-ignore
            const color = this.colors[type].color;
            // @ts-ignore
            const colordark = this.colors[type].dark;
            // @ts-ignore
            const background = this.colors[type].background;
            // @ts-ignore
            const highlight = this.colors[type].highlight;

            const formattedMessage = `[${this.date}] [${this.name}${msgprocess ? ` / ${msgprocess}` : ''}] ${type.toUpperCase()} ▪ ${message}`;
            if (this.colored) {
                return [`${chalk.hex(grey as string)('[')}${chalk.hex(blue as string)(this.date)}${chalk.hex(grey as string)(']')} ${chalk.hex(grey as string)('[')}${chalk.hex(loggernamecolor as string)(this.name)}${msgprocess ? chalk.hex(grey as string)(' / ') : ''}${msgprocess ? chalk.hex(processcolor as string)(msgprocess) : ''}${chalk.hex(grey as string)(']')} ${highlight ? chalk.bgHex(background)(chalk.hex(colordark)(type.toUpperCase())) : chalk.hex(colordark)(type.toUpperCase())} ${chalk.hex(grey as string)('▪')} ${chalk.hex(color)(message)}`, formattedMessage];
            } else {
                return [formattedMessage, formattedMessage];
            }
        } else {
            const loggernamecolor = this.customisation?.titlecolor;
            const processcolor = this.customisation?.processcolor;
            const grey = this.colors.grey;
            const color = this.customisation?.textcolor;
            const colordark = this.customisation?.titlecolor;
            const background = this.customisation?.gray;

            const formattedMessage = `[${this.date}] [${this.name}${msgprocess ? ` / ${msgprocess}` : ''}] LOG ${this.customisation?.character} ${message}`;
            if (this.colored) {
                return [`${chalk.hex(grey as string)('[')}${chalk.hex(this.customisation?.datecolor as string)(this.date)}${chalk.hex(grey as string)(']')} ${chalk.hex(grey as string)('[')}${chalk.hex(loggernamecolor as string)(this.name)}${msgprocess ? chalk.hex(grey as string)(' / ') : ''}${msgprocess ? chalk.hex(processcolor as string)(msgprocess) : ''}${chalk.hex(grey as string)(']')} ${chalk.hex(colordark as string)('LOG')} ${chalk.hex(grey as string)(this.customisation?.character)} ${chalk.hex(this.customisation?.textcolor as string)(message)}`, formattedMessage];
            } else {
                return [formattedMessage, formattedMessage];
            }
        }
    };

    /**
     * Writes a log into the log file
     * @param {string} formattedMessage The formatted message to write!
     */
    writefile(formattedMessage: string): void {
        if(this.writelogs === false) return;
        fs.appendFileSync(this.filepath, formattedMessage + '\n');
    };

    /**
     * Logs an info
     * @param {string} text The text to log as an info
     * @param {string} [msgprocess] The optional ~special~ process
     */
    info(text: string, msgprocess?: string): void {
        this.refreshDates();
        const formattedMessages = this.formatLog("info", text, msgprocess ? msgprocess : undefined);
        console.log(formattedMessages[0]);
        this.writefile(formattedMessages[1]);
    };

    /**
     * Logs a warning
     * @param {string} text The text to log as a warning
     * @param {string} [msgprocess] The optional process attached to this warning
     */
    warn(text: string, msgprocess?: string): void {
        this.refreshDates();
        const formattedMessages = this.formatLog("warn", text, msgprocess ? msgprocess : undefined);
        console.log(formattedMessages[0]);
        this.writefile(formattedMessages[1]);
    };

    /**
     * Logs an error
     * @param {string} text The text to log as a warning
     * @param {string} [msgprocess] The optional process attached to this warning
     */
    error(text: string, msgprocess?: string): void {
        this.refreshDates();
        const formattedMessages = this.formatLog("error", text, msgprocess ? msgprocess : undefined);
        console.log(formattedMessages[0]);
        this.writefile(formattedMessages[1]);
    };

    /**
     * Logs a custom message
     * @param {string} text The text to log
     * @param {string} title The custom title
     * @param {string} [msgprocess] The optional process attached to this log
     */
    custom(text: string, title: string, msgprocess?: string): void {
        this.refreshDates();
        const formattedMessages = this.formatLog("custom", text, msgprocess ? msgprocess : undefined);
        console.log(formattedMessages[0]);
        this.writefile(formattedMessages[1]);
    };

    /**
     * Logs a debug message
     * @param {string} text The text to log
     * @param {string} [msgprocess] The optional process attached to this log
     */
    debug(text: string, msgprocess?: string): void {
        this.refreshDates();
        const formattedMessages = this.formatLog("debug", text, msgprocess ? msgprocess : undefined);
        console.log(formattedMessages[0]);
        this.writefile(formattedMessages[1]);
    };

    /**
     * Logs a fatal message that exits the process
     * @param {string} text The text to log
     * @param {string} [msgprocess] The optional process attached to this log
     */
    fatal(text: string, msgprocess?: string): void {
        this.refreshDates();
        const formattedMessages = this.formatLog("fatal", text, msgprocess ? msgprocess : undefined);
        console.log(formattedMessages[0]);
        this.writefile(formattedMessages[1]);
        process.exit(1);
    };
}