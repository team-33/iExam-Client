import React from 'react';
import axios from "axios";
import {GET_ALL_USERS} from './../../URL';
import {
    Avatar,
    Card,
    CardHeader,
    IconButton, TextField,
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";

class Users extends React.Component {

    state = {
        users: [],
        searchText: ''
    };

    dot = (state, name) =>

        <Grid container spacing={8}>
            <Grid item style={{paddingTop: 10}}>
                <div style={{
                    width: 12,
                    height: 12,
                    background: state ? 'limegreen' : 'tomato',
                    borderRadius: 20,
                }}
                />
            </Grid>
            <Grid item>
                {name}
            </Grid>
        </Grid>;

    onChangeSearchText = event => {
        this.setState({searchText: event.target.value})
    };

    componentDidMount() {
        axios.get(GET_ALL_USERS).then(res => {
            this.setState({users: res.data})
        }).catch(e => console.log(e));
    }

    render() {
        return (
            <div>
                <div style={{padding: '0px 30px'}}>
                    <TextField
                        value={this.state.searchText}
                        onChange={this.onChangeSearchText}
                        placeholder="Search"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <br/>
                <Grid container>
                    <Grid item xl={4} lg={4} md={3} xs={false}/>
                    <Grid item xl={4} lg={4} md={6} xs={12}>
                        {
                            this.state.users.map((user, index) => {
                                var displayName = user.given_name.toLowerCase() + " " + user.family_name.toLowerCase();
                                return displayName.includes(this.state.searchText.toLowerCase()) ?
                                    <div key={index}>
                                        <Card>
                                            <CardHeader
                                                avatar={<Avatar src={user.photo}/>}
                                                action={
                                                    <IconButton aria-label="Settings">
                                                        <MoreVertIcon/>
                                                    </IconButton>
                                                }
                                                title={
                                                    this.dot(Math.floor(Math.random() * 2), user.given_name + ' ' + user.family_name)
                                                }
                                                subheader={user.email}
                                            />
                                        </Card>
                                        <br/>
                                    </div>
                                    : null;
                            })
                        }
                    </Grid>
                    <Grid item xl={4} lg={4} md={3} xs={false}/>
                </Grid>
            </div>
        )
    }
}

export default Users;
