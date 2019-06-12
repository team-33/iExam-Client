import React from 'react';
import Grid from '@material-ui/core/Grid';

import NewPaperForm from "./NewPaperForm";

class NewPaper extends React.Component {

    render() {
        return (
            <Grid container spacing={24} style={{marginTop: 5}}>
                <Grid item lg={3} md={2} xs={12}/>
                <Grid item lg={6} md={8} xs={12}>
                    <NewPaperForm/>
                </Grid>
                <Grid item lg={3} md={2} xs={12}/>
            </Grid>
        )
    }
}

export default NewPaper;