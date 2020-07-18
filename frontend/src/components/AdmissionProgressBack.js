import React from "react";
import {ArrowLeft} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {useHistory, useParams} from "react-router-dom";
import {ADMISSION_PROGRESS} from "../constant";

const AdmissionProgressBack = () => {
    let {progress} = useParams();
    const history = useHistory()
    const activeStep = ADMISSION_PROGRESS.findIndex((e) => e === progress)
    const handleBackButtonClick = () => {
        const previousStep = activeStep - 1
        if (previousStep < 0) {
            history.push(`/admission/progress/${ADMISSION_PROGRESS[0]}`)
        } else {
            history.push(`/admission/progress/${ADMISSION_PROGRESS[previousStep]}`)
        }
    }

    return (
        <React.Fragment>
            <Button startIcon={<ArrowLeft/>} disabled={activeStep === 0} variant={"outlined"} color={"secondary"}
                    onClick={handleBackButtonClick}>
                Back
            </Button>
        </React.Fragment>
    )
}


export default AdmissionProgressBack