import React from 'react';
import axios from 'axios';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import {GET_PAPER_API} from '../../URL'
import {Card, CardContent, CardHeader, IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

class Paper extends React.Component {

    state = {
        anchorEl: null,
        paper: ''
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
        this.props.history.push('/users/paper/edit')
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        //paper details and answers
        axios.get(GET_PAPER_API + '/get/' + id).then(function (res) {
            this.setState({paper: res.data});
        }.bind(this)).catch((e) => this.setState({paper: {error: 1}}));
    }

    render() {
        const {paper, anchorEl} = this.state;
        console.log(paper);
        return (
            <div>
                <Fade
                    in={paper !== '' && !paper.error}
                    style={{
                        transitionDelay: paper !== '' && !paper.error ? '800ms' : '0ms',
                    }}
                    unmountOnExit>
                    <Card>
                        <CardHeader
                            action={
                                <IconButton
                                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleClick}
                                >
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={paper.subject + "  |  " + paper.year}
                            subheader={paper.description}
                        />
                        <CardContent>
                            {paper.questions ? JSON.stringify(paper.questions) : null}
                            {paper.questions ? Object.keys(paper.questions).length : null}
                        </CardContent>
                    </Card>
                </Fade>
                <Fade
                    in={paper === ''}
                    style={{
                        transitionDelay: paper === '' ? '800ms' : '0ms',
                    }}
                    unmountOnExit>
                    <div style={{textAlign: 'center'}}>
                        <CircularProgress/>
                    </div>
                </Fade>
                <Fade
                    in={paper.error === 1}
                    style={{
                        transitionDelay: paper.error === 1 ? '800ms' : '0ms',
                    }}
                    unmountOnExit>
                    <div>
                        Paper Not found in Database
                    </div>
                </Fade>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                            <EditIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary={"Edit paper"}/>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                            <EditIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary={"Add Question"}/>
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}

export default Paper;
