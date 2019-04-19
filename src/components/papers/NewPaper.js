import React from 'react';
import {connect} from "react-redux";

import * as paperActions from '../../actions/papers';

class NewPaper extends React.Component {
    state = {
        subject: 'Physics',
        year: 2010,
        minutes:120,
        numberOfQuestions:50,
        description:'',
        likes:Math.floor(Math.random() * 51),
        dislikes:Math.floor(Math.random() * 30),
        rating:(Math.random() * 5.0).toFixed(2),
    };

    onSubmit = async event => {
        event.preventDefault();
        await this.props.insertPaper(this.state);
        if(!this.props.error){
            this.setState({
                subject: 'Physics',
                year: 2010,
                minutes:120,
                numberOfQuestions:50,
                description:'',
                likes:Math.floor(Math.random() * 51),
                dislikes:Math.floor(Math.random() * 30),
                rating:(Math.random() * 5.0).toFixed(2),
            });
            this.props.history.push('/papers');
        } else {
            alert(this.props.error);
        }
    };

    onChangeText = async event => {
        await this.setState({[event.target.name]: event.target.value});
    };

    onChangeNumber = async event => {
        await this.setState({[event.target.name]: +event.target.value});
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    Subject:
                    <select name='subject' value={this.state.subject} onChange={this.onChangeText}>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Mathematics">Mathematics</option>
                    </select>
                    Year:
                    <select name='year' value={this.state.year} onChange={this.onChangeNumber}>
                        {
                            new Array(new Date().getFullYear() - 1990).fill().map((d, i) =>
                                <option key={i + 1990} value={i + 1990}>{i + 1990}</option>
                            )
                        }
                    </select>
                    <br/>
                    Description:
                    <textarea value={this.state.description} name='description' style={{resize:'none'}} onChange={this.onChangeText} />
                    <br/>
                    <select name='minutes' value={this.state.minutes} onChange={this.onChangeNumber}>
                        {
                            new Array(201).fill().map((d, i) =>
                                <option key={i} value={i}>{i}</option>
                            )
                        }
                    </select> minutes
                    <br/>
                    <select name='numberOfQuestions' value={this.state.numberOfQuestions} onChange={this.onChangeNumber}>
                        {
                            new Array(61).fill().map((d, i) =>
                                <option key={i} value={i}>{i}</option>
                            )
                        }
                    </select> minutes
                    <br/>
                    <input type='submit'/>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.papers.errMessage,
    };
}

export default connect(mapStateToProps,paperActions)(NewPaper);