import React from 'react';
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import SingleQuestionExpansionPanel from "./single-question/SingleQuestionExpansionPanel";
import {Button, Paper} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import * as paperActions from '../../../actions/papers';
import Grid from "@material-ui/core/Grid";

const styles = {
    root: {
        width: '100%',
    },
};


class QuestionsPanel extends React.Component {
    state = {
        expanded: 0,
        numberOfQuestions: this.props.numberOfQuestions,
        currentPanels: 1,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({numberOfQuestions: nextProps.numberOfQuestions})
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        return (
            <div style={styles.root}>

                {Array.from({length: this.state.currentPanels}, (item, index) =>
                    <SingleQuestionExpansionPanel key={index} expanded={this.state.expanded} panel={index}
                                                  handleChange={this.handleChange}/>
                )}
                <Paper style={{padding: '12px 23px', margin: '10px 0px'}}>
                    <Grid container>
                        <Grid item xs={4} style={{display:'inline-flex',verticalAlign: 'middle'}}>
                            <Typography style={{lineHeight:'35px',margin:'0 10px 0 0',color:'gray'}}>
                                Max: {this.state.numberOfQuestions}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography style={{lineHeight:'35px',margin:'0 10px 0 0',color:'gray'}}>
                                Current: {this.state.currentPanels}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} style={{textAlign:'right'}}>
                            <Button disabled={this.state.currentPanels >= this.state.numberOfQuestions} variant='contained' color='primary'
                                    onClick={() => this.setState({currentPanels: this.state.currentPanels + 1})}>
                                Add
                                <AddIcon style={{marginLeft: '5px'}}/>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
            ;
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, paperActions)(QuestionsPanel);