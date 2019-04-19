import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import PaperCard from './PaperCard';

class PaperPanel extends React.Component {

    render() {
        return(
          <div style={{marginTop:15,textAlign:'center'}}>
              <Fade
              in={this.props.papers.length === 0}
              style={{
                transitionDelay: this.props.papers.length === 0 ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
            <CircularProgress />
            </Fade>
            <Fade
              in={this.props.papers.length !== 0}
              style={{
              transitionDelay: this.props.papers.length !== 0 ? '800ms' : '0ms',
              }}
              unmountOnExit>
              <Grid container spacing={24}>
                  {this.props.papers.reverse().slice(0,12).map( paper =>
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
