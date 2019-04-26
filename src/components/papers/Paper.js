import React from 'react';
import axios from 'axios';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import { GET_PAPER_API } from '../../URL'

class Paper extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      paper:''
    }
  }

  componentDidMount() {
    var { subject , year } = this.props.match.params;
    //TODO: get paper from server
    //paper details and answers
    axios.get(GET_PAPER_API + '/' + subject + '/' + year).then(function(res){
      this.setState({paper:res.data});
    }.bind(this));
  }

  render() {
    var { paper } = this.state;
    console.log(paper)
      return(
        <div>
          <Fade
            in={paper !== '' && !paper.error }
            style={{
            transitionDelay: paper !== '' && !paper.error ? '800ms' : '0ms',
            }}
            unmountOnExit>
              <div>
                {paper.subject} - {paper.year}
              </div>
          </Fade>
          <Fade
            in={paper === '' }
            style={{
            transitionDelay: paper === '' ? '800ms' : '0ms',
            }}
            unmountOnExit>
              <div style={{textAlign : 'center'}}>
                <CircularProgress />
              </div>
          </Fade>
          <Fade
            in={ paper.error === 1 }
            style={{
            transitionDelay: paper.error === 1 ? '800ms' : '0ms',
            }}
            unmountOnExit>
              <div>
                Paper Not found in Database
              </div>
          </Fade>
        </div>
      )
  }
}

export default Paper;
