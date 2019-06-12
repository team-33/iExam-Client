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
import NewPaper from './components/papers/new-paper/NewPaper';

import Profile from './components/profile/Profile';
import ProfileSettings from './components/profile/ProfileSettings';

import Notifications from './components/Notifications';

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
            isAuthenticated: !!jwtToken,
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
                    <Route exact path="/papers/:subject/:year/:id" component={authGuard(Paper)}/>
                    <Route exact path="/papers/new" component={authGuard(NewPaper)}/>

                    <Route exact path="/users/profile" component={authGuard(Profile)}/>
                    <Route exact path="/users/profile/settings" component={authGuard(ProfileSettings)}/>

                    <Route exact path="/notifications" component={authGuard(Notifications)}/>

                    <Route exact={true} path="*" component={NotFound}/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
