import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter, Route} from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import * as serviceWorker from './serviceWorker';
import authGurd from './components/AuthManager';
import reducers from './reducers';

localStorage.removeItem('jwt');
axios.defaults.headers.common['Authorization'] = '';

ReactDOM.render(
    <Provider store={createStore(reducers,{})}>
      <BrowserRouter>
          <App>
              <Route exact path="/" component={Home}/>
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/signin" component={SignIn}/>
              <Route exact path="/dashboard" component={authGurd(Dashboard)}/>
          </App>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
