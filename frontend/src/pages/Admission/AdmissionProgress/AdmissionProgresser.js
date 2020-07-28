import React from "react";
import Container from "@material-ui/core/Container";
import Header from "../../../components/Header";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Progress1PersonalInfo from "./Progress1PersonalInfo";
import Progress2AcademicInfo from "./Progress2AcademicInfo";
import Progress3PaymentInfo from "./Progress3PaymentInfo";
import {ADMISSION_PROGRESS} from "../../../constant";
import Progress4Declaration from "./Progress4Declaration";
import {Redirect} from "react-router-dom";
import {ADMISSION_EXISTING} from "../../../routes/route";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useAuth, useSignOut} from "react-auth-jwt";

const AdmissionProgresser = ({progress}) => {
    const signOut = useSignOut()
    const auth = useAuth()
    const activeStep = ADMISSION_PROGRESS.findIndex((e) => e === progress)//Stepper step number
    const steps = ['Personal Info', 'Academic Info', 'Payment Info', "Declaration"]

    const headerLinks = [
        (
            `Application No.- (${<b>{auth().authState.application_no}</b>})`
        ),
        (
            <IconButton onClick={() => signOut()} aria-label="show 17 new notifications" color="inherit">
                <ExitToAppIcon/>
            </IconButton>
        )
    ]

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Progress1PersonalInfo/>
            case 1:
                return <Progress2AcademicInfo/>
            case 2:
                return <Progress3PaymentInfo/>
            case 3:
                return <Progress4Declaration/>
            default:
                return <Redirect to={ADMISSION_EXISTING}/>
        }
    }
    return (
        <React.Fragment>
            <Header links={headerLinks}/>
            <Container>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {getStepContent(activeStep)}
                </div>
            </Container>
        </React.Fragment>
    )
}

export default AdmissionProgresser