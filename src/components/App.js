import React from 'react';
import {SnackbarProvider} from 'notistack';

import NavBar from './NavBar';
import Drawer from './Drawer';

export default class App extends React.Component {

    render() {
        return (
            <SnackbarProvider maxSnack={4}>
                <NavBar/>
                <Drawer/>
                <div style={{height: 65}}/>
                {this.props.children}
            </SnackbarProvider>
        );
    }
}