const { Custom } = require('./Custom')

exports.Options = {
    name: String,
    timezone: String,
    tzformat: Number,
    dirpath: String,
    writelogs: Boolean,
    enablecustom: Boolean,
    custom: Custom
}