import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";

import CustomTextField from "./CustomTextField";

const styles = {
    heading: {
        fontSize: '15px',
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: '15px',
        color: 'gray',
    },
};

class SingleQuestionExpansionPanel extends React.Component {

    state = {
        question: '',
        answer0: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
    };

    onTextChange = async (number, q, text) => {
        q ?
            await this.setState({question: text}) :
            await this.setState({['answer' + number]: text});
        this.props.onQestionUpdate(this.props.panel, this.state)
    };

    render() {
        const {expanded, panel} = this.props;

        return (
            <ExpansionPanel expanded={expanded === panel} onChange={this.props.handleChange(panel)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography style={styles.heading}>General settings {panel}</Typography>
                    <Typography style={styles.secondaryHeading}>I am an expansion panel</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <CustomTextField number={99} q={true}
                                     onTextChange={this.onTextChange}/>
                </ExpansionPanelDetails>

                <Divider style={{margin: '0 26px'}}/>

                <ExpansionPanelDetails>
                    <CustomTextField number={0} q={false}
                                     onTextChange={this.onTextChange}/>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <CustomTextField number={1} q={false}
                                     onTextChange={this.onTextChange}/>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <CustomTextField number={2} q={false}
                                     onTextChange={this.onTextChange}/>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <CustomTextField number={3} q={false}
                                     onTextChange={this.onTextChange}/>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <CustomTextField number={4} q={false}
                                     onTextChange={this.onTextChange}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}


export default SingleQuestionExpansionPanel;