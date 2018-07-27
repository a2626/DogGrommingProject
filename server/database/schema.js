var mongoose = require('mongoose');

var accountSchema = mongoose.Schema(
  {
    "username": String,
    "email": String,
    "phonenumber": String,
    "street": String,
    "state": String,
    "postcode": String,
    "country": String,
    "password": String,
  }
);


var dogSchema = mongoose.Schema(
  {
    "id": mongoose.Schema.Types.ObjectId,
    "email": String,
    "name": String,
    "breed": String,
    "dob": String,
  }
);


var bookingSchema = mongoose.Schema(
  {
    "email": String,
    "dogID": mongoose.Schema.Types.ObjectId,
    "starttime" : Date,
    "endtime" : Date,
    "street": String,
    "state": String,
    "postcode": String,
    "country": String,
    "description": String,
  }
);



mongoose.model('Account', accountSchema);
mongoose.model('Dog', dogSchema);
mongoose.model('Booking', bookingSchema);
