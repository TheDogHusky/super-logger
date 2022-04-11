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
> To install it, run the following command:
```batch
npm i super-logger
```
> Code Example
```js
const superlogger = require('@classycrafter/super-logger');

const myLogger = new superlogger.Logger({
    name: "Example",
    timezone: "Europe/Paris",
    tzformat: 24,
    dirpath: "./logstest",
    writelogs: true,
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
myLogger.info("This is an info example", "OptionnalProcess");
myLogger.warn("This is a warn example", "OptionnalProcess");
myLogger.error("This is an error example", "OptionnalProcess");
myLogger.custom("This is a custom example", "CustomTitle", "OptionnalProcess");
```
> <img src="https://cdn.discordapp.com/attachments/670181225477963776/961629432123105280/unknown.png" />
> <img src="https://cdn.discordapp.com/attachments/670181225477963776/961632075054710894/unknown.png" />

## Additionnal Informations
> This package is under GNU GPL 3.0.
> Use the package as your wishes. **WE AREN'T RESPONSIBLE FOR WHAT YOU DO WITH THE PACKAGE!**
> You found a bug? Report it on the [GitHub](https://github.com/TheDogHusky/super-logger) or send me an email!
> Any suggestions? Send them on the github by opening an Issue or send me an email!