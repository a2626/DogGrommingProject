
// Require dependencies
var express = require('express');
var usersHandler = require('../controllers/usersHandler.js');
var dogHandler = require('../controllers/dogHandler.js');
var bookingHandler = require('../controllers/bookingHandler.js');

// Initialise express and router
var app = express();
var router = express.Router();

// Test route
router.get('/', function(req, res) {
    res.json({ message: 'Looking good! ;)' });
});




//////////////////////USERS///////////////////////
// Account Registration
router.post('/users/register', usersHandler.register);
// Account Login
router.post('/users/login', usersHandler.login);
//Account Details change
router.post('/users/changeDetails',usersHandler.changeDetails);

//Get Account details
router.post('/users/getDetails',usersHandler.getDetails);



////////////////////DOGS//////////////////////////
//Add new dog
router.post('/dogs/addDog',dogHandler.addDog);

//Edit existing dogs
router.post('/dogs/editDog',dogHandler.editDog);

//delete existing dogs
router.post('/dogs/deleteDog',dogHandler.deleteDog);


//get all dogs for a users
router.post('/dogs/getDogs',dogHandler.getUserDogs);


//////////////////BOOKINGS///////////////////////
//add a new booking
router.post('/bookings/addBooking',bookingHandler.addBooking)

//Get bookings for a day
router.post('/bookings/getDayBookings',bookingHandler.getDayBookings);

//Get bookings for a user
router.post('/bookings/getUserBookings',bookingHandler.getUserBookings);

//Delete booking with an ID
router.post('/bookings/deleteBooking',bookingHandler.deleteBooking);


//Edit booking
router.post('/bookings/editBooking',bookingHandler.editBooking);

//Get bookings for a day for a dog groomer
router.post('/bookings/getDayBookingsAdmin',bookingHandler.getDayBookingsAdmin);

module.exports = router;
