import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {isValidDate, errorCallBack} from '../../utils.js';
import {bookingEditPUT, bookingDELETE} from '../../api.js';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

class BookingDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.activeBooking);

    this.state = {
      newBookingID: this.props.activeBooking._id,
      newDogID: this.props.activeBooking.dogID,
      newStartDateTime: new Date(this.props.activeBooking.starttime),
      newEndTime: new Date(this.props.activeBooking.endtime),
      newStreet:this.props.activeBooking.street,
      newState:this.props.activeBooking.state,
      newPostCode:this.props.activeBooking.postcode,
      newCountry:this.props.activeBooking.country,
      newDescription:this.props.activeBooking.description,
      editingBookingList: false,
      editSuccess: false,
      deletingBooking: false,
      errors: {}
    };
  }


validBookingEdit() {
    var validEdit = true;
    var newErrors = {};

    if (this.state.newBookingID === "") {
      newErrors['bookingID'] = "Booking ID is required";
      validEdit = false;
    }
    if (this.state.newDogID === "") {
      newErrors['dogID'] = "Dog ID is required";
      validEdit = false;
    }
    if (!this.state.newStartDateTime || !this.state.newEndTime) {
      newErrors['startTime or endTime'] = "Input a valid date according to the format";
      validEdit = false;
    }
    if (this.state.newStreet === "") {
      newErrors['street'] = "Street is required";
      validEdit = false;
    }
    if (this.state.newState === "") {
      newErrors['state'] = "State is required";
      validEdit = false;
    }
    if (this.state.newPostCode === "") {
      newErrors['postcode'] = "Postcode is required";
      validEdit = false;
    }
    if (this.state.newCountry === "") {
      newErrors['country'] = "Country is required";
      validEdit = false;
    }
    this.setState({errors : newErrors});
    return validEdit;
  }

  attemptBookingEdit() {
    if (this.validBookingEdit()) {
      console.log("valid booking edit");
      this.postEditData();
    } else {
      console.log("Errors" + JSON.stringify(this.state.errors));
    }
  }


  startEditingBooking() {
    this.setState({
      newStartDateTime: new Date(this.props.activeBooking.starttime),
      newEndTime: new Date(this.props.activeBooking.endtime),
      newDogID: this.props.activeBooking.dogID,
      newState:this.props.activeBooking.state,
      newStreet:this.props.activeBooking.street,
      newCountry:this.props.activeBooking.country,
      newPostCode:this.props.activeBooking.postcode,
      newDescription:this.props.activeBooking.description,
      editingBookingList: true
    });
  }


   //sending data to back-end to edit existing BookingList
  postEditData() {

    const payload = {
      "email": this.props.email,
      "bookingID": this.props.activeBooking._id,
      "dogID": this.props.activeBooking.dogID,
      "starttime": this.state.newStartDateTime.getTime(),
      "endtime": this.state.newEndTime.getTime(),
      "state": this.state.newState,
      "street":this.state.newStreet,
      "country":this.state.newCountry,
      "postcode":this.state.newPostCode,
      "description":this.state.newDescription
    }
    console.log(payload)
    var selfref = this

    const editCallBack = function(response) {
      selfref.props.getUserBookingData();
      selfref.setState({
        editSuccess : true,
        editingBookingList: false
      });
      selfref.props.deselectBooking();
    }

    bookingEditPUT(editCallBack, errorCallBack, payload);
  }

  deleteBooking() {
    const payload = {
      "bookingID": this.props.activeBooking._id
    }

    var selfref = this

    const deleteCallBack = function(response) {
      selfref.props.getUserBookingData();
      selfref.props.getDayBookingData(selfref.props.activeBooking.starttime);
      selfref.props.deselectBooking();
    }

    bookingDELETE(deleteCallBack, errorCallBack, payload);
  }

  handleChangeTimePicker = (event, date) => {
    this.setState({
      timePickerStart: date,
      newStartDateTime:date,
      newEndTime: new Date((date.getTime()+5400000)),
    });
    console.log(date);
  }

  handleChangeDateTimePicker = (dateTime) => {
    this.setState({
      newStartDateTime: dateTime,
      newEndTime: new Date((dateTime.getTime()+5400000)),
    });
  }

  handleChangeDogPicker = (event, index, value) => {
    this.setState({
      newDogID: value
    })
  }

  renderDogSelections() {
    return(
      this.props.dogList.map((dog) => {
        return (
          <MenuItem value={dog._id} primaryText={dog.name} />
        );
      })
    )
  }


  renderDescription() {

    if (this.state.editingBookingList) {
      return (
        <div>
        Starting Date and Time:
        <div className="date-time-picker">
        <DateTimePicker
          onChange={this.handleChangeDateTimePicker}
          DatePicker={DatePickerDialog}
          TimePicker={TimePickerDialog}
          value={this.state.newStartDateTime}
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
          value={this.state.newEndTime}
          />
        <br/>
        Select a dog:
        <br/>
        <SelectField
          value={this.state.newDogID}
          onChange={this.handleChangeDogPicker}
          >
          {this.renderDogSelections()}
        </SelectField>
        <br/>
        <TextField 
          hintText="Enter street details" 
          floatingLabelText="Street" 
          errorText= {this.state.errors.street}
          defaultValue= {this.props.activeBooking.street}
          onChange= {(event,newValue) => this.setState({newStreet:newValue})}/>
        <br/>
        <TextField 
          hintText="Enter state name" 
          floatingLabelText="State" 
          errorText= {this.state.errors.state}
          defaultValue= {this.props.activeBooking.state}
          onChange= {(event,newValue) => this.setState({newState:newValue})}/>
        <br/>
        <TextField 
          hintText="Enter your postcode" 
          floatingLabelText="Postcode" 
          errorText= {this.state.errors.postcode}
          defaultValue= {this.props.activeBooking.postcode}
          onChange= {(event,newValue) => this.setState({newPostCode:newValue})}/>
        <br/>
        <TextField 
          hintText="Enter country name" 
          floatingLabelText="Country" 
          errorText= {this.state.errors.country}
          defaultValue= {this.props.activeBooking.country}
          onChange= {(event,newValue) => this.setState({newCountry:newValue})}/>
        <br/>
         <TextField 
          hintText="Enter comment" 
          floatingLabelText="comment" 
          errorText= {this.state.errors.description}
          defaultValue= {this.props.activeBooking.description}
          onChange= {(event,newValue) => this.setState({newDescription:newValue})}/>
        <br/>
        <RaisedButton 
              label="Submit" 
              primary={true} 
              onClick={(event) => this.attemptBookingEdit()}
              style={{
                marginRight: 10
              }}/>

        <RaisedButton 
              label="Cancel" 
              primary={true} 
              onClick={(event) => this.setState({
                newStartTime: this.props.activeBooking.starttime,
                newEndTime:this.props.activeBooking.endtime,
                newStreet:this.props.activeBooking.street,
                newState:this.props.activeBooking.state,
                newPostCode:this.props.activeBooking.postcode,
                newCountry:this.props.activeBooking.country,
                newDescription:this.props.activeBooking.description,
                editingBookingList : false
              })}/>

      </div>
      );
    } else {
      return (
        <div>
          Date: {new Date(this.props.activeBooking.starttime).toLocaleDateString()}
          <br/>

          Start Time: {new Date(this.props.activeBooking.starttime).toLocaleTimeString()}
          <br/>
  
          End Time: {new Date(this.props.activeBooking.endtime).toLocaleTimeString()}
          <br/>
  
          Street: {this.props.activeBooking.street}
          <br/>

          State: {this.props.activeBooking.state}
          <br/>

          Postcode: {this.props.activeBooking.postcode}
          <br/>
          Country: {this.props.activeBooking.country}
          <br/>
          Comments: {this.props.activeBooking.description}
          <br/>

          <RaisedButton 
              label="Edit" 
              primary={true} 
              onClick={(event) => this.startEditingBooking()}/>

          <RaisedButton 
              style={{marginLeft: 10, color: "red"}}
              label="Delete" 
              secondary={true}
              onClick={(event) => this.setState({
                deletingBooking : true
                })}/>
        </div>
      );
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Confirm"
        primary={true}
        onClick={() => { 
          this.setState({deletingBooking: false});
          this.deleteBooking();
            }
          }
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => 
          this.setState({
            deletingBooking : false
        })}
      />,
    ];
    return(
      <div>
      {this.renderDescription()}
      <Dialog
            actions={actions}
            modal={false}
            open={this.state.deletingBooking}
            onRequestClose={()=>this.setState({deletingBooking : false })}
          >
          Are you sure you want to delete this booking?
          </Dialog>
      </div>
    );
    
  }
}



export default BookingDetails;
