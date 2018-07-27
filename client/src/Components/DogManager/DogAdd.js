import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {isValidDate, errorCallBack} from '../../utils.js'
import {dogAddPUT} from '../../api.js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class DogAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dogName: "",
      dogBreed: "",
      dogDOB: "",
      errors: {},
      registerSuccess: false
    };
  }

  validDogRegistration() {
    var validRegistration = true;
    var newErrors = {};

    if (this.state.dogName === "") {
      newErrors['dogName'] = "Dog's name is required";
      validRegistration = false;
    }
    if (this.state.dogBreed === "") {
      newErrors['dogBreed'] = "Dog's breed is required";
      validRegistration = false;
    }
    if (!isValidDate(this.state.dogDOB)) {
      newErrors['dogDOB'] = "Input a valid date according to the format";
      validRegistration = false;
    }

    this.setState({errors : newErrors});
    return validRegistration;

  }

  attemptDogRegister() {
    if (this.validDogRegistration()) {
      this.postData();
    } else {
      console.log("Errors: " + this.state.errors);
    }
  }

  //sending data to back-end to create new dog
  postData() {

    const payload = {
      "email": this.props.email,
      "name": this.state.dogName,
      "breed": this.state.dogBreed,
      "dob": this.state.dogDOB
    }
    console.log(payload)
    var selfref = this

    const registerCallBack = function(response) {
      selfref.setState({registerSuccess : true});
      selfref.props.getDogs();
    }

    dogAddPUT(registerCallBack, errorCallBack, payload)
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
        <TextField 
          hintText="Enter your dog's name" 
          floatingLabelText="Dog Name" 
          errorText= {this.state.errors.dogName}
          onChange= {(event,newValue) => this.setState({dogName:newValue})}/>
        <br/>
        <TextField 
          hintText="Enter your dog's breed" 
          floatingLabelText="Dog Breed" 
          errorText= {this.state.errors.dogBreed}
          onChange= {(event,newValue) => this.setState({dogBreed:newValue})}/>
        <br/>
        <TextField 
          hintText="Enter your dog's date of birth" 
          floatingLabelText="DD/MM/YYYY" 
          errorText= {this.state.errors.dogDOB}
          onChange= {(event,newValue) => this.setState({dogDOB:newValue})}/>
        <br/>
        <RaisedButton 
              label="Submit" 
              primary={true} 
              onClick={(event) => this.attemptDogRegister()}/>

          <Dialog
            actions={actions}
            modal={false}
            open={this.state.registerSuccess}
            onRequestClose={()=>this.setState({registerSuccess : false })}
          >
          Dog successfully added!
          </Dialog>
      </div>
    );
  }
}



export default DogAdd;