import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Home from './components/Home';
import Index from './components/Index';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';

import Papers from './components/papers/Papers';
import Paper from './components/papers/Paper';
import NewPaper from './components/papers/NewPaper';

import Profile from './components/profile/Profile';

import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import authGuard from './components/HOCs/AuthGuard';
import signInUpGuard from './components/HOCs/SignInUpGuard';

const jwtToken = localStorage.getItem('JWT_TOKEN');
axios.defaults.headers.common['Authorization'] = jwtToken;

ReactDOM.render(
    <Provider store={createStore(reducers, {
        auth: {
            token: jwtToken,
            isAuthenticated: jwtToken ? true : false
        }
    }, applyMiddleware(reduxThunk))}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route exact path="/" component={signInUpGuard(Index)}/>
                    <Route exact path="/signup" component={signInUpGuard(SignUp)}/>
                    <Route exact path="/signin" component={signInUpGuard(SignIn)}/>
                    <Route exact path="/home" component={authGuard(Home)}/>

                    <Route exact path="/papers" component={authGuard(Papers)}/>
                    <Route exact path="/paper/:subject/:year" component={authGuard(Paper)}/>
                    <Route exact path="/papers/new" component={authGuard(NewPaper)}/>

                    <Route exact path="/profile" component={authGuard(Profile)}/>

                    <Route exact={true} path="*" component={NotFound}/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// <Route exact path="/dashboard" component={authGuard(Dashboard)}/>
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
