import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppBar from 'material-ui/AppBar';
import Register from './Components/Authentication/Register'
import NoMatch from './Components/NoMatch/NoMatch'

import registerServiceWorker from './registerServiceWorker';
import { 
  BrowserRouter as Router,
  Route, 
  Switch, 
  } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)



registerServiceWorker();

//<Route exact path="/Register" component={Register} />
