<div align="center">
  <br />
  <p>
    <a href="https://discord.js.org"><img src="https://cdn.discordapp.com/attachments/670181225477963776/961630186686775376/superlogger.png" width="546" alt="super-logger" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/Vh4bnWP5tc"><img src="https://img.shields.io/discord/605900262581993472?color=5865F2&logo=discord&logoColor=white" alt="Discord Server" /></a>
    <a href="https://www.npmjs.com/package/@classycrafter/super-logger"><img src="https://img.shields.io/npm/v/@classycrafter/super-logger.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/@classycrafter/super-logger"><img src="https://img.shields.io/npm/dt/@classycrafter/super-logger.svg?maxAge=3600" alt="npm downloads" /></a>
  </p>
</div>

> A super customisable and advanced logger.

## Utilisation & Examples
To install it, run the following command:
```batch
npm i @classycrafter/super-logger
```
Code Example
```js
const superlogger = require('@classycrafter/super-logger');

const myLogger = new superlogger.Logger({
    name: "Example",
    timezone: "Europe/Paris",
    tzformat: 24,
    dirpath: "./logstest",
    writelogs: true,
    colored: true,
    custom: {
        character: "*",
        gray: "#bbbbbb",
        namecolor: "#ff0000",
        processcolor: "#ff6400",
        titlecolor: "#00ff78",
        textcolor: "#00ff8f",
        datecolor: "#00a6ff"
    }
});


// Examples
myLogger.info("This is an info example", "OptionalProcess");
myLogger.warn("This is a warn example", "OptionalProcess");
myLogger.error("This is an error example", "OptionalProcess");
myLogger.debug("This is a debug example", "OptionalProcess");
myLogger.custom("This is a custom example", "CustomTitle", "OptionalProcess");
myLogger.fatal("This is a fatal example", "OptionalProcess");
```
> <img alt="Screen1" src="https://cdn.discordapp.com/attachments/670181225477963776/1040413208986533889/image.png" />
> <img alt="Screen2" src="https://cdn.discordapp.com/attachments/670181225477963776/1040413262770081863/image.png" />

> **Remark** You can alse customise the whole logger colors with the "colors" property in the logger options.
```js
const superlogger = require('@classycrafter/super-logger');

const myLogger = new superlogger.Logger({
    name: "Example",
    timezone: "Europe/Paris",
    tzformat: 24,
    dirpath: "./logstest",
    writelogs: true,
    colored: true,
    colors: {
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
    }
});
```
**Added support for typescript!**
```ts
import * as superlogger from '@classycrafter/super-logger';

const myLogger = new superlogger.Logger({
    name: "Example",
    timezone: "Europe/Paris",
    tzformat: 24,
    dirpath: "./logstest",
    writelogs: true,
    colored: true,
    custom: {
        character: "*",
        gray: "#bbbbbb",
        namecolor: "#ff0000",
        processcolor: "#ff6400",
        titlecolor: "#00ff78",
        textcolor: "#00ff8f",
        datecolor: "#00a6ff"
    }
});
```
## What's new?
In version 1.1.32 we fixed a big bug with the writeLogs and all things related to files. Please download latest release for a better experience.
In version 1.1.33 we just added those What's New things.
In version 1.4.34 we changed the way to stock logs. Now it's in multiple files ! In 1.4.35 we added that to the readme since we forgot...
> **New Version** 2.0.00 -- Changed:
> - The logfile names for a better look
> - Added support for typescript (remake of the whole package from 0)
> - Optimised the package
> - Added a new property in the logger options: "colors" (possibility to customise the whole logger colors)
> - Added "debug" function
> - Added "fatal" function (which is the same as "error" but with a different color & exits the process)
## Additional Information
This package is under GNU GPL 3.0.
Use the package as your wishes. **WE AREN'T RESPONSIBLE FOR WHAT YOU DO WITH THE PACKAGE!**
You found a bug? Report it on the [GitHub](https://github.com/TheDogHusky/super-logger) or send me an email (contact@classy.works)!
Any suggestions? Send them on the [GitHub](https://github.com/TheDogHusky/super-logger) by opening an Issue or send me an email (contact@classy.works)!