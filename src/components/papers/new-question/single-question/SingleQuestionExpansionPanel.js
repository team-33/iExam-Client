import React from 'react';
import {Button, CircularProgress, Divider, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SaveIcon from '@material-ui/icons/Save';
import {withRouter} from 'react-router-dom';

const styles = {
    questionPanel: {
        borderRadius: 12,
        border: '1px grey solid',
        padding: 10,
        boxShadow: 'grey 2px 2px 5px'
    }
};

class SingleQuestionExpansionPanel extends React.Component {

    state = {
        paper: this.props.location.state,
        question: {
            question: '',
            answer0: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
        }
    };

    customTextElement = (number, question) =>
        <TextField
            fullWidth
            label={question ? 'Question text' : `Answer ${number + 1} text`}
            required
            variant={"outlined"}
            value={this.state.text}
            onChange={this.onChangeText(number, question)}
            multiline
        />;

    onChangeText = (number, question) => async e => {
        question ?
            await this.setState({question: {...this.state.question, question: e.target.value}}) :
            await this.setState({question: {...this.state.question, ['answer' + number]: e.target.value}});
        console.log(this.state);
    };

    render() {
        console.log(this.state);
        return (
            <Grid container>
                <Grid item lg={3} md={3}/>
                {this.state.paper ?
                    <Grid item lg={6} md={6} sm={12} xs={12} style={styles.questionPanel}>
                        <br/>
                        <h2>Add new Question</h2>
                        <br/><br/>
                        {this.customTextElement(99, true)}
                        <br/><br/>
                        <Divider/>
                        <br/><br/>
                        {this.customTextElement(0, false)}
                        <br/><br/>
                        {this.customTextElement(1, false)}
                        <br/><br/>
                        {this.customTextElement(2, false)}
                        <br/><br/>
                        {this.customTextElement(3, false)}
                        <br/><br/>
                        {this.customTextElement(4, false)}
                        <br/><br/>
                        <div style={{textAlign: 'right'}}>
                            <Button variant={"contained"}
                                    color={"primary"}>

                                Save <SaveIcon/>
                            </Button>
                        </div>
                        <br/>
                    </Grid>
                    : <CircularProgress/>
                }
                <Grid item lg={3} md={3}/>
            </Grid>
        )
            ;
    }
}


export default withRouter(SingleQuestionExpansionPanel);