import React from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {

    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <Link className="navbar-brand" to="/">iExamer</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign up</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin">Sign in</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signout">Sign out</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}