import React from 'react';
import {connect} from "react-redux";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import {TextField, Tooltip} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import conveter from '../../../HOCs/converter';
import Question from "./Question";

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
        rand: this.props.panel,

        questionText: '',
        questionTooltip: '',
        questionSwitchLanguage: false,

        Answer1Text: '',
        Answer1Tooltip: '',
        Answer1SwitchLanguage: false,
    };

    onChangeText = async e => {
        await this.setState({questionText: e.target.value});
        if (this.state.questionSwitchLanguage) {
            const words = this.state.questionText.split(' ');
            const targetWord = words[words.length - 1];
            this.setState({questionTooltip: conveter(targetWord)});
        } else this.setState({questionTooltip: ''})
    };

    onKeyEvent = e => {
        if (e.key === 'Enter') e.preventDefault();
        if (this.state.questionSwitchLanguage)
            if (e.key === ' ' || e.key === 'Enter') {
                const words = this.state.questionText.split(' ');
                const targetWord = words[words.length - 1];
                const newText = this.state.questionText.replace(targetWord, conveter(targetWord));
                this.setState({questionText: newText});
                this.setState({questionTooltip: ''});
            }
    };

    onChangeSwitch = name => async e => {
        await this.setState({[name]: !this.state[name]});

    };

    render() {
        const {expanded, panel} = this.props;

        return (
            <ExpansionPanel expanded={expanded === panel} onChange={this.props.handleChange(panel)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography style={styles.heading}>General settings {this.state.rand}</Typography>
                    <Typography style={styles.secondaryHeading}>I am an expansion panel</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <Question/>
                </ExpansionPanelDetails>

                <ExpansionPanelDetails>
                    <TextField
                        fullWidth
                        label={'Answer 1'}
                        required
                        variant={'outlined'}
                        onChange={this.onChangeText}
                        onKeyPress={this.onKeyEvent}
                    />
                    <FormControlLabel
                        style={{width: 110}}
                        control={
                            <Switch
                                checked={this.state.questionSwitchLanguage}
                                onChange={e => {
                                    this.setState({questionSwitchLanguage: !this.state.questionSwitchLanguage})
                                }}
                            />
                        }
                        label={this.state.questionSwitchLanguage ? conveter('si\\nhala') : 'English'}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }


}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, null)(SingleQuestionExpansionPanel);