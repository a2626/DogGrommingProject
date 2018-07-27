import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';

class DogList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>
        {this.renderList()}
        {this.renderAddDog()}
      </List>
    );
  }

  renderList() {
    if (!this.props.dogList || this.props.dogList.length === 0) {
      return <div></div>
    }
    console.log(this.props.dogList);

    return (
      this.props.dogList.map((dog) => {
        return (
          <ListItem
            key={dog._id}
            onClick={(event) => this.props.selectDog(dog)}
            primaryText={dog.name} 
            />
        );
      })
    );
  }

  renderAddDog() {
    return (
      <ListItem
        primaryText="Click to add a new dog."
        onClick={(event) => this.props.addDog()}
        />
    );
  }
}



export default DogList;