
// Require dependencies
var express = require('express');
var controller = express.Router();
var mongoose = require('mongoose');
var genFuncs = require('./generalFunctions.js');
var Promise = require('bluebird');

// Connect to the database
var dbConnect = require('../database/connect.js');
var mongoDB = dbConnect.mongoDB;

// Compile appropriate schema into documents
var Dog = mongoDB.model('Dog');

// Adds a dog to the database
var addDog = function(req,res){

   /*req.body = {
    "email": "mmihic@gmail.com",
    "name": "pinko",
    "breed": "breed nub",
  }*/

	// Checks if username and password were received
	if (!req.body.name || !req.body.email){
		genFuncs.badRequestRes(res);
	}
	else{
				  dog = new Dog({
					"name": req.body.name,
					"email": req.body.email.toLowerCase(),
					"breed": req.body.breed,
          "dob": req.body.dob,
				});
				dog.save(function(err){
					if(!err){
						genFuncs.successCreated(res);
					}
					else{
						genFuncs.dbErrorRes(res);
					}
				});

			}
}

var editDog = function(req, res){

		/*req.body = {
    	"email": "micci@gmail.com",
      "dogID": "5ae9defc64d5de92d07ed7bf",
      "name": "woofi",
      "breed": "Gold boy",
      "dob": "20/04/2016"
		}*/

    // Checks if username and password were received
    if (!req.body.dogID){
      genFuncs.badRequestRes(res);
    }else{
  		var newDetails = {};
  		if (req.body.email){
  			newDetails.email = req.body.email;
  		}
  		if (req.body.dogID){
  			newDetails.dogID = req.body.dogID;
  		}
  		if (req.body.name){
  			newDetails.name = req.body.name;
  		}
      if (req.body.breed){
  			newDetails.breed = req.body.breed;
  		}
      if (req.body.dob){
  			newDetails.dob = req.body.dob;
  		}

  		Dog.findByIdAndUpdate(req.body.dogID, {$set: newDetails}).exec()
  		.then(function(){
  			console.log("success")
  			// Confirm success
  			genFuncs.successNoData(res);
  		}).catch(function(){
  			genFuncs.dbErrorRes(res);
  		});
  }
};


// Deletes all traces of a dog
var deleteDog = function (req, res){

  /* req.body = {
    "dogID": "5ae9defc64d5de92d07ed7bf",
  }*/

  if (!req.body.dogID){
    genFuncs.badRequestRes(res);
  }else{
    Dog.findByIdAndRemove(req.body.dogID).exec()
    .then(function(){
      console.log("success")
      // Confirm success
      genFuncs.successNoData(res);
    }).catch(function(){
      genFuncs.dbErrorRes(res);
    });
	}
};


var getUserDogs = function (req, res){

  /*req.body = {
    "email": "mmihic@gmail.com",
  }*/

  if (!req.body.email){
    genFuncs.badRequestRes(res);
  }else{
    Dog.find({"email": req.body.email.toLowerCase()}).exec()
    .then(function(dogs){
      console.log("success")
      // Confirm success
      res.status(200).json({"dogList":dogs});
    }).catch(function(){
      genFuncs.dbErrorRes(res);
    });
	}
};


module.exports.addDog = addDog;
module.exports.editDog = editDog;
module.exports.deleteDog = deleteDog;
module.exports.getUserDogs = getUserDogs;
