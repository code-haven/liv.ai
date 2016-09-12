'use strict';
var Tags = require('./tags')


class AuthClient {
	constructor(user_id, token) {
		this.user_id = user_id;
		this.token   = token;
	}
}


class Api {
	constructor(user_id, token) {
		const client = new AuthClient(user_id, token);

		this.tags = new Tags(client);
	}
}

module.exports = Api

