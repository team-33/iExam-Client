import React from 'react';
import axios from 'axios';
import Fade from '@material-ui/core/Fade';

import { GET_PAPER_API } from '../../URL'

class Paper extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      paper:''
    }
  }

  componentWillMount() {
    var { subject , year } = this.props.match.params;
    //TODO: get paper from server
    //paper details and answers
    axios.get(GET_PAPER_API + '/' + subject + '/' + year).then(function(res){
      this.setState({paper:res.data});
    }.bind(this));
  }

  render() {
    var { paper } = this.state;
      return(
        <div>
          <Fade
            in={paper !== ''}
            style={{
            transitionDelay: paper !== '' ? '800ms' : '0ms',
            }}
            unmountOnExit>
              <div>
                {paper.subject} - {paper.year}
              </div>
          </Fade>
        </div>
      )
  }
}

export default Paper;
