import React from "react";
import Header from "../components/Header";
import AdmissionNewExistingSwitch from "../components/AdmissionNewExistingSwitch";


const AdmissionExisting = () => {
    return (
        <React.Fragment>
            <Header/>
            <AdmissionNewExistingSwitch routeId={1}/>
        </React.Fragment>
    )
}

export default AdmissionExisting