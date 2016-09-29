'use strict';
var restler    = require('restler'),
	fs    = require('fs'),
	log   = require('./logger'),
	utils = require('./utils');

/**
 * @class
 * Wraps all the APIs related to audio tagging.
 */
class Tags {
	/**
	 * @constructor
	 * @param {Credentials} credentials - An object of containing the user_id and token.
	 */
	constructor(credentials) {
		this.credentials = credentials;

		this.BASE_URL = 'https://dev.liv.ai/liv_speech_api/'
	}

	/**
	 * Uploads a File with the tags to be identified.
	 * @param {string} filepath - The absolute path of the filename with extension as .csv or.txt
	 * @param {string} language - The language used to define the tags. 'EN' = English(default), 'HI' = Hindi
	 * @param {function} callback - A callback that can be provided to collect the result of the API call.
	 */
	uploadTagsFromFile (filepath, language="EN", callback) {

		fs.stat(filepath, (errors, stats) => {
			if (!errors) {
			restler.post(this.BASE_URL + '/tags/', {
				headers: this.credentials.headers,
				multipart: true,
				data: {
					'user': this.credentials.user_id,
					'tag_file': restler.file(filepath, null, stats.size, null),
					'language': language
				}
			}).on('complete', (response) => {
				log.info('Uploaded Tags from file, API response = ' + JSON.stringify(response));
			if (callback) {
				callback(response);
			}
		});
		}
	else {
			log.error(errors)
			if (callback) {
				callback(response);
			}
		}
	});
	}

	/**
	 * Uploads a File from a URL with the tags to be identified.
	 * @param {string} url - The url of the file with extension as .csv or.txt
	 * @param {string} language - The language used to define the tags. 'EN' = English(default), 'HI' = Hindi
	 * @param {function} callback - A callback that can be provided to collect the result of the API call.
	 */
	uploadTagsFromUrl (url, language="EN", callback) {
		utils.downloadFileFromUrl(url, (temporary_filepath) => {
			this.uploadTagsFromFile(temporary_filepath, language, (result) => {
			log.info('Uploaded Tags from URL, API response = ' + JSON.stringify(result));
		fs.unlinkSync(temporary_filepath);
		if (callback) {
			callback(result);
		}
	})
	})
	}


	/**
	 * Uploads a sound file.
	 * @param {string} filepath - The absolute path of the sound file with extension as .mp3,.mp4, .aac
	 * @param {string} language - The language used to define the tags. 'EN' = English(default), 'HI' = Hindi
	 * @param {function} callback - A callback that can be provided to collect the result of the API call.
	 */
	uploadSoundFile (filepath, language="EN", callback) {

		fs.stat(filepath, (errors, stats) => {
			if (!errors) {
			restler.post(this.BASE_URL + '/recordings/', {
				headers: this.credentials.headers,
				multipart: true,
				data: {
					'user': this.credentials.user_id,
					'audio_file': restler.file(filepath, null, stats.size, null),
					'language': language
				}
			}).on('complete', (response) => {
				log.info('Uploaded Tags from file, API response = ' + JSON.stringify(response));
			if (callback) {
				callback(response);
			}
		});
		}
	else {
			log.error(errors)
			if (callback) {
				callback(null);
			}
		}
	});
	}

	/**
	 * Uploads a sound file from a URL.
	 * @param {string} url - The url of the file with extension as .mp3
	 * @param {string} language - The language used to define the tags. 'EN' = English(default), 'HI' = Hindi
	 * @param {function} callback - A callback that can be provided to collect the result of the API call.
	 */
	uploadSoundFromUrl (url, language="EN", callback) {
		utils.downloadFileFromUrl(url, (temporary_filepath) => {
			this.uploadSoundFile(temporary_filepath, language, (result) => {
			log.info('Uploaded Sound file from URL, API response = ' + JSON.stringify(result));
		fs.unlinkSync(temporary_filepath);
		if (callback) {
			callback(result);
		}
	})
	})
	}


	/**
	 * Get the status of a session associated with a session ID.
	 * @param {string} app_session_id - The Unique ID generated after uploading a sound file.
	 * @param {function} callback - A callback that can be provided to collect the result of the API call.
	 */
	getSessionStatus (app_session_id, callback) {
		restler.get(this.BASE_URL + 'session/status/', {
			headers: this.credentials.headers,
			query: {
				app_session_id: app_session_id
			}
		}).on('complete', (response) => {
			if (callback) {
				callback(response)
			}
		})
	}

	/**
	 * Get the tags generated after processing a sound file associated with a session ID (if completed).
	 * @param {string} app_session_id - The Unique ID generated after uploading a sound file.
	 * @param {function} callback - A callback that can be provided to collect the result of the API call.
	 */
	getSessionTags (app_session_id, callback) {
		restler.get(this.BASE_URL + 'session/tags/', {
			headers: this.credentials.headers,
			query: {
				app_session_id: app_session_id
			}
		}).on('complete', (response) => {
			if (callback) {
				callback(response)
			}
		})
	}
}

module.exports = Tags

