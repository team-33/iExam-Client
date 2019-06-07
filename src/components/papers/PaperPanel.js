import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import PaperCard from './PaperCard';
import axios from "axios";
import {GET_PAPERS_API} from "../../URL";
import {Button} from "@material-ui/core";

class PaperPanel extends React.Component {

    constructor(props) {
        super(props);
        axios.get(GET_PAPERS_API).then(async (res) => {
            await this.setState({papers: res.data});
        })
    }

    state = {
        papers: []
    };

    render() {
        const {full} = this.props;
        const {papers} = this.state;
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
                                <Button style={{borderRadius: '3px 15px 3px 15px',padding:5}}><PaperCard paper={paper}/></Button>
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
    };
}

export default connect(mapStateToProps, null)(PaperPanel);
