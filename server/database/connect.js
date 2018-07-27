// Create and connect to database
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Creates a non-persistent database during testing
var mongodbUri = "mongodb://marko:marko@ds113749.mlab.com:13749/dog_grooming"
mongoose.connect(mongodbUri);

var mongoDB = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
mongoDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports.mongoDB = mongoDB;
