import React from "react";
import Container from "@material-ui/core/Container";
import Header from "../../components/Header";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

const AdmissionProgresser = ({ user_id, progress }) => {
    const [activeStep, setActiveStep] = React.useState(0); //Stepper step number

    const steps = getSteps();

    return (
        <React.Fragment>
            <Header/>
            <Container>
                <div>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label} >
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default AdmissionProgresser