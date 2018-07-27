import React, {Component} from 'react';
import DogList from './DogList';
import DogDetails from './DogDetails';
import DogAdd from './DogAdd';
import {Card, CardTitle,CardActions} from 'material-ui/Card';
import { dogAddPUT } from '../../api';
import ListItem from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

class DogManager extends Component {
  constructor(props) {
      super(props);
      this.state = {
        activeDog: null,
        addingDog: false
      };

  }

  componentDidMount() {
    console.log("help me");
    console.log(this.props);
    this.props.getDogs();
  }

  selectDog(dog) {
    this.setState({
      activeDog : dog,
      addingDog: false
    });
  }

  deselectDog() {
    this.setState({
      activeDog: null,
    })
  }

  addDog() {
    this.setState({
      activeDog : null,
      addingDog: true
    });
  }

  renderDescription() {
    if (this.state.activeDog) {
      return (
        <DogDetails
          email={this.props.email}
          activeDog={this.state.activeDog}
          addingDog={this.state.addingDog}
          getDogs={() => this.props.getDogs()}
          deselectDog={() => this.deselectDog()}
          />
      );
    } else if (this.state.addingDog) {
      return (
        <DogAdd
          email={this.props.email}
          getDogs={() => this.props.getDogs()}
          />
      );
    } else {
      return (
        <div>
          Select a dog.
        </div>
      );
    }
  }

  renderAddDog() {
    return (
      <ListItem
        primaryText="Click to add a new dog."
        />
    );
  }

  render() {
    
      return(
        <div>
        <Card style={dogManagerCardStyle}>
            <div>
            <CardTitle title="Your Dogs" style={{
              paddingBottom: "10px",
              
            }}/>
            <DogList dogList={this.props.dogList}
              selectDog={(dog) => this.selectDog(dog)}
              addDog={() => this.addDog()}
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
      <RaisedButton
        style={{marginTop: '10px'}}
        containerElement={<Link to="/" />}
        label="Back"
        primary={true} />
          </div>
      );
  }
}

const dogManagerCardStyle = {
  fontSize: "20px",
  margin: 'auto',
  width: '400px',
  textAlign: 'center',
  justifyContent: 'center',
  paddingBottom: "10px"
};

export default DogManager;