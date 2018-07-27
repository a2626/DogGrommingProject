import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';


class BookingList extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<List>
       			{this.renderBookingList()}
        		{this.renderAddBooking()}
      		</List>
		);
	}

	renderBookingList() {
    if (!this.props.bookingList || this.props.bookingList.length == 0) {
      return <div></div>
    }
    console.log(this.props.bookingList);

    return (
      this.props.bookingList.map((booking) => {
        var startTime = new Date(booking.starttime);
        var endTime = new Date(booking.endtime);

        return (
          <ListItem
            key={booking._id}
            onClick={(event) => this.props.selectBooking(booking)}
            primaryText={startTime.toLocaleDateString()} 
            secondaryText={`${startTime.toLocaleTimeString()}-${endTime.toLocaleTimeString()}`}
            />
        );
      })
    );
  }

  renderAddBooking() {
    return (
      <ListItem
        primaryText="Click to make a new Booking."
        onClick={(event) => this.props.addBooking()}
        />
    );
  }
}

export default BookingList;
