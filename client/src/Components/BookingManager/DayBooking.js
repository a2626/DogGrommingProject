import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { errorCallBack } from '../../utils.js'
import { adminDayBookingsGET } from '../../api.js'
import {Card, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
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

class DayBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    }
  }

  componentDidMount() {
    console.log(this.state.date);
    this.props.getDayBookingData(this.state.date);
  }

  render() {
    return(
       <Card style={dayBookingCardStyle}>
        {this.renderDateSection()}
        {this.renderBookingsTable()}
        </Card>
    );
  }

  renderDateSection() {
    
    return(
      <div>
        <CardTitle
          title={`Existing Bookings On ${this.state.date.toLocaleDateString()}`} />
        <RaisedButton
          label="Refresh"
          primary={true}
          onClick={(event) => this.props.getDayBookingData(this.state.date)} />
        <DatePicker
          hintText="Date for bookings"
          value={this.state.date}
          onChange={this.handleDateChange}
        />
      </div>
    );
  }

  handleDateChange = (event, date) => {
    this.setState({
      date
    });
    this.props.getDayBookingData(date);
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
            <TableHeaderColumn>Start Time</TableHeaderColumn>
            <TableHeaderColumn>End Time</TableHeaderColumn>
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

    );
  }

  renderBookingsTableRows() {
    if (!this.props.dayBookingList[this.state.date] || this.props.dayBookingList[this.state.date].length === 0) {

      return (
        <TableRow>
          <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
            No bookings for this day.
          </TableHeaderColumn>
        </TableRow>
      );
    }

    console.log(this.state);

    return (
      this.props.dayBookingList[this.state.date].map((booking) => {
        var startTime = new Date(booking.starttime);
        var endTime = new Date(booking.endtime);

        return (
          <TableRow key={booking._id}>
            <TableRowColumn>{startTime.toLocaleTimeString()}</TableRowColumn>
            <TableRowColumn>{endTime.toLocaleTimeString()}</TableRowColumn>
          </TableRow>
        );
      })
    );
  }
}

const dayBookingCardStyle = {
  paddingTop: "40px",
  margin: 'auto',
  flex:1,
  height: '450px',
  marginLeft: "10px",
};

export default DayBooking;