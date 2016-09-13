'use strict';
var Tags = require('./tags')


class Credentials {
	constructor(user_id, token) {
		this.user_id = user_id;
		this.token   = token;

		this.headers = {
			'Authorization': `Token ${this.token}`
		}
	}


}


class Api {
	constructor(user_id, token) {
		const credentials = new Credentials(user_id, token);

		this.tags = new Tags(credentials);
	}
}

module.exports = Api

