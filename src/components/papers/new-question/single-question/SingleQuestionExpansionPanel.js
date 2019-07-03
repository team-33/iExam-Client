import React from 'react';
import {Button, CircularProgress, Divider, FormControl, InputLabel, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SaveIcon from '@material-ui/icons/Save';
import {withRouter} from 'react-router-dom';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from 'axios';
import {CHECK_QUESTION_API, ADD_QUESTION_API} from './../../../../URL';

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
            number: 1,
            question: '',
            answer0: '',
            answer1: '',
            answer2: '',
            answer3: '',
            answer4: '',
        }
    };

    componentDidMount() {
        if (!this.props.location.state) this.props.history.push('/');
    }

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
    };

    onChangeNumber = event => this.setState({
        question: {
            ...this.state.question,
            [event.target.name]: event.target.value
        }
    });

    onSave = async event => {
        let res = await axios.post(ADD_QUESTION_API + '/' + this.state.paper._id, this.state.question);
        // let res = await axios.get(CHECK_QUESTION_API + '/' + this.state.paper._id + "/" + this.state.question.number);
        console.log(res);
    };

    render() {
        const {paper} = this.state;
        return (
            <Grid container>
                <Grid item lg={3} md={3}/>
                {paper ?
                    <Grid item lg={6} md={6} sm={12} xs={12} style={styles.questionPanel}>
                        <br/>
                        <h2>Add new Question</h2>
                        <br/>
                        <FormControl style={{width: '40%'}}>
                            <InputLabel htmlFor="number">Question Number</InputLabel>
                            <Select
                                onChange={this.onChangeNumber}
                                name='number'
                                value={this.state.question.number}>
                                {
                                    new Array(paper.numberOfQuestions).fill().map((d, i) =>
                                        <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
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
                                    color={"primary"}
                                    onClick={this.onSave}>

                                Save <SaveIcon/>
                            </Button>
                        </div>
                        <br/>
                    </Grid>
                    : <CircularProgress/>
                }
                <Grid item lg={3} md={3}/>
            </Grid>
        );
    }
}


export default withRouter(SingleQuestionExpansionPanel);