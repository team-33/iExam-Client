import React from 'react';
import {Link} from 'react-router-dom';
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
          <div style={{flexGrow:1}}>
              <div style={{textAlign:'right'}}>
                  <Link to='/papers/new'>Add new Paper</Link>
              </div>
            <PaperPanel />
          </div>
      )
  }
}

export default connect(null, homeActions)(Papers);
