const log4js = require("log4js")

// const levels = {
// 	all: log4js.levels.ALL,
// 	trace: log4js.levels.TRACE,
// 	debug: log4js.levels.DEBUG,
// 	info: log4js.levels.INFO,
// 	warn: log4js.levels.WARN,
// 	error: log4js.levels.ERROR,
// 	fatal: log4js.levels.FATAL,
// 	mark: log4js.levels.MARK,
// 	off: log4js.levels.OFF
// }

log4js.configure({
	appenders: {
		console: { type: "console", /* layout:{type:"colored"} */},
		logger:{type:"file",filename:"./log/logger.log"}
	},
	categories: {
		default: { appenders: ["console"], level: "off" },
		logger: { appenders: ["console"], level: "debug" }
	}
});

let logger=log4js.getLogger("logger")

module.exports = logger