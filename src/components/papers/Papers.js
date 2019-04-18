import React from 'react';
import { connect } from 'react-redux';

import PaperPanel from './PaperPanel';
import * as homeActions from '../../actions/papers';

class Papers extends React.Component {
  componentDidMount() {
    this.props.getPapers();
  }

  componentDidUpdate() {
    this.props.getPapers();
  }


  render() {
      return(
          <div>
            <PaperPanel />
          </div>
      )
  }
}

export default connect(null, homeActions)(Papers);
