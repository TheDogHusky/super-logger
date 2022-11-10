import * as sl from './index';

const test = new sl.Logger({
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


test.info("This is an info example", "OptionalProcess");
test.warn("This is a warn example", "OptionalProcess");
test.error("This is an error example", "OptionalProcess");
test.debug("This is a debug example", "OptionalProcess");
test.custom("This is a custom example", "CustomTitle", "OptionalProcess");
test.fatal("This is a fatal example", "OptionalProcess");