import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardTitle,CardActions} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Edit extends Component {
	 

	 constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      mobileNum: '',
      homeNum:'',
      workNum:'',
      address:'',
      dogName:'',
      dogBreed:'',
      dogBirth:'',
      errors: {}
    };
  }



// I'm not sure if I store the data here which can send the data to back-end?
postData(){

}

 

	render(){
	 return(


        <div>
         
          <br/>
              <div>
              <h1> Account Manager-Edit </h1> 
              </div>
          <br/>
          	<div>
          	   <clientInfoAdd>
          	    <TextField
   				   hintText="Client Name"
   				   errorText={this.state.errors.clientName} onChange= {(event,newValue) => this.setState({clientName:newValue})}
   					 /><br />
   				<TextField
   				   hintText="Mobile Phone Number"
   				   onChange= {(event,newValue) => this.setState({mobileNum:newValue})}
   					 /><br />
   				<TextField
   				   hintText="Home Phone Number"
   				    onChange= {(event,newValue) => this.setState({homeNum:newValue})}
   					 /><br />
   				<TextField
   				   hintText="Work Phone Number"
   				   onChange= {(event,newValue) => this.setState({workNum:newValue})}
   					 /><br />	 		 	 
   				<TextField
   				   hintText="Home Address"
   				   onChange= {(event,newValue) => this.setState({address:newValue})}
   					 /><br />
   				<dogInfo>
   					<TextField
   				   		hintText="Dog Name"
   				   		onChange= {(event,newValue) => this.setState({dogName:newValue})}
   					 	/><br />
   					<TextField
   				   hintText="Breed"
   				   onChange= {(event,newValue) => this.setState({Breed:newValue})}
   					 /><br />
   					<div>
   				  	<DatePicker hintText="Data of Birth"openToYearSelection={true}  onChange= {(event,newValue) => this.setState({dogBirth:newValue})}/>
   					</div>
   				</dogInfo>






          	   </clientInfoAdd>

          	   	   <FloatingActionButton mini={true} >
          	   	          <ContentAdd />

    				</FloatingActionButton>







    			<br/>
    			<br/>



          	   <RaisedButton 
                label="ADD"
                onClick={(event) => this.postData(event) } primary={true}/>
              	<span>  </span>
               

          	</div>







      </div>
      );
  }
}

export default Edit;