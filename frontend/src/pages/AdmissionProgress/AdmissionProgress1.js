import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const AdmissionProgress1 = () => {
    let { user_id } = useParams();
    return (
        <React.Fragment>
            <Header/>
            {user_id}
        </React.Fragment>
    )
}

export default AdmissionProgress1