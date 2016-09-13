# liv.ai.api
---

liv.ai.api is a node package that is a wrapper on top of liv.ai's APIs.

## Installation

    npm install liv.ai.api

## Example Usage

    var Api = require('liv.ai.api');
    var api = Api(<user_id>, <access_token>);


    api.tags.uploadTagsFromFile('<filepath>', '<language>', <callback_function>)
    api.tags.uploadTagsFromUrl('<url>', '<language>', <callback_function>)
    
    api.tags.uploadSoundFile('<filepath>', '<language>', <callback_function>)
    api.tags.uploadSoundFromUrl('<url>', '<language>', <callback_function>)

    api.tags.getSessionStatus('<app_session_id>', <callback_function>);
    api.tags.getSessionTags('<app_session_id>', <callback_function>);



  A more detailed documentation will be updated soon!


## License
MIT