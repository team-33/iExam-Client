import React from 'react';
import {connect} from "react-redux";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as paperActions from '../../../actions/papers';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import SingleQuestionExpansionPanel from "./SingleQuestionExpansionPanel";

const styles = {
    root: {
        width: '100%',
    },
};


class QuestionsPanel extends React.Component {
    state = {
        expanded: null,
        numberOfQuestions:this.props.numberOfQuestions,
        currentPanels:0,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({numberOfQuestions:nextProps.numberOfQuestions})
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        return (
            <div style={styles.root}>
                <Typography style={{textAlign:'right'}}>
                    Max: {this.state.numberOfQuestions}
                </Typography>
                <SingleQuestionExpansionPanel expanded={this.state.expanded} panel='pane1' handleChange={this.handleChange}/>
                <SingleQuestionExpansionPanel expanded={this.state.expanded} panel='pane2' handleChange={this.handleChange}/>
                <SingleQuestionExpansionPanel expanded={this.state.expanded} panel='pane3' handleChange={this.handleChange}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, paperActions)(QuestionsPanel);