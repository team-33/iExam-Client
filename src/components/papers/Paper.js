import React from 'react';
import axios from 'axios';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    GET_PAPER_API,
    DELETE_PAPER_API
} from '../../URL'
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import PlusIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

class Paper extends React.Component {

    state = {
        anchorEl: null,
        paper: ''
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleCloseMenu = async type => {
        this.setState({anchorEl: null});
        switch (type) {
            case 'edit-paper':
                this.props.history.push('/papers/edit/' + this.props.match.params.id);
                break;
            case 'add-questions':
                this.props.history.push({
                    pathname: '/papers/add/',
                    state: this.state.paper
                });
                break;
            case 'delete-paper':
                var res = await axios.delete(DELETE_PAPER_API + '/' + this.state.paper._id);
                if (res.status === 200) {
                    alert("delete Success!");
                    this.props.history.push('/');
                } else {
                    alert("error!")
                }
                break;
            default:
                return;
        }
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
        return (
            <div>
                <Fade
                    in={paper !== '' && !paper.error}
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
                    unmountOnExit>
                    <div style={{textAlign: 'center'}}>
                        <CircularProgress/>
                    </div>
                </Fade>
                <Fade
                    in={paper.error === 1}
                    unmountOnExit>
                    <div>
                        Paper Not found in Database
                    </div>
                </Fade>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => this.handleCloseMenu()}>
                    <MenuItem onClick={() => this.handleCloseMenu('add-questions')}>
                        <ListItemIcon>
                            <PlusIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Add Question"}/>
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={() => this.handleCloseMenu('edit-paper')}>
                        <ListItemIcon>
                            <EditIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Edit paper"}/>
                    </MenuItem>
                    <MenuItem onClick={() => this.handleCloseMenu('delete-paper')}>
                        <ListItemIcon>
                            <DeleteIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Delete"}/>
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}

export default Paper;
