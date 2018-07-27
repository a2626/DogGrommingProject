import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {isValidDate, errorCallBack} from '../../utils.js'
import {bookingAddPUT, userDogsGET} from '../../api.js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

class BookingAdd extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      endTime: null,
      startDateTime: new Date(),
      dogID: "",
      street:"",
      state:"",
      postcode:"",
      country:"",
      description:"",
      errors: {},
      registerSuccess: false
    };
  }

  validBookingRegistration() {
    var validRegistration = true;
    var newErrors = {};

    if (!this.state.startDateTime) {
      newErrors['startDateTime'] = "A start time is required";
      validRegistration = false;
    }
    if (!this.state.endTime) {
      newErrors['endTime'] = "An end time is required";
      validRegistration = false;
    }
    if (this.state.street === "") {
      newErrors['street'] = "Street is required";
      validRegistration = false;
    }
    if (this.state.state === "") {
      newErrors['state'] = "State is required";
      validRegistration = false;
    }
    if (this.state.postcode === "") {
      newErrors['postcode'] = "Postcode is required";
      validRegistration = false;
    }
    if (this.state.country === "") {
      newErrors['country'] = "Country is required";
      validRegistration = false;
    }
    this.setState({errors : newErrors});
    return validRegistration;
  }

  
  attemptBookingRegister() {
    if (this.validBookingRegistration()) {
     	this.postData();
    } else {
      console.log("Errors: " + JSON.stringify(this.state.errors));
    }
  }


 //sending data to back-end to create new booking
  postData() {


    const payload = {
      "email": this.props.email,
      "dogID": this.state.dogID,
      "starttime": this.state.startDateTime.getTime(),
      "endtime": this.state.endTime.getTime(),
      "street":this.state.street,
      "state":this.state.state,
      "postcode":this.state.postcode,
      "country":this.state.country,
      "description":this.state.description
    }
    console.log(payload);
    var selfref = this

    const userBookingCallBack = function(response) {
      selfref.setState({registerSuccess : true});
      selfref.props.getUserBookingData();
    }

    bookingAddPUT(userBookingCallBack, errorCallBack, payload)
  }

  handleChangeDateTimePicker = (dateTime) => {
    this.setState({
      startDateTime: dateTime,
      endTime: new Date((dateTime.getTime()+5400000)),
    });
    console.log(this.state);
  };

  handleChangeDogPicker = (event, index, value) => {
    this.setState({
      dogID: value
    })
  };

  renderDogSelections() {
    return(
      this.props.dogList.map((dog) => {
        return (
          <MenuItem key={dog._id} value={dog._id} primaryText={dog.name} />
        );
      })
    )
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={()=>this.setState({registerSuccess : false})}
      />,
    ];

    return (
      <div>
        Starting Date and Time:
        <div className="date-time-picker">
        <DateTimePicker
          onChange={this.handleChangeDateTimePicker}
          DatePicker={DatePickerDialog}
          TimePicker={TimePickerDialog}
          className='wow'
          minutesStep={10}
          style={{
            justifyContent: 'center',
            textAlign: 'center'}}
          />
        </div>
        <br/>
        Ending Time:
        <TimePicker
          disabled={true}
          format="24hr"
          hintText="Ending time"
          minutesStep={10}
          value={this.state.endTime}
          />
        <br/>
        Select a dog:
        <br/>
        <SelectField
          value={this.state.dogID}
          onChange={this.handleChangeDogPicker}
          >
          {this.renderDogSelections()}
        </SelectField>
        <br/>
        <TextField 
          hintText="Enter your street details" 
          floatingLabelText="Street" 
          errorText= {this.state.errors.street}
          onChange= {(event,newValue) => this.setState({street:newValue})}/>
        <br/>
         <TextField 
          hintText="Enter your state name" 
          floatingLabelText="State" 
          errorText= {this.state.errors.state}
          onChange= {(event,newValue) => this.setState({state:newValue})}/>
        <br/>
        <TextField 
          hintText="Enter your postcode" 
          floatingLabelText="Postcode" 
          errorText= {this.state.errors.postcode}
          onChange= {(event,newValue) => this.setState({postcode:newValue})}/>
        <br/>
       <TextField 
          hintText="Enter your country name" 
          floatingLabelText="Country" 
          errorText= {this.state.errors.country}
          onChange= {(event,newValue) => this.setState({country:newValue})}/>
        <br/>
        <TextField 
          hintText="Enter any comments" 
          floatingLabelText="Comments" 
          errorText= {this.state.errors.description}
          onChange= {(event,newValue) => this.setState({description:newValue})}/>
        <br/>	
        <RaisedButton 
              label="Submit" 
              primary={true} 
              onClick={(event) => this.attemptBookingRegister()}/>

          <Dialog
            actions={actions}
            modal={false}
            open={this.state.registerSuccess}
            onRequestClose={()=>this.setState({registerSuccess : false })}
          >
          Booking successfully added!
          </Dialog>
      </div>
    );
  }
}



export default BookingAdd;