const path = require('path')
const fs = require('fs')

let { log, trace } = console

module.exports = async function (name = 'server_catch_errors.log') {
	name = path.join('/root', name)
	let logFile = fs.createWriteStream(name, { flags: 'a', encoding: 'utf8' })

	process.on('unhandledRejection', (reason, p) => {
		p.catch(err => {
			let msg = `[${new Date().toLocaleString()}] unhandledRejection\n${err.stack || err.message}\n`;
			if (logFile) logFile.write(msg)
			trace(msg, reason)
		})
	})

	process.on('uncaughtException', (err) => {
		let msg = `[${new Date().toLocaleString()}] uncaughtException\n${err.stack || err.message}\n`
		if (logFile) logFile.write(msg)
		trace(msg)
	})

	log(`[service] Start log mode. ${logFile ? name : 'console'}`)
	
	return logFile
}

