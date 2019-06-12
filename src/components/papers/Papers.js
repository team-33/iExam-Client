import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import PaperPanel from './PaperPanel';

class Papers extends React.Component {

    render() {
        return (
            <div style={{flexGrow: 1}}>
                <div style={{textAlign: 'right'}}>
                    <Link to='/papers/new'>Add new Paper</Link>
                </div>
                <PaperPanel full={true}/>
            </div>
        )
    }
}

export default connect(null, null)(Papers);
