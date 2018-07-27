import React, {Component} from 'react';
import BookingList from './BookingList';
import BookingDetails from './BookingDetails';
import BookingAdd from './BookingAdd';
import DayBooking from './DayBooking';
import {Card, CardTitle,CardActions} from 'material-ui/Card';
import { bookingAddPUT } from '../../api';
import ListItem from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

 
 
class BookingManager extends Component {
  constructor(props) {
      super(props);
      this.state = {
        activeBooking: null,
        addingBooking: false
      };

  }
 
 componentDidMount() {
    console.log("help me");
    console.log(this.props);
    this.props.getDogs();
    this.props.getUserBookingData();
  }

  selectBooking(booking) {
    this.setState({
      activeBooking : booking,
      addingBooking: false
    });
  }

  deselectBooking() {
    this.setState({
      activeBooking: null,
    })
  }

  addBooking() {
    this.setState({
      activeBooking : null,
      addingBooking: true
    });
  }
 
 renderDescription() {
    if (this.state.activeBooking) {
      return (
        <BookingDetails
          email={this.props.email}
          activeBooking={this.state.activeBooking}
          addingBooking={this.state.addingBooking}
          getDayBookingData={(date) => this.props.getDayBookingData(date)}
          getUserBookingData={() => this.props.getUserBookingData()}
          deselectBooking={() => this.deselectBooking()}
          dogList={this.props.dogList}
          />
      );
    } else if (this.state.addingBooking) {
      return (
        <BookingAdd
          email={this.props.email}
          getDayBookingData={(date) => this.props.getDayBookingData(date)}
          getUserBookingData={() => this.props.getUserBookingData()}
          dogList={this.props.dogList}
          />
      );
    } else {
      return (
        <div>
          Select a booking time to manage your booking, or add a new booking.
        </div>
      );
    }
  }

  renderAddBooking() {
    return (
      <ListItem
        primaryText="Click to make a new booking."
        />
    );
  }

  renderDayBookings() {
    return(
      <DayBooking
        getDayBookingData={(date) => this.props.getDayBookingData(date)}
        dayBookingList={this.props.dayBookingList} />
    );
  }

  render() {
    
      return(
        <div>
        <div className='booking-manager'>
        {this.renderDayBookings()}

        <Card style={userBookingCardStyle}>
            <div>
            <CardTitle title="Your Current Bookings" style={{
              paddingBottom: "10px",
              
            }}/>
            <BookingList 
              bookingList={this.props.bookingList}
              selectBooking={(booking) => this.selectBooking(booking)}
              addBooking={() => this.addBooking()}
              />
            </div>
            <Divider 
              style={{
                marginBottom: '10px',
                marginLeft: '10px',
                marginRight: '10px'
              }}/>
            {this.renderDescription()}
        </Card>
          </div>
          <RaisedButton
        style={{
          marginTop: '10px',
          marginBottom: '50px'
        }}
        containerElement={<Link to="/" />}
        label="Back"
        primary={true} />
        </div>
      );
  }
}

const userBookingCardStyle = {
  fontSize: "20px",
  margin: 'auto',
  flex: 3,
  textAlign: 'center',
  justifyContent: 'center',
  paddingBottom: "10px",
  marginLeft: "10px",
  marginRight: "10px"
};
 
export default BookingManager;