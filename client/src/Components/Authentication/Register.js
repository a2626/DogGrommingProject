import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {validateEmail, errorCallBack} from '../../utils.js'
import {registerUserPost} from '../../api.js'
import {Card, CardTitle} from 'material-ui/Card';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      registerSuccess: false
    }
    this.postData = this.postData.bind(this)
  }

  handleOpen = () => {
    this.setState({registerSuccess: true});
  };

  handleClose = () => {
    this.setState({registerSuccess: false});
  };

  //Ensuring all the data in the registration form pases requirements
  registerFormIsValid() {

    var formIsValid = true;
    var newErrors = {};

    if (this.state.username === "") {
      newErrors['username'] = "Username is required"
      formIsValid = false;
    }
    if (this.state.email === "") {
      newErrors['email'] = "Email is required"
      formIsValid = false;
    } else if (!validateEmail(this.state.email)) {
      newErrors['email'] = "Email is invalid"
      formIsValid = false;
    }
    if (this.state.password === "" || this.state.password_confirmation === "") {
      newErrors['passwords'] = "Password fields are required"
      formIsValid = false;
    } else if (this.state.password !== this.state.password_confirmation) {
      newErrors['password_mismatch'] = "Passwords do not match"
      formIsValid = false;
    }

    this.setState({errors: newErrors});
    return formIsValid;
  }

  //sending data to back-end to create new user
  postData() {

    const payload = {
      "username": this.state.username,
      "email": this.state.email,
      "password": this.state.password
    }
    console.log(payload)
    const newErrors = {}
    var selfref = this

    const registerCallBack = function(response) {
      selfref.handleOpen()
    }

    registerUserPost(registerCallBack, errorCallBack, payload)
  }

  attemptRegister() {
    if (this.registerFormIsValid()) {
      this.postData()
    } else {
      console.log("Errors: " + this.state.errors)
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div style={{
        marginTop: "30px"
      }}>
        <div>
          <Card style={registerCardStyle}>
            <CardTitle title="Register" style={{
              paddingBottom: "0px"
            }}/>
            <TextField 
              hintText="Enter your Username" 
              floatingLabelText="Username" 
              errorText= {this.state.errors.username}
              onChange= {(event,newValue) => this.setState({username:newValue})}/>
            <br/>
            <TextField 
              hintText="Enter your Email" 
              floatingLabelText="Email" 
              errorText = {this.state.errors.email}
              onChange= {(event,newValue) => this.setState({email:newValue})}/>
            <br/>
            <TextField type="password" 
              hintText="Enter your Password" 
              floatingLabelText="Password" 
              errorText= {this.state.errors.passwords || this.state.errors.password_mismatch}
              onChange= {(event,newValue) => this.setState({password:newValue})}/>
            <br/>
            <TextField 
              type="password"
              hintText="Re-Enter your Password"
              floatingLabelText="Re-enter Password"
              errorText = {this.state.errors.passwords || this.state.errors.password_mismatch}
              onChange= {(event,newValue) => this.setState({password_confirmation:newValue})}/>
            <br/><br/>
            <RaisedButton 
              label="Submit" 
              primary={true} 
              onClick={(event) => this.attemptRegister(event)}/>
            <br/><br/>
            <RaisedButton 
              containerElement={<Link to="/"/>}
              label="Back Home" 
              primary={true}/>
          </Card>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.registerSuccess}
            onRequestClose={this.handleClose}
          >
          Register successful!
        </Dialog>
        </div>
      </div>
    );
  }
}

const registerCardStyle = {
  fontSize: "20px",
  margin: 'auto',
  width: '400px',
  height: '500px',
  textAlign: 'center',
  justifyContent: 'center'
};

export default Register;
