import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class NavBar extends React.Component {

    render() {
        return (
            <div style={{flexGrow:1,background:"#111111"}}>
              <AppBar position='static'>
                <Toolbar>
                  <IconButton color='inherit' aria-label="Menu" style={{marginLeft: -20,marginRight: 0}}>
                    <MenuIcon/>
                  </IconButton>
                  <Typography  color='inherit' variant="h5">
                    <Link className="navbar-brand"  to="/" style={{color:'white', textDecoration: 'none' }}>
                      iExamr
                    </Link>
                    </Typography>
                    <div style={{flexGrow:1,marginLeft:10}}>
                    <Link className="navbar-brand" to="/dashboard" style={{color:'white', textDecoration: 'none' }}>
                      Dashboard
                    </Link>
                    </div>
                    <Link className="nav-link" to="/signup" style={{color:'white', textDecoration: 'none' }}>
                      <Button color='inherit'>
                      Sign up
                      </Button>
                    </Link>
                    <Link className="nav-link" to="/signin" style={{color:'white', textDecoration: 'none' }}>
                      <Button color='inherit'>
                      Sign in
                      </Button>
                    </Link>
                    <Link className="nav-link" to="/signout" style={{color:'white', textDecoration: 'none' }}>
                      <Button color='inherit'>
                      Sign out
                      </Button>
                    </Link>
                </Toolbar>
              </AppBar>
            </div>
        );
    }
}
