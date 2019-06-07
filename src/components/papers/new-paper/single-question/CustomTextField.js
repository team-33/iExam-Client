import React from 'react';
import {TextField} from "@material-ui/core";

class CustomTextField extends React.Component {

    state = {
        text: '',
    };


    onChangeText = e => {
        this.setState({text: e.target.value});
    };

    render() {
        const {q, number} = this.props;
        return (
            <div style={{textAlign: 'right', flexGrow: 1}}>
                <TextField
                    fullWidth
                    label={q ? 'Question text' : `Answer ${number + 1} text`}
                    required
                    variant={"outlined"}
                    value={this.state.text}
                    onChange={this.onChangeText}
                    onKeyPress={this.onKeyEvent}
                    multiline
                />
            </div>
        );
    }


}

export default CustomTextField;