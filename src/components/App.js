import React from 'react';

import NavBar from './NavBar';
import Drawer from './Drawer';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        // type: 'dark',
        // primary:{
        //     main:'#3e3e3e'
        // },
        // secondary:{
        //     main:'#ffffff'
        // }
    }
});

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <NavBar/>
                    <Drawer/>
                    <div style={{height: 65}}/>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}
