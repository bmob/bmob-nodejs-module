
module.exports = function(){
	var logger = {};
    logger.temp = [];

    logger.flush = function () {
        for (var i = 0; i < logger.temp.length; i++) {
            var log = logger.temp[i];
            logger.target[log.level](log.message);
            delete logger.temp[i];
        }
    };

	this.trace = function (message) { logger.temp.push({level: 'trace', message: message}); };
    this.debug = function (message) { logger.temp.push({level: 'debug', message: message}); };
    this.info = function (message) { logger.temp.push({level: 'info', message: message}); };
    this.warn = function (message) { logger.temp.push({level: 'warn', message: message}); };
    this.error = function (message) { logger.temp.push({level: 'error', message: message}); };
    this.fatal = function (message) { logger.temp.push({level: 'fatal', message: message}); };
}