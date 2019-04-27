import React from 'react';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import * as paperActions from '../../../actions/papers';
import {Divider, FormControl, InputLabel, Select, Typography} from "@material-ui/core";
import QuestionsPanel from "./QuestionsPanel";
import Textarea from "@material-ui/core/InputBase/Textarea";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

const style = {
    root: {
        marginTop: 5,
    },
    form: {
        border: '1px black solid',
        padding: 20,
        borderRadius: 10,
        boxShadow: '3px 3px 5px gray'
    },
    formTitle: {
        fontSize: '24px',
        textAlign: 'center'
    },
    formSubTitle: {
        fontSize: '20px',
        textAlign: 'center',
        marginBottom: 8
    },
    input: {},
    inputTitle: {
        width: 70,
        lineHeight: '24px',
    },
    inputTextArea: {
        resize: 'none',
        marginBottom: 15,
        border: '1px gray solid',
        borderRadius: '3px',
        paddingRight: '5px',
        paddingLeft: '5px',
    },
    inputSelect: {
        width: '100%',
    }

};

class NewPaper extends React.Component {
    state = {
        subject: '',
        year: '',
        minutes: '',
        numberOfQuestions: '',
        description: '',
        likes: Math.floor(Math.random() * 51),
        dislikes: Math.floor(Math.random() * 30),
        rating: (Math.random() * 5.0).toFixed(2),
        questions: []
    };

    onSubmit = async event => {
        event.preventDefault();
        await this.props.insertPaper(this.state);
        if (!this.props.error) {
            this.setState({
                subject: '',
                year: '',
                minutes: '',
                numberOfQuestions: '',
                description: '',
                likes: Math.floor(Math.random() * 51),
                dislikes: Math.floor(Math.random() * 30),
                rating: (Math.random() * 5.0).toFixed(2),
                questions: []
            });
            this.props.history.push('/papers');
        } else {
            alert(this.props.error);
        }
    };

    onAddQuestion = () => () => {
        console.log("here");
    };

    onChangeText = event => this.setState({[event.target.name]: event.target.value});

    onChangeNumber = event => this.setState({[event.target.name]: event.target.value});

    render() {
        return (
            <Grid container spacing={24} style={style.root}>
                <Grid item lg={3} md={2} xs={12}></Grid>
                <Grid item lg={6} md={8} xs={12}>
                    <form onSubmit={this.onSubmit} style={style.form}>

                        {/*heading*/}
                        <div style={style.formTitle}>Insert New Paper</div>
                        <br/>

                        {/*sub title - paper descriptions*/}
                        <div style={style.formSubTitle}>Details</div>

                        <Grid container spacing={24}>
                            {/*subject*/}
                            <Grid item xs={6}>
                                <FormControl style={{width: '90%'}}>
                                    <InputLabel htmlFor="subject-simple">Subject</InputLabel>
                                    <Select
                                        inputProps={{name: 'subject', id: 'subject-simple'}}
                                        style={style.inputSelect}
                                        value={this.state.subject}
                                        onChange={this.onChangeText}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Physics">Physics</MenuItem>
                                        <MenuItem value="Chemistry">Chemistry</MenuItem>
                                        <MenuItem value="Mathematics">Mathematics</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/*year*/}
                            <Grid item xs={6}>
                                <FormControl style={{width: '90%'}}>
                                    <InputLabel htmlFor="year-simple">Year</InputLabel>
                                    <Select
                                        inputProps={{name: 'year', id: 'year-simple'}}
                                        style={style.inputSelect}
                                        onChange={this.onChangeNumber}
                                        value={this.state.year}>
                                        <MenuItem value=''>
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            new Array(new Date().getFullYear() + 1 - 1990).fill().map((d, i) =>
                                                <MenuItem key={i + 1990} value={i + 1990}>{i + 1990}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br/>

                        {/*description*/}
                        <span style={style.inputTitle}>Description: </span><br/>
                        <Textarea value={this.state.description}
                                  name='description'
                                  style={style.inputTextArea}
                                  onChange={this.onChangeText}
                                  rows={5}
                                  placeholder='Short Description about the paper'
                        />
                        <br/>

                        {/*minutes*/}
                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <FormControl style={{width: '90%'}}>
                                    <InputLabel htmlFor="time-simple">Time</InputLabel>
                                    <Select style={style.inputSelect} name='minutes' value={this.state.minutes}
                                            onChange={this.onChangeNumber}>
                                        <MenuItem value=''>
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            new Array(200).fill().map((d, i) =>
                                                <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                            )
                                        }
                                    </Select>
                                    <FormHelperText>minutes</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/*Number of Questions*/}
                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <FormControl style={{width: '90%'}}>
                                    <InputLabel htmlFor="ques-simple">Questions</InputLabel>

                                    <Select style={style.inputSelect}
                                            name='numberOfQuestions'
                                            value={this.state.numberOfQuestions}
                                            onChange={this.onChangeNumber}>
                                        <MenuItem value=''>
                                            <em>None</em>
                                        </MenuItem>
                                        {
                                            new Array(60).fill().map((d, i) =>
                                                <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br/>

                        <Divider/>
                        <br/>

                        {/*sub title - Questions*/}
                        <Typography style={style.formSubTitle}>Questions</Typography>

                        <QuestionsPanel numberOfQuestions={this.state.numberOfQuestions}/>

                        <div style={{textAlign: 'center'}}>
                            <Button variant='contained' type='submit' color='primary'>
                                Insert Paper
                                <SaveIcon style={{marginLeft: '5px'}}/>
                            </Button>
                        </div>
                    </form>
                </Grid>
                <Grid item lg={3} md={2} xs={12}></Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.papers.errMessage,
    };
}

export default connect(mapStateToProps, paperActions)(NewPaper);