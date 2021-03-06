import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import LinesEllipsis from 'react-lines-ellipsis'
import {Button, Divider, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Rating from "react-star-rating-lite";

const styles = {
    root: {
        height: 300,
        borderRadius: '3px 15px 3px 15px',
        background: '#f3f3f3',
    },
    title: {
        boxShadow: 'grey 0px 5px 10px',
        borderRadius: '3px 15px 0px 0px',
        background: '#5b5b5b',
        fontSize: 18,
        padding: 3,
        color: 'white',
    },
    dataPanel: {
        paddingTop: 20,
        paddingBottom: 3,
        background: 'linear-gradient(#fff0,#fff)',
    }
};

class PaperCard extends React.Component {

    state = {
        liked: Math.floor(Math.random() * 2),
        disliked: 0,
    };

    onCardClick = () => {
        const {paper} = this.props;
        const link = '/papers/get/' + paper._id;
        this.props.history.push(link);
    };

    render() {
        const {paper} = this.props;
        const {liked,} = this.state;
        return (
            <Button style={{borderRadius: '3px 15px 3px 15px', padding: 5}}>
                <Paper
                    style={styles.root}
                    onClick={this.onCardClick}>

                    <div style={styles.title}>
                        {paper.subject} - {paper.year}
                    </div>
                    <div>
                        <Grid container style={styles.dataPanel}>
                            <Grid item xs={8}>
                                <Rating
                                    value={`${paper.rating}`}
                                    readonly
                                    weight='20'
                                />
                            </Grid>
                            <Grid item xs={4} style={{marginBottom: 15}}>
                                <Typography>
                                    ({paper.rating})
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={"primary"} style={{fontWeight: liked === 1 ? 'bold' : 'none'}}>
                                    {liked ? 'Liked' : 'likes'} ({paper.likes})
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={"secondary"} style={{fontWeight: liked !== 1 ? 'bold' : 'none'}}>
                                    Dislikes ({paper.dislikes})
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider style={{margin: '0px 5px'}}/>
                        <br/>
                        <Typography style={{color: 'grey', fontWeight: 'bold'}}>
                            {paper.minutes} minutes | {paper.numberOfQuestions} Questions
                        </Typography>
                        <LinesEllipsis
                            text={paper.description}
                            style={{textAlign: 'left', padding: 10}}
                            maxLine='3'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                        />

                    </div>
                </Paper>
            </Button>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps, null)(withRouter(PaperCard));
