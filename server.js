// Set up express
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
dotenv.load();

var port = process.env.PORT;

server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Load database, schemas and routing paths
var db = require('./server/database/connect.js');
require('./server/database/schema.js');
var routes = require('./server/routes/routes.js');

// Route API requests
server.use('/api',routes);

// Start the server
server.listen(port, function(req,res) {
	console.log("listening on "+port);
});

module.exports.mongoDB = db.mongoDB;
