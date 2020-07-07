import React from "react";
import { useParams } from "react-router-dom";
import AdmissionProgressBack from "../../components/AdmissionProgressBack";

const Progress4Declaration = () => {
    let { user_id } = useParams();
    return (
        <React.Fragment>
            {user_id} Declaration
            <AdmissionProgressBack/>
        </React.Fragment>
    )
}

export default Progress4Declaration