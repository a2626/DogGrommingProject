
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
var Booking = mongoDB.model('Booking');
var Dog = mongoDB.model('Dog');
var Account = mongoDB.model('Account');

// Adds a booking to the database
var addBooking = function(req,res){

   /*req.body = {
    "email": "mmihic@gmail.com",
    "dogID": "5aedbfca11acdc2e70f00c51",
    "starttime" : 1525433227000,
    "endtime" : 1525438627000,
    "street": "1234 Apple Street",
    "state": "VIC",
    "postcode": "1234",
    "country": "Australia",
    "description": "The doorbell does not work, please call instead. "
	}*/

	// Checks if username and password were received
	if (!req.body.email || !req.body.dogID || !req.body.starttime || !req.body.endtime || !req.body.street){
		genFuncs.badRequestRes(res);
	}
	else{
      var available = true
      var validDetails = false
      //Check that the email and dogId exist, also the dog is owned by user
      Dog.find({"email": req.body.email.toLowerCase()}).exec()
      .then(function(dogs){
        for(var i = 0; i < dogs.length  ; i++){
           if(dogs[i]._id == req.body.dogID){
             validDetails = true
           }
        }


        //Ensure start and end of booking is 90 minutes long
        if(req.body.endtime - req.body.starttime != 5400000){
          validDetails = false
        }

        //ensuring we don't have a booking clash
        Booking.find({}).exec()
        .then(function(bookings){

          for(var i = 0; i < bookings.length ; i++){

             //console.log(bookings[i].starttime.getTime())
             //console.log(bookings[i].endtime.getTime())
             //console.log(req.body.starttime)
             //console.log(req.body.endtime)

              //if starttime is between this booking session, we are invalid
             if(bookings[i].starttime <= req.body.starttime && bookings[i].endtime > req.body.starttime ){

               available = false
             }

             //if endtime is between this booking session, we are invalid
             if(bookings[i].starttime < req.body.endtime && bookings[i].endtime >= req.body.endtime ){
                available = false
             }
          }


          if(validDetails && available){
              //The user and dog is valid, now need to ensure booking is valid
              booking = new Booking({
              "email": req.body.email,
              "dogID": req.body.dogID,
              "starttime" : req.body.starttime,
              "endtime" : req.body.endtime,
              "street": req.body.street,
              "state": req.body.state,
              "postcode": req.body.postcode,
              "country": req.body.country,
              "description": req.body.description,
            });

            booking.save(function(err){
              if(!err){
                genFuncs.successCreated(res);
              }
              else{
                genFuncs.dbErrorRes(res);
              }
            });

          }else{
             //invalid details provided dog or user not found
              if(!validDetails){
                genFuncs.unauthorizedRes(res);
              }else{
                res.status(409).json({"error": "Booking time cannot be made due to time conflict. "});
              }
          }


        }).catch(function(){
          genFuncs.dbErrorRes(res);
        });



      }).catch(function(error){
        genFuncs.dbErrorRes(res);
      });

			}
}


var getDayBookings = function (req, res){

  /*req.body = {
    "email": "mmihic@gmail.com",
    "date": "1521581857000"
  }*/


  var requestDay = new Date(req.body.date/1);
  var day = requestDay.getDate();
  var month = requestDay.getMonth()+1; //January is 0!
  var year = requestDay.getFullYear();


  if (!req.body.email || !req.body.date ){
    genFuncs.badRequestRes(res);
  }else{

    Account.find({"email": req.body.email.toLowerCase()}).exec().then(function(user){
      // At least one instance was found
      if(user.length!==0){

        //Finding bookings for the user
        Booking.find({}).exec()
        .then(function(bookings){

          var bookingsForToday = []

          for(var i = 0; i < bookings.length ; i++){
             bookingDate = bookings[i].starttime
            //Checking all bookings for provided date
              dayBooking = bookingDate.getDate()
              monthBooking = bookingDate.getMonth()+1
              yearBooking = bookingDate.getFullYear()

             if(day == dayBooking&&  month == monthBooking && year == yearBooking){
               //console.log("day of booking " + dayBooking)
               //console.log("month of booking " + monthBooking)
               //console.log("year of booking " + yearBooking)
              var limitedBooking = {
                "_id": bookings[i]._id,
                "starttime": bookings[i].starttime,
                "endtime": bookings[i].endtime
              };

               bookingsForToday.push(limitedBooking)
             }

          }

          res.status(200).json({"bookinglist":bookingsForToday});

        })


      }  else{
        genFuncs.unauthorizedRes(res);
      }
    }).catch(function(){
      genFuncs.dbErrorRes(res);
    });



	}
}

var getUserBookings = function (req, res){
    /*req.body = {
    "email": "mmihic@gmail.com",
  }*/


  if (!req.body.email ){
    genFuncs.badRequestRes(res);
  }else{

    Account.find({"email": req.body.email.toLowerCase()}).exec().then(function(user){
      // At least one instance was found
      if(user.length!==0){

        //Finding bookings for the user
        Booking.find({"email": req.body.email.toLowerCase()}).exec()
        .then(function(bookings){

          var bookingsForUser = []

          for(var i = 0; i < bookings.length ; i++){

            bookingsForUser.push(bookings[i])

          }

          res.status(200).json({"bookinglist":bookingsForUser});

        })


      }  else{
        genFuncs.unauthorizedRes(res);
      }
    }).catch(function(){
      genFuncs.dbErrorRes(res);
    });
  }
}


var getDayBookingsAdmin = function (req, res){

  /*req.body = {
    "date": "1518919420000",
  }*/


  var requestDay = new Date(req.body.date/1);
  var day = requestDay.getDate();
  var month = requestDay.getMonth()+1; //January is 0!
  var year = requestDay.getFullYear();


  if (!req.body.date ){
    genFuncs.badRequestRes(res);
  }else{


      // At least one instance was found

        //Finding bookings for the user
        Booking.find({}).exec()
        .then(function(bookings){
					console.log(bookings)
          var bookingsForToday = [];

          for(var i = 0; i < bookings.length ; i++){
             bookingDate = bookings[i].starttime
            //Checking all bookings for provided date
              dayBooking = bookingDate.getDate()
              monthBooking = bookingDate.getMonth()+1
              yearBooking = bookingDate.getFullYear()

							//console.log("day of booking " + dayBooking)
							//console.log("month of booking " + monthBooking)
							//console.log("year of booking " + yearBooking)
             if(day == dayBooking && month == monthBooking && year == yearBooking){

               bookingsForToday.push(bookings[i])
             }

          }

          res.status(200).json({"bookinglist":bookingsForToday});

        })


	}
};

// Deletes all traces of a booking
var deleteBooking = function (req, res){

   /*req.body = {
    "bookingID": "5aeeb46faff18d3bb4e901c4",
  }*/

  if (!req.body.bookingID){
    genFuncs.badRequestRes(res);
  }else{
    Booking.findByIdAndRemove(req.body.bookingID).exec()
    .then(function(){
      // Confirm success
      genFuncs.successNoData(res);
    }).catch(function(){
      genFuncs.dbErrorRes(res);
    });
	}
};



var editBooking = function(req, res){

    /*req.body = {
     "bookingID": "5aeeb4b5943a92523cda8174",
     "dogID": "5aedbfca11acdc2e70f00c51",
     "starttime" : 1518903627000,
     "endtime" : 1518909027000,
     "street": "U123hhhhhhreet",
     "state": "MUVhhhhhhIC",
     "postcode": "MU12MU12hhhhhh34",
     "country": "MUAustrhhhhhhhhalia",
     "description": "MUThe doorbell does nohhhhhhhhhht work, please call instead. "
   }*/

    if (!req.body.bookingID || !req.body.starttime || !req.body.endtime ){
      genFuncs.badRequestRes(res);
    }else{

      var available = true
      var validDetails = true
        //Ensure start and end of booking is 90 minutes long
        if(req.body.endtime - req.body.starttime != 5400000){
          validDetails = false
        }

        //ensuring we don't have a booking clash
        Booking.find({}).exec()
        .then(function(bookings){
          for(var i = 0; i < bookings.length ; i++){

              //if starttime is between this booking session, we are invalid
             if(bookings[i].starttime <= req.body.starttime && bookings[i].endtime >= req.body.starttime ){
               //the booking is not this booking
               if(bookings[i]._id != req.body.bookingID){
                      available = false
               }
             }

             //if endtime is between this booking session, we are invalid
             if(bookings[i].starttime <= req.body.endtime && bookings[i].endtime >= req.body.endtime ){
               //the booking is not this booking
               if(bookings[i]._id != req.body.bookingID){
                     available = false

               }
             }
          }

          //updating booking if all is valid
          if(available && validDetails){
            var newDetails = {};

            if (req.body.dogID){
              newDetails.dogID = req.body.dogID;
            }
            if (req.body.starttime){
              newDetails.starttime = req.body.starttime;
            }
            if (req.body.endtime){
              newDetails.endtime = req.body.endtime;
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
            if (req.body.description){
              newDetails.description = req.body.description;
            }


            Booking.findByIdAndUpdate(req.body.bookingID, {$set: newDetails}).exec()
            .then(function(){

              genFuncs.successNoData(res);
            }).catch(function(){
              genFuncs.dbErrorRes(res);
            });
        }else{
          //invalid details provided dog or user not found
           if(!validDetails){
             genFuncs.unauthorizedRes(res);
           }else{
             res.status(409).json({"error": "Booking time cannot be made due to time conflict. "});
           }
        }


        }).catch(function(error){
          console.log(error)
            genFuncs.dbErrorRes(res);
        });

  }

};



module.exports.editBooking = editBooking;
module.exports.deleteBooking = deleteBooking;
module.exports.getDayBookings = getDayBookings;
module.exports.getUserBookings = getUserBookings;
module.exports.getDayBookingsAdmin = getDayBookingsAdmin;
module.exports.addBooking = addBooking;
