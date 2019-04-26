import React from 'react';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import * as paperActions from '../../../actions/papers';
import {Divider, Typography} from "@material-ui/core";
import QuestionsPanel from "./QuestionsPanel";

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
    input: {

    },
    inputTitle: {
        width: 70,
        lineHeight: '24px',
    },
    inputTextArea: {
        resize: 'none',
        width: '100%',
        marginBottom: 15
    },
    inputSelect: {
        width: '100%',
    }

};

class NewPaper extends React.Component {
    state = {
        subject: 'Physics',
        year: 2010,
        minutes: 120,
        numberOfQuestions: 50,
        description: '',
        likes: Math.floor(Math.random() * 51),
        dislikes: Math.floor(Math.random() * 30),
        rating: (Math.random() * 5.0).toFixed(2),
        questions:[]
    };

    onSubmit = async event => {
        event.preventDefault();
        await this.props.insertPaper(this.state);
        if (!this.props.error) {
            this.setState({
                subject: 'Physics',
                year: 2010,
                minutes: 120,
                numberOfQuestions: 50,
                description: '',
                likes: Math.floor(Math.random() * 51),
                dislikes: Math.floor(Math.random() * 30),
                rating: (Math.random() * 5.0).toFixed(2),
                questions:[]
            });
            this.props.history.push('/papers');
        } else {
            alert(this.props.error);
        }
    };

    onAddQuestion = () => () => {
      console.log("here");
    };

    onChangeText = async event => {
        await this.setState({[event.target.name]: event.target.value});
    };

    onChangeNumber = async event => {
        await this.setState({[event.target.name]: +event.target.value});
    };

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
                            <Grid item lg={2} md={2} sm={2} xs={2}>
                                <span style={style.inputTitle}>Subject: </span>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <select name='subject' style={style.inputSelect} value={this.state.subject}
                                        onChange={this.onChangeText}>
                                    <option value="Physics">Physics</option>
                                    <option value="Chemistry">Chemistry</option>
                                    <option value="Mathematics">Mathematics</option>
                                </select>
                            </Grid>

                            {/*year*/}
                            <Grid item lg={2} md={2} sm={2} xs={2}>
                                <span style={style.inputTitle}>Year: </span>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <select name='year' style={style.inputSelect} value={new Date().getFullYear()}
                                        onChange={this.onChangeNumber}>
                                    {
                                        new Array(new Date().getFullYear() + 1 - 1990).fill().map((d, i) =>
                                            <option key={i + 1990} value={i + 1990}>{i + 1990}</option>
                                        )
                                    }
                                </select>
                            </Grid>
                        </Grid>
                        <br/>

                        {/*description*/}
                        <span style={style.inputTitle}>Description: </span><br/>
                        <textarea value={this.state.description}
                                  name='description'
                                  style={style.inputTextArea}
                                  onChange={this.onChangeText}
                                  rows={5}
                                  placeholder='Short Description about the paper'
                        />
                        <br/>

                        {/*minutes*/}
                        <Grid container spacing={24}>
                            <Grid item lg={2} md={2} sm={2} xs={2}>
                                <span style={style.inputTitle}>Time:</span>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <select style={style.inputSelect} name='minutes' value={this.state.minutes} onChange={this.onChangeNumber}>
                                    {
                                        new Array(201).fill().map((d, i) =>
                                            <option key={i} value={i}>{i}</option>
                                        )
                                    }
                                </select>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span style={style.inputTitle}>minutes</span>
                            </Grid>
                        </Grid>

                        {/*Number of Questions*/}
                        <Grid container spacing={24}>
                            <Grid item lg={2} md={2} sm={2} xs={2}>
                                <span style={style.inputTitle}>Questions:</span>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <select style={style.inputSelect} name='numberOfQuestions' value={this.state.numberOfQuestions}
                                        onChange={this.onChangeNumber}>
                                    {
                                        new Array(61).fill().map((d, i) =>
                                            <option key={i} value={i}>{i}</option>
                                        )
                                    }
                                </select>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span style={style.inputTitle}></span>
                            </Grid>
                        </Grid>
                        <br/>

                        <Divider/>
                        <br/>

                        {/*sub title - Questions*/}
                        <Typography style={style.formSubTitle}>Questions</Typography>

                        <QuestionsPanel numberOfQuestions={this.state.numberOfQuestions}/>

                        <div style={{textAlign:'center'}}>
                            <Button variant='contained' type='submit' color='primary'>
                                Insert Paper
                                <SaveIcon style={{marginLeft:'5px'}}/>
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