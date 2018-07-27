import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import Dialog from 'material-ui/Dialog';




class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      today: new Date()
    }
  }

  componentDidMount() {
    this.props.getUserBookingData();
    this.props.getUserData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var shouldShowAlert = false;

    if (!nextProps.bookingList) {
      console.log("no booking list");
      return null;
    } else {
      var todayString = prevState.today.toLocaleDateString();
      console.log(todayString);
      nextProps.bookingList.map((booking) => {
        console.log(new Date(booking.starttime).toLocaleDateString().valueOf());
        if (new Date(booking.starttime).toLocaleDateString().valueOf() == todayString.valueOf()) {
          shouldShowAlert = true;
        }
        console.log(shouldShowAlert);
      });
      return ({
        showAlert: shouldShowAlert
      });
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state);

      return(
        <div>
          <br/>
              <div>
              <h1> Welcome {this.props.username}! </h1>
              </div>
              <br/>

              <div>
                {this.state.showAlert ? (
                  <Card
                    style={{
                      marginLeft: '100px',
                      marginRight: '100px',
                    }}>
                  <CardText>
                    You have a booking today. We hope to see you soon!
                  </CardText>
                </Card>
                ): (
                  <div></div>
                )}
                  
              </div>
              <br/>
          
              <div>
                <RaisedButton 
                containerElement={<Link to="/AccountManager" />}
                label="Account Manager"
                onClick={(event) => {}} 
                primary={true}/>

                <br/>
                <br/>
                <RaisedButton 
                containerElement={<Link to="/BookingManager" />}
                label="Booking Manager"
                onClick={(event) => {}} 
                primary={true}/>
                <br/>
                <br/>

                <RaisedButton 
                containerElement={<Link to="/DogManager" />}
                label="Dog Manager"
                onClick={(event) => {}} 
                primary={true}/>

              </div>
              <br/>

              <div>

              <RaisedButton 
                label="Logout" 
                primary={true} 
                onClick={(event) => this.props.logout()}/>
                
                    

              </div>
                        
          <br/>
      </div>
      );
  }
}

export default Dashboard;