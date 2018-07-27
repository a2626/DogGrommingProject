import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { errorCallBack } from '../../utils.js'
import { adminDayBookingsGET } from '../../api.js'
import {Card, CardTitle, CardText} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      adminBookingList: {},
    }
  }

  componentDidMount() {
    this.getAdminBookingsData(this.state.date);
  }

  getAdminBookingsData(date) {
    const mockValues = false;

    const payload = {
      "date": Date.parse(date)
    }

    var selfref = this;

    const adminBookingsCallBack = function(response) {
      console.log(response);
      var newAdminBookingList = selfref.state.adminBookingList;

      newAdminBookingList[date] = response.data.bookinglist;
      selfref.setState({
        adminBookingList: newAdminBookingList
      });
    }
    if (!mockValues) {
      adminDayBookingsGET(adminBookingsCallBack, errorCallBack, payload);
    } else {
      var newAdminBookingList = selfref.state.adminBookingList;

      newAdminBookingList[date] = [
        {
          "_id": 2468,
          "email": "mmihic@gmail.com",
          "dogID" : 1234,
          "starttime" : 1525510800000,
          "endtime" : 1525516200000,
          "street": "1234 Apple Street",
          "state": "VIC",
          "postcode": "1234",
          "country": "Australia",
          "description": "The doorbell does not work, please call instead. "
         },
         {
          "_id": 2469,
          "email": "wowzers@gmail.com",
          "dogID" : 1238,
          "starttime" : 1525597200000,
          "endtime" : 1525602600000,
          "street": "1234 Apple Street",
          "state": "VIC",
          "postcode": "1234",
          "country": "Australia",
          "description": "The doorbell does not work, please call instead. "
         }];
      

      this.setState({
        adminBookingList: newAdminBookingList
      });
      console.log(this.state);
    }
 
  }

  render() {
      return(
        <div>
          {this.renderDateSection()}
          {this.renderBookingsTable()}
        </div>
      );

  }

  renderDateSection() {
    
    return(
      <Card>
        <CardTitle
          title={this.state.date.toLocaleDateString()} />
        <DatePicker
          hintText="Date for bookings"
          value={this.state.date}
          onChange={this.handleDateChange}
        />
      </Card>
    );
  }

  handleDateChange = (event, date) => {
    this.setState({
      date
    });
    this.getAdminBookingsData(date);
  };

  renderBookingsTable() {
    return(
      <Table
        fixedHeader={true}
        selectable={true}
        >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn
              colSpan="7"
              style={{textAlign: 'center'}}
              >
            Bookings
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Start Time</TableHeaderColumn>
            <TableHeaderColumn>End Time</TableHeaderColumn>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Dog ID</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Location</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover={true}
          stripedRows={true}
          displayRowCheckbox={false}
          >
        {this.renderBookingsTableRows()}
        </TableBody>
      </Table>
    )
  }

  renderBookingsTableRows() {

    if (!this.state.adminBookingList[this.state.date] || this.state.adminBookingList[this.state.date].length === 0) {

      return (
        <TableRow>
          <TableHeaderColumn colSpan="5" style={{textAlign: 'center'}}>
            No bookings for this day.
          </TableHeaderColumn>
        </TableRow>
      );
    }

    return (
      this.state.adminBookingList[this.state.date].map((booking) => {
        var locationString = `${booking.street}, ${booking.state}, ${booking.postcode}, ${booking.country}`;
        
        var startTime = new Date(booking.starttime);
        var endTime = new Date(booking.endtime);

        return (
          <TableRow key={booking._id}>
            <TableRowColumn>{startTime.toLocaleTimeString()}</TableRowColumn>
            <TableRowColumn>{endTime.toLocaleTimeString()}</TableRowColumn>
            <TableRowColumn>{booking._id}</TableRowColumn>
            <TableRowColumn>{booking.email}</TableRowColumn>
            <TableRowColumn>{booking.dogID}</TableRowColumn>
            <TableRowColumn
              style={{
                whiteSpace: "normal",
                wordWrap: "break-word"
              }}>{booking.description}</TableRowColumn>
            <TableRowColumn
              style={{
                whiteSpace: "normal",
                wordWrap: "break-word"
              }}>{locationString}</TableRowColumn>
          </TableRow>
        );
      })
    );
  }
  
}

export default AdminPage;