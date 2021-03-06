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
import EditPaper from './components/papers/EditPaper';
import AddQuestions from './components/papers/new-question/AddQuestions';
import NewPaper from './components/papers/new-paper/NewPaper';

import Users from './components/users/Users';
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
                    <Route exact path="/papers/get/:id" component={authGuard(Paper)}/>
                    <Route exact path="/papers/new" component={authGuard(NewPaper)}/>
                    <Route exact path="/papers/edit/:id" component={authGuard(EditPaper)}/>
                    <Route exact path="/papers/add/" component={authGuard(AddQuestions)}/>

                    <Route exact path="/users/all" component={authGuard(Users)}/>
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
