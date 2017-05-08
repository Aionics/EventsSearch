function f_logger(logfilePath) {
    const fs = require('fs');

    function formatMessage(level, message) {
        let date = new Date()

        return `[${level} # ${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] >>> ${JSON.stringify(message)}`
    }

    let logger = {
        info: function (message) {
            let fmtMessage = formatMessage('INFO', message)
            console.log(fmtMessage);
            fs.appendFile(logfilePath, fmtMessage + `\n`, err => {
                if (err) throw err;
            })
        },
        error: function (message) {
            let fmtMessage = formatMessage('ERROR', message)
            console.log(fmtMessage);
            fs.appendFile(logfilePath, fmtMessage + `\n`, err => {
                if (err) throw err;
            })
        },
        debug: function (message) {
            let fmtMessage = formatMessage('DEBUG', message)
            console.log(fmtMessage);
        }
    };

    return logger;
}

module.exports = f_logger;
