import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {validateEmail, errorCallBack} from '../../utils.js'
import {loginUserPost} from '../../api.js'
import {Card, CardTitle} from 'material-ui/Card';
import { Link } from 'react-router-dom';

//import Register from './Register.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  //Checking that the data entered is valid
  loginFormIsValid() {
    var formIsValid = true;
    var newErrors = {};

    if (this.state.email === "") {
      newErrors['email'] = "Email is required"
      formIsValid = false;
    }

    if (this.state.password === "") {
      newErrors['password'] = "Password is required"
      formIsValid = false;
    }

    if(!validateEmail(this.state.email)) {
      newErrors['email'] = "Email is invalid"
      formIsValid = false;
    }

    this.setState({errors: newErrors});
    return formIsValid;
  }

  //Checking if credentials are valid with database, if so we initiate login
  postData() {
    const payload = {
      "email": this.state.email,
      "password": this.state.password
    }

    var selfref = this

    const loginCallBack = function(response) {
      console.log("Login success!")
      console.log(response)

      var loginData = {
        email: selfref.state.email,
        authenticated: true
      }
      selfref.props.login(loginData)
      selfref.props.history.push("/");
    }

    loginUserPost(loginCallBack, errorCallBack, payload)

  }

  attemptLogin() {
    if (this.loginFormIsValid()) {
      this.postData()
    } else {
      console.log(this.state.errors)
    }
  }

  render() {
    return (
      <div >
        <Card style={loginCardStyle}>
          <CardTitle title="Login" style={{
            paddingBottom: "0px"
          }}/>
          <TextField 
            hintText="Enter your email" 
            floatingLabelText="Email" 
            errorText={this.state.errors.email} 
            onChange= {(event,newValue) => this.setState({email:newValue})}/>
          <TextField type="password" hintText="Enter your Password" floatingLabelText="Password" errorText={this.state.errors.password} onChange= {(event,newValue) => this.setState({password:newValue})}/>
          <br/><br/>
          <RaisedButton 
            label="Submit" 
            primary={true} 
            onClick={(event) => this.attemptLogin(event)}/>
          <br/><br/>
          <RaisedButton 
            containerElement={<Link to="/Register" />}
            label="Register"
             onClick={(event) => {
          }} primary={true}/>
        </Card>
      </div>
    );
  }
}

const loginCardStyle = {
  paddingTop: "40px",
  margin: 'auto',
  width: '400px',
  height: '450px'
};

export default Login;
