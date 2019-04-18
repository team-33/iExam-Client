import React from 'react';

class Paper extends React.Component {

  constructor(props) {
    super(props);
    //TODO: get paper from server
    //paper details and answers
    this.state = {date: new Date()};
  }

  render() {
      return(
          <div>
            {this.props.match.params.subject} - {this.props.match.params.year}
          </div>
      )
  }
}

export default Paper;
