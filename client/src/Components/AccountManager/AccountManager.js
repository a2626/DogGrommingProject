import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardTitle,CardActions} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router-dom';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import {userInformationEditPUT} from '../../api.js';
import { errorCallBack } from '../../utils.js';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class AccountManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
      email: "",
      username: "",
      phonenumber: "",
      street: "",
      state: "",
      postcode: "",
      country: "",
      errors: {},
      editingUsername: false,
      editingPhonenumber: false,
      editingStreet: false,
      editingState: false,
      editingPostcode: false,
      editingCountry: false,
      editSuccess: false,
      changedUsername: false,
      changedPhonenumber: false,
      changedStreet: false,
      changedState: false,
      changedPostcode: false,
      changedCountry:false,
      anyChange:false
    };
    
  }

  componentDidMount() {
    this.props.getUserData();
  }

  //Ensuring all the data in the registration form pases requirements
  validAccountInformation() {

    var formIsValid = true;
    var newErrors = {};

    if (this.state.changedUsername) {
      if (this.state.username === "") {
        newErrors['username'] = "Username is required"
        formIsValid = false;
      }
    }

    if (this.state.changedPhonenumber) {
      if (this.state.phonenumber === "") {
        newErrors['phonenumber'] = "Phone number is required"
        formIsValid = false;
      }
    }

    if (this.state.changedStreet) {
      if (this.state.street === "") {
        newErrors['street'] = "Street is required"
        formIsValid = false;
      }
    }

    if (this.state.changedState) {
      if (this.state.state === "") {
        newErrors['state'] = "State is required"
        formIsValid = false;
      }
    }

    if (this.state.changedPostcode) {
      if (this.state.postcode === "") {
        newErrors['postcode'] = "Postcode is required"
        formIsValid = false;
      }
    }

    if (this.state.changedCountry) {
      if (this.state.country === "") {
        newErrors['country'] = "Country is required"
        formIsValid = false;
      }
    }

    this.setState({errors: newErrors});
    return formIsValid;
  }

  attemptUserInformationChange() {
    if (this.validAccountInformation()) {
      this.postData();
    } else {
      console.log("Errors: " + JSON.stringify(this.state.errors));
    }
  }



  // I'm not sure if I store the data here which can send the data to back-end?
  postData(){

    var payload = {
      "email": this.props.email
    };

    if (this.state.changedUsername) {
      payload.username = this.state.username;
    }
    if (this.state.changedPhonenumber) {
      payload.phonenumber = this.state.phonenumber;
    }
    if (this.state.changedStreet) {
      payload.street = this.state.street;
    }
    if (this.state.changedState) {
      payload.state = this.state.state;
    }
    if (this.state.changedPostcode) {
      payload.postcode = this.state.postcode;
    }
    if (this.state.changedCountry) {
      payload.country = this.state.country;
    }

    console.log(payload)
    var selfref = this

    const accountChangeCallBack = function(response) {
      selfref.props.getUserData();
      selfref.setState({
        editSuccess : true,
        editingUsername: false,
        editingPhonenumber: false,
        editingStreet: false,
        editingState: false,
        editingPostcode: false,
        editingCountry: false,
        changedUsername: false,
        changedPhonenumber: false,
        changedStreet: false,
        changedState: false,
        changedPostcode: false,
        changedCountry:false
      });
    }

    userInformationEditPUT(accountChangeCallBack, errorCallBack, payload)
  }



  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={()=>this.setState({editSuccess : false})}
      />,
    ];
    return(
      <div>
      <List style={listStyle}>
        {this.state.editingUsername ?
        (
          <ListItem>
            <TextField 
              hintText="Enter your username" 
              floatingLabelText="Username" 
              defaultValue={this.props.username}
              onChange= {(event,newValue) => this.setState({
                username:newValue,
                changedUsername:true
                })}/>
          </ListItem>
            
        ) : (
          <ListItem
            primaryText={this.props.username}
            secondaryText="Username"
            rightIcon={<ModeEdit />}
            style={listItemStyle}
            onClick={(event)=>{
              this.setState({
                editingUsername : true,
                anyChange: true
              });
              console.log(this.state);
            }}
            />
        )
        }
        
        <Divider />
        {this.state.editingPhonenumber ?
        (
          <ListItem>
            <TextField 
              hintText="Enter your phone number" 
              floatingLabelText="Phone Number" 
              defaultValue={this.props.phonenumber}
              onChange= {(event,newValue) => this.setState({
                phonenumber:newValue,
                changedPhonenumber:true
                })}/>
          </ListItem>
            
        ) : (
          <ListItem
            primaryText={this.props.phonenumber}
            secondaryText="Mobile Number"
            rightIcon={<ModeEdit />}
            style={listItemStyle}
            onClick={(event)=>{
              this.setState({
                editingPhonenumber : true,
                anyChange: true
              });
              console.log(this.state);
            }}
            />
        )
        }
        <Divider />
        {this.state.editingStreet ?
        (
          <ListItem>
            <TextField 
              hintText="Enter your street address" 
              floatingLabelText="Street number and Address" 
              defaultValue={this.props.street}
              onChange= {(event,newValue) => this.setState({
                street:newValue,
                changedStreet:true
                })}/>
          </ListItem>
            
        ) : (
          <ListItem
            primaryText={this.props.street}
            secondaryText="Street"
            rightIcon={<ModeEdit />}
            style={listItemStyle}
            onClick={(event)=>{
              this.setState({
                editingStreet : true,
                anyChange: true
              });
              console.log(this.state);
            }}
            />
        )
        }
        <Divider />
        {this.state.editingState ?
        (
          <ListItem>
            <TextField 
              hintText="Enter your state" 
              floatingLabelText="State" 
              defaultValue={this.props.state}
              onChange= {(event,newValue) => this.setState({
                state:newValue,
                changedState:true
                })}/>
          </ListItem>
            
        ) : (
          <ListItem
            primaryText={this.props.state}
            secondaryText="State"
            rightIcon={<ModeEdit />}
            style={listItemStyle}
            onClick={(event)=>{
              this.setState({
                editingState : true,
                anyChange: true
              });
              console.log(this.state);
            }}
            />
        )
        }
        <Divider />
        {this.state.editingPostcode ?
        (
          <ListItem>
            <TextField 
              hintText="Enter your postcode" 
              floatingLabelText="Postcode" 
              defaultValue={this.props.postcode}
              onChange= {(event,newValue) => this.setState({
                postcode:newValue,
                changedPostcode:true
                })}/>
          </ListItem>
            
        ) : (
          <ListItem
            primaryText={this.props.postcode}
            secondaryText="Postcode"
            rightIcon={<ModeEdit />}
            style={listItemStyle}
            onClick={(event)=>{
              this.setState({
                editingPostcode : true,
                anyChange: true
              });
              console.log(this.state);
            }}
            />
        )
        }
        <Divider />
        {this.state.editingCountry ?
        (
          <ListItem>
            <TextField 
              hintText="Enter your country" 
              floatingLabelText="Country" 
              defaultValue={this.props.country}
              onChange= {(event,newValue) => this.setState({
                country:newValue,
                changedCountry:true
                })}/>
          </ListItem>
            
        ) : (
          <ListItem
            primaryText={this.props.country}
            secondaryText="Country"
            rightIcon={<ModeEdit />}
            style={listItemStyle}
            onClick={(event)=>{
              this.setState({
                editingCountry : true,
                anyChange: true
              });
              console.log(this.state);
            }}
            />
        )
        }
        <Divider />
      </List>
      {this.state.anyChange ? (
        <div>
          <RaisedButton 
        style={{marginRight: 30}}
        label="Save" 
        onClick={(event) => {
          console.log(this.state);
          console.log(this.props);
          this.attemptUserInformationChange();
        }} 
        primary={true} />

      <RaisedButton
        containerElement={<Link to="/" />}
        label="Back"
        primary={true} />
      </div>
      ) : (
          <div>
      <RaisedButton
        containerElement={<Link to="/" />}
        label="Back"
        primary={true} />
          </div>
      )}
      

      <Dialog
            actions={actions}
            modal={false}
            open={this.state.editSuccess}
            onRequestClose={()=>this.setState({editrSuccess : false })}
          >
          Information has been changed. 
          </Dialog>
      
      </div>
    );
  }

}

const listStyle = {
  textAlign: "left",
  justifyContent: "left",
  marginTop: 20,
  marginLeft: 30,
  marginRight: 30,
  marginBottom: 20
}

const listItemStyle = {
  height: 80
}

export default AccountManager;