(function() {
	var request = require('request'),
		log 	= require('./logger'),
		fs   	= require('fs');

	module.exports.downloadFileFromUrl = function(source_url, callback) {

		request(source_url).on('response', (response) => {
			console.log(response.headers);
			const destination_filepath = `/tmp/${response.headers['content-disposition'].split('"')[1]}`

			response.pipe(fs.createWriteStream(destination_filepath))
				.on('finish', () => {
					callback(destination_filepath);
				});
		});
	}
}());