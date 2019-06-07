import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';

import PaperPanel from './papers/PaperPanel';

class Home extends React.Component {

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={9} lg={9}>
                        <strong>New Papers</strong>
                    </Grid>
                    <Grid item xs={3} lg={3} style={{textAlign: 'right'}}>
                        <Link to='/papers'>see more</Link>
                    </Grid>
                </Grid>
                <PaperPanel full={false}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, null)(Home);
