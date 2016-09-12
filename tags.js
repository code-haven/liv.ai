'use strict';


class Tags {
	
	constructor(client) {
		this.client = client;
	}

	uploadTagsFromFile (filepath) {
		console.log(`Uploaded ${filepath}`);
	}


}

module.exports = Tags

