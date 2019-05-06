import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import PaperCard from './PaperCard';

class PaperPanel extends React.Component {

    render() {
        const {full, papers} = this.props;
        return (
            <div style={{marginTop: 15, textAlign: 'center'}}>
                <Fade
                    in={papers.length === 0}
                    style={{
                        transitionDelay: papers.length === 0 ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress/>
                </Fade>
                <Fade
                    in={papers.length !== 0}
                    style={{
                        transitionDelay: papers.length !== 0 ? '800ms' : '0ms',
                    }}
                    unmountOnExit>
                    <Grid container spacing={24}>
                        {papers.reverse().slice(0, full ? papers.length : 12).map(paper =>
                            <Grid key={paper._id} item xs={12} sm={6} md={3} lg={2}>
                                <PaperCard paper={paper}/>
                            </Grid>
                        )}
                    </Grid>
                </Fade>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated,
        papers: state.papers.papers,
    };
}

export default connect(mapStateToProps, null)(PaperPanel);
