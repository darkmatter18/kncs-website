import React from "react";
import {useParams, Redirect} from "react-router-dom";
import {ADMISSION_PROGRESS} from "../../../constant";
import {ADMISSION_NEW} from "../../RouterComponent/routes";
import AdmissionProgresser from "./AdmissionProgresser";

const AdmissionProgress = () => {
    let {progress} = useParams();
    if (!ADMISSION_PROGRESS.includes(progress)) {
        return <Redirect to={ADMISSION_NEW}/>
    } else {
        return <AdmissionProgresser progress={progress}/>
    }
}

export default AdmissionProgress