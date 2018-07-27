import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {isValidDate, errorCallBack} from '../../utils.js';
import {dogEditPUT, dogDELETE} from '../../api.js';

class DogDetails extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.activeDog);

    this.state = {
      newDogID: this.props.activeDog._id,
      newDogName: this.props.activeDog.name,
      newDogBreed: this.props.activeDog.breed,
      newDogDOB: this.props.activeDog.dob,
      editingDog: false,
      editSuccess: false,
      deletingDog: false,
      errors: {}
    };
  }

  validDogEdit() {
    var validEdit = true;
    var newErrors = {};

    if (this.state.newDogName === "") {
      newErrors['dogName'] = "Dog's name is required";
      validEdit = false;
    }
    if (this.state.newDogBreed === "") {
      newErrors['dogBreed'] = "Dog's breed is required";
      validEdit = false;
    }
    if (!isValidDate(this.state.newDogDOB)) {
      newErrors['dogDOB'] = "Input a valid date according to the format";
      validEdit = false;
    }

    this.setState({errors : newErrors});
    return validEdit;
  }

  attemptDogEdit() {
    if (this.validDogEdit()) {
      console.log("valid dog edit");
      this.postEditData();
    } else {
      console.log("Errors" + this.state.errors);
    }
  }

  startEditingDog() {
    this.setState({
      newDogName: this.props.activeDog.name,
      newDogBreed: this.props.activeDog.breed,
      newDogDOB: this.props.activeDog.dob,
      editingDog: true
    });
  }

  //sending data to back-end to edit existing dog
  postEditData() {

    const payload = {
      "email": this.props.email,
      "dogID": this.props.activeDog._id,
      "name": this.state.newDogName,
      "breed": this.state.newDogBreed,
      "dob": this.state.newDogDOB
    }
    console.log(payload)
    var selfref = this

    const editCallBack = function(response) {
      selfref.props.getDogs();
      selfref.setState({
        editSuccess : true,
        editingDog: false
      });
      selfref.props.deselectDog();
    }

    dogEditPUT(editCallBack, errorCallBack, payload);
  }

  deleteDog() {
    const payload = {
      "dogID": this.props.activeDog._id
    }

    var selfref = this

    const deleteCallBack = function(response) {
      selfref.props.getDogs();
      selfref.props.deselectDog();
    }

    dogDELETE(deleteCallBack, errorCallBack, payload);
  }

  renderDescription() {

    if (this.state.editingDog) {
      return (
        <div>
        <TextField 
          hintText="Enter your dog's name" 
          floatingLabelText="Dog Name" 
          errorText= {this.state.errors.dogName}
          defaultValue= {this.props.activeDog.name}
          onChange= {(event,newValue) => this.setState({newDogName:newValue})}/>
        <br/>
        <TextField 
          hintText="Enter your dog's breed" 
          floatingLabelText="Dog Breed" 
          errorText= {this.state.errors.dogBreed}
          defaultValue= {this.props.activeDog.breed}
          onChange= {(event,newValue) => this.setState({newDogBreed:newValue})}/>
        <br/>
        <TextField 
          hintText="Enter your dog's date of birth" 
          floatingLabelText="DD/MM/YYYY" 
          errorText= {this.state.errors.dogDOB}
          defaultValue= {this.props.activeDog.dob}
          onChange= {(event,newValue) => this.setState({newDogDOB:newValue})}/>
        <br/>
        <RaisedButton 
              label="Submit" 
              primary={true} 
              onClick={(event) => this.attemptDogEdit()}
              style={{
                marginRight: 10
              }}/>

        <RaisedButton 
              label="Cancel" 
              primary={true} 
              onClick={(event) => this.setState({
                newDogName: this.props.activeDog.name,
                newDogBreed: this.props.activeDog.breed,
                newDogDOB: this.props.activeDog.dob,
                editingDog : false
              })}/>

      </div>
      );
    } else {
      return (
        <div>
          Name: {this.props.activeDog.name}
          <br/>
  
          Breed: {this.props.activeDog.breed}
          <br/>
  
          Date of Birth: {this.props.activeDog.dob}
          <br/>
          <RaisedButton 
              label="Edit" 
              primary={true} 
              onClick={(event) => this.startEditingDog()}/>

          <RaisedButton 
              style={{marginLeft: 10, color: "red"}}
              label="Delete" 
              secondary={true}
              onClick={(event) => this.setState({
                deletingDog : true
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
          this.setState({deletingDog: false});
          this.deleteDog();
            }
          }
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => 
          this.setState({
            deletingDog : false
        })}
      />,
    ];
    return(
      <div>
      {this.renderDescription()}
      <Dialog
            actions={actions}
            modal={false}
            open={this.state.deletingDog}
            onRequestClose={()=>this.setState({deletingDog : false })}
          >
          Are you sure you want to delete this dog?
          </Dialog>
      </div>
    );
    
  }
}



export default DogDetails;