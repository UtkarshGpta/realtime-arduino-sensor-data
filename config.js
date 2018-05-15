var config = {};

config.db = {};
config.db.name = 'heroku_5pxr3rhr';
config.db.localhost = 'mongodb://localhost';
config.db.port = 27017;	//Local MongoDB Port Number. Change as required.

config.pubsub = {};
config.pubsub.publishKey = 'YOUR_PUBSUB_PUBLISHKEY';
config.pubsub.subscribeKey = 'YOUR_PUBSUB_SUBSCRIBEKEY';

module.exports = config;
