import React from 'react';
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';

import NewPaperForm from "./NewPaperForm";
import {Stepper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import StepLabel from "@material-ui/core/StepLabel";
import Step from "@material-ui/core/Step";
import QuestionsPanel from "./QuestionsPanel";
import Fade from "@material-ui/core/Fade";

function getSteps() {
    return ['Details about Paper', 'Questions', 'Confirm Paper'];
}


class NewPaper extends React.Component {

    state = {
        activeStep: 0,
        skipped: new Set(),
        paperDetails: '',
    };

    updatePaperDetails = async paper =>
        this.setState({paperDetails: paper});

    isStepSkipped = step => this.state.skipped.has(step);

    handleNext = async () => {
        const {activeStep} = this.state;
        let {skipped} = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    handleSkip = () => {
        const {activeStep} = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
    };


    isStepOptional = step => step === 1;

    render() {
        const steps = getSteps();
        const {activeStep} = this.state;
        return (
            <Grid container spacing={24} style={{marginTop: 5}}>
                <Grid item lg={3} md={2} xs={12}/>
                <Grid item lg={6} md={8} xs={12}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const props = {};
                            const labelProps = {};
                            if (this.isStepOptional(index)) {
                                labelProps.optional = <Typography variant="caption">Optional</Typography>;
                            }
                            if (this.isStepSkipped(index)) {
                                props.completed = false;
                            }
                            return (
                                <Step key={label} {...props}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <Fade in={activeStep === 0}
                          unmountOnExit>
                        <NewPaperForm stepNext={this.handleNext} updatePaperDetails={this.updatePaperDetails}/>
                    </Fade>
                    <Fade in={activeStep === 1}
                          unmountOnExit>
                        <QuestionsPanel numberOfQuestions={this.state.paperDetails.numberOfQuestions}/>
                    </Fade>

                </Grid>
                <Grid item lg={3} md={2} xs={12}/>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.papers.errMessage,
    };
}

export default connect(mapStateToProps, null)(NewPaper);