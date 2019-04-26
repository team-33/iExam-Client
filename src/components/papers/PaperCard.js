import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Rating from 'material-ui-rating';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import LinesEllipsis from 'react-lines-ellipsis'
import ThumbUp from '@material-ui/icons/ThumbUpRounded';
import ThumbDown from '@material-ui/icons/ThumbDownRounded';
import Timer from '@material-ui/icons/Timer';
import Note from '@material-ui/icons/Note';

const style = {
  root:{
    textAlign:"center",
    padding:1,
    height:300
  },
  thumb:{
    color:'#003a99',
    width:30,
    height:30,
  },
}

class PaperCard extends React.Component {

  render() {
    const { paper } = this.props;
    return(
      <Link to={'/papers/' + paper.subject + '/' + paper.year} style={{textDecoration:'none',color:'black'}} query={paper}>
        <Paper style={style.root}>
          <b><p>{paper.subject} - {paper.year}</p></b>
          <Rating
          value={paper.rating}
          max={5}
          readOnly={true}
          />
          <div style={{marginTop:15}}>
            <Badge color='secondary' style={{right:-3,marginRight:20}} badgeContent={paper.likes} max={99}>
              <ThumbUp style={style.thumb}/>
            </Badge>
            <Badge color='secondary' style={{right:-3,marginLeft:20}} badgeContent={paper.dislikes} max={99}>
              <ThumbDown style={style.thumb}/>
            </Badge>
          </div>
          <div style={{marginTop:15,marginBottom:15,display:'inline-flex',verticalAlign: 'middle'}}>
              <Timer style={{color:'gray'}}/> <span style={{lineHeight:'24px',margin:'0 10px 0 0',color:'gray'}}>{paper.minutes} minutes</span>
              <Note style={{color:'gray'}}/> <span style={{lineHeight:'24px',margin:'0 10px 0 0',color:'gray'}}>{paper.numberOfQuestions} questions</span>
          </div>
          <LinesEllipsis
            text={paper.description}
            maxLine='3'
            ellipsis='...'
            trimRight
            basedOn='letters'
            />
        </Paper>
      </Link>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, null)(PaperCard);
