import React from 'react';
import {connect} from "react-redux";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import {Input} from "@material-ui/core";

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
      rand : this.props.panel
    };

    render() {
        const {expanded,panel} = this.props;
        return (
            <ExpansionPanel expanded={expanded === panel} onChange={this.props.handleChange(panel)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography style={styles.heading}>General settings {this.state.rand}</Typography>
                    <Typography style={styles.secondaryHeading}>I am an expansion panel</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                        maximus est, id dignissim quam.
                    </Typography>
                    <input type='text'/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }


}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, null)(SingleQuestionExpansionPanel);