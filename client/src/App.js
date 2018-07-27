import React, {Component, Fragment} from 'react';
import './App.css';
import Login from './Components/Authentication/Login.js';
import Dashboard from './Components/Dashboard/Dashboard.js';
import Register from './Components/Authentication/Register'
import AccountManager from './Components/AccountManager/AccountManager.js'
import BookingManager from './Components/BookingManager/BookingManager.js'
import AdminPage from './Components/Admin/AdminPage';
import Edit from './Components/AccountManager/Edit.js'
import NoMatch from './Components/NoMatch/NoMatch'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { 
  BrowserRouter as Router,
  Route, 
  Switch, 
  Redirect
  } from 'react-router-dom'
import DogManager from './Components/DogManager/DogManager';
import {
  userDogsGET,
  userInformationGET,
  userBookingGET,
  dayBookingGET,
  adminDayBookingsGET
  } from './api.js';
import {errorCallBack} from './utils.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      email: "",
      username: "",
      phonenumber: "",
      street: "",
      state: "",
      postcode: "",
      country: "",
      dogList: [],
      bookingList: [],
      dayBookingList: {}
    };
    
  }

  login(response){
    this.setState({authenticated: response.authenticated,
       email: response.email});
  }

  logout(){
    this.setState({authenticated: false, email: ""});
  }

  getDogData() {
    const payload = {
      "email": this.state.email
    }

    console.log(payload);
    var selfref = this;

    const registerCallBack = function(response) {
      console.log(response);
      selfref.setState({dogList : response.data.dogList});
    }

    userDogsGET(registerCallBack, errorCallBack, payload);
  }

  getUserBookingData() {
    const payload = {
      "email": this.state.email
    }

    console.log(payload);
    var selfref = this;

    const userBookingCallBack = function(response) {
      console.log(response);
      selfref.setState({bookingList : response.data.bookinglist});
    }

    userBookingGET(userBookingCallBack, errorCallBack, payload);
  }

  getDayBookingData(date) {
    const mockValues = false;
    console.log(date);
    const payload = {
      "email": this.state.email,
      "date": Date.parse(date)
    }

    console.log(payload);
    var selfref = this;

    const dayBookingCallBack = function(response) {
      console.log(response);
      var newDayBookingList = selfref.state.dayBookingList;

      newDayBookingList[date] = response.data.bookinglist;
      selfref.setState({
        dayBookingList: newDayBookingList
      });

    }
    if (!mockValues) {
      dayBookingGET(dayBookingCallBack, errorCallBack, payload);
    } else {
      var newDayBookingList = selfref.state.dayBookingList;

      newDayBookingList[date] = [
        {
          "_id": 2468,
          "starttime" : 1525510800000,
          "endtime" : 1525516200000
         },
         {
          "_id": 2469,
          "starttime" : 1525597200000,
          "endtime" : 1525602600000,
         }];

      this.setState({
        dayBookingList: newDayBookingList
      });
      console.log(this.state);
    }

  }

  getUserData() {
    const payload = {
      "email": this.state.email
    }

    var selfref = this;

    const userDataCallBack = function(response) {
      console.log(response);
      selfref.setState({
        username: response.data.username,
        phonenumber: response.data.phonenumber,
        street: response.data.street,
        state: response.data.state,
        postcode: response.data.postcode,
        country: response.data.country,

      });
    }

    userInformationGET(userDataCallBack, errorCallBack, payload);

  }

  render() {
    return (
    <div className="App">
      <Router>
      <div>
        <AppBar title="Tom's Dog Grooming Service"
          iconElementLeft={null}
          style={{
            marginBottom: 10
          }} />
        <Switch>

          <Route 
            exact path="/Login"
            render={props => <Login
              {...props}
              login={(response) => this.login(response)}
              check={() => console.log(this.state)} 
              setEmail={() => this.setState({})} />}
          />

          <Route
            exact path="/Edit"
            render={props => <Edit
              {...this.state}
              check={() => console.log(this.state)} />}
          />

          <Route
            exact path="/Admin"
            render={props => <AdminPage
              {...this.state}
              />}
          />

          <Route exact path="/Register" component={Register} />

          {this.state.authenticated ? (
            <Fragment>
              <Route
                exact path="/"
                render={props => <Dashboard
                  {...this.props}
                  {...this.state}
                  getUserBookingData={() => this.getUserBookingData()}
                  logout={() => this.logout()}
                  check={() => console.log(this.state)}
                  getUserData={() => this.getUserData()} />}
                />
              <Route
                exact path="/AccountManager"
                render={props => <AccountManager
                  {...this.props}
                  {...this.state}
                  getUserData={() => this.getUserData()} />}
                />
              <Route
                exact path="/BookingManager"
                render={props => <BookingManager
                  {...this.props}
                  {...this.state}
                  getDayBookingData={(date) => this.getDayBookingData(date)}
                  getUserBookingData={() => this.getUserBookingData()}
                  getDogs={() => this.getDogData()} />}
                />
              <Route
                exact path="/DogManager"
                render={props => <DogManager
                  {...this.props}
                  {...this.state}
                  getDogs={() => this.getDogData()} />}
                />
            </Fragment>
              ) : (
                <Redirect
                  from="/"
                  to="/Login"
                  />
              )}
          
          <Route component={NoMatch} />

        </Switch>
        </div>
    </Router>
    </div>
    );
  }
}

export default App;