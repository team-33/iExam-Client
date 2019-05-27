import React from 'react';
import {connect} from "react-redux";
import {TextField, Tooltip} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import conveter from '../../../HOCs/converter';

class Question extends React.Component {

    state = {
        text: '',
        tooltip: '',
        switchLanguage: false,
    };


    //on sinhala typing
    onChangeText = async e => {
        await this.setState({text: e.target.value});
        if (this.state.switchLanguage) {
            const words = this.state.text.split(/\W/);
            const targetWord = words[words.length - 1];
            this.setState({tooltip: conveter(targetWord)});
        } else this.setState({tooltip: ''})
    };

    //on sinhala typing
    onKeyEvent = e => {
        if (this.state.switchLanguage)
            if (e.key.match(/\W/) || e.key === 'Enter') {
                const words = this.state.text.split(/\W/);
                const targetWord = words[words.length - 1];
                const newText = this.state.text.replace(/\w+$/, conveter(targetWord));
                this.setState({text: newText});
                this.setState({tooltip: ''});
            }
    };

    onChangeSwitch = name => async e => {
        await this.setState({[name]: !this.state[name]});

    };

    render() {
        return (
            <div style={{textAlign: 'right', flexGrow: 1}}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.switchLanguage}
                            onChange={this.onChangeSwitch('switchLanguage')}
                        />
                    }
                    label={this.state.switchLanguage ? conveter('sixhala') : 'English'}
                />

                <Tooltip
                    title={this.state.tooltip}
                    disableHoverListener
                    placement="top"
                >
                    <TextField
                        fullWidth
                        label={'Question text'}
                        required
                        variant={"outlined"}
                        value={this.state.text}
                        onChange={this.onChangeText}
                        onKeyPress={this.onKeyEvent}
                        multiline
                    />
                </Tooltip>
            </div>
        );
    }


}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, null)(Question);