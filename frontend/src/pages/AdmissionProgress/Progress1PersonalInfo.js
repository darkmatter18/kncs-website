import React from "react";
import { useParams } from "react-router-dom";
import AdmissionProgressBack from "../../components/AdmissionProgressBack";

const Progress1PersonalInfo = () => {
    let { user_id } = useParams();
    return (
        <React.Fragment>
            {user_id}
            <AdmissionProgressBack/>
        </React.Fragment>
    )
}

export default Progress1PersonalInfo