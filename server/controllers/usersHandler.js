
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
var Account = mongoDB.model('Account');

// Checks if a username instance already exists within the database
var userAvailable = function(email, resolve, reject){
	Account.find({"email": email.toLowerCase()}).exec().then(function(user){
		// At least one instance was found
		if(user.length!==0){
			resolve(false);
		}
		// Username is available
		else{
			resolve(true);
		}
	}).catch(function(){
		reject();
	});
};

// Adds a user to the database when signing up
var register = function(req,res){
	// Checks if username and password were received
	if (!req.body.username || !req.body.password || !req.body.email){
		genFuncs.badRequestRes(res);
	}
	else{
		// Checks if username doesn't already exist
		var promise = new Promise(function(resolve, reject){
			userAvailable(req.body.email, resolve, reject);
		});
		promise.then(function(available){
			if (available){
				  account = new Account({
					 // convert the username to lowercase for db consistency
					"username": req.body.username,
					"email": req.body.email.toLowerCase(),
					"password": req.body.password,
				});
				account.save(function(err){
					if(!err){
						genFuncs.successCreated(res);
					}
					else{
						genFuncs.dbErrorRes(res);
					}
				});
			}
			else{
				genFuncs.usernameTaken(res);
			}
		}).catch(function() {
			genFuncs.dbErrorRes(res);
		});
	}
};

// Logs user in and resets their authorization token
var login = function (req, res){
	// Checks if username and password were received
	console.log(req.body)
	if (!req.body.email || !req.body.password){
		genFuncs.badRequestRes(res);
	}
	else{
		Account.findOne({"email": req.body.email.toLowerCase()}).exec()
		.then(function(user){
			console.log("USER DATA")
			console.log(user)
			// username does not exist
			if(!user){
				genFuncs.unauthorizedRes(res);
			}
			else if(user.password === req.body.password){
				res.sendStatus(200);
			}
			// password does not match username
			else{
				genFuncs.unauthorizedRes(res);
			}
		}).catch(function(){
			genFuncs.dbErrorRes(res);
		});
	}
};


// Changes the personal details of an account
var changeDetails = function(req, res){

		/*req.body = {
    	"email": "micci@gmail.com",
    	"username": "ben",
    	"phonenumber": "1300367070",
    	"street": "1234 Apple Street",
    	"state": "VIC",
    	"postcode": "1234",
    	"country": "Australia"
		}*/

		// Finds your account document
		Account.findOne({"email": req.body.email.toLowerCase()}).exec()
		.then(function(user){

			// Account doesn't exist
			if(!user){
				console.log("No user!")
				genFuncs.unauthorizedRes(res);
			}
				// Collates account details to save
				var newDetails = {};
				if (req.body.email){
					newDetails.email = req.body.email;
				}
				if (req.body.username){
					newDetails.username = req.body.username;
				}
				if (req.body.phonenumber){
					newDetails.phonenumber = req.body.phonenumber;
				}
				if (req.body.street){
					newDetails.street = req.body.street;
				}
				if (req.body.state){
					newDetails.state = req.body.state;
				}
				if (req.body.postcode){
					newDetails.postcode = req.body.postcode;
				}
				if (req.body.country){
					newDetails.country = req.body.country;
				}
				// Updates your account details
				Account.findByIdAndUpdate(user._id, {$set: newDetails}).exec()
				.then(function(){
					console.log("success")
					// Confirm success
					genFuncs.successNoData(res);
				}).catch(function(){
					genFuncs.dbErrorRes(res);
				});

		}).catch(function(){
			genFuncs.dbErrorRes(res);
		});

};


// Get the personal details of an account
var getDetails = function(req, res){

	/*req.body = {
		"email": "micci@gmail.com",
	}*/

  // Finds the users account
  Account.findOne({"email": req.body.email.toLowerCase()}).exec()
  .then(function(user){
    // Specified user no longer exists
    if(!user){
      genFuncs.targetConflictRes(res);
    }
    else{
      // Return the user's profile picture if one has been selected
        res.status(200).json({
		    	"email":user.email,
		    	"username": user.username,
		    	"phonenumber": user.phonenumber,
		    	"street": user.street,
		    	"state": user.state,
		    	"postcode": user.postcode,
		    	"country": user.country,
				});
      }
    }).catch(function(){ // db query failed
    genFuncs.dbErrorRes(res);
  });
};



module.exports.register = register;
module.exports.login = login;
module.exports.changeDetails = changeDetails;
module.exports.getDetails = getDetails;
