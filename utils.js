(function() {
	var request = require('request'),
		log 	= require('./logger'),
		fs   	= require('fs');

	module.exports.downloadFileFromUrl = function(source_url, callback, error_callback) {

		request(source_url).on('response', (response) => {
			log.info(response.headers);
		log.info('Content length? ' + response.headers.hasOwnProperty("content-length"));

		if (response.headers.hasOwnProperty("content-length")) {
			if (response.headers["content-length"] != 0) {
				var destination_filepath = `/tmp/${response.headers['content-disposition']}`;
				response.pipe(fs.createWriteStream(destination_filepath))
					.on('finish', () => {
					callback(destination_filepath);
			});
			} else
				callback(null);

		}
		else
			callback(null);
	});
	}
}());