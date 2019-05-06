import React from 'react';

import NavBar from './NavBar';
import Drawer from './Drawer';

export default class App extends React.Component{
    render() {
        return (
            <div>
                <NavBar />
                <Drawer />
                <div style={{height:65}}/>
                {this.props.children}
            </div>
        );
    }
}
