const { Logger, Utils } = require('./index');

const test = new Logger({
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


test.info("This is an info example", "OptionnalProcess");
test.warn("This is a warn example", "OptionnalProcess");
test.error("This is an error example", "OptionnalProcess");
test.custom("This is a custom example", "CustomTitle", "OptionnalProcess");