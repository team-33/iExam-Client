import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import PaperCard from './PaperCard';

class PaperPanel extends React.Component {

    render() {
        return(
          <div style={{marginTop:15}}>
            <h3>New Paper</h3>
            <Grid container spacing={24}>
              {this.props.papers.map( paper =>
                <Grid key={paper._id} item xs={12} sm={6} md={3} lg={2}>
                  <PaperCard paper={paper}/>
                </Grid>
            )}
            </Grid>
          </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    papers: state.papers.papers
  };
}

export default connect(mapStateToProps, null)(PaperPanel);
