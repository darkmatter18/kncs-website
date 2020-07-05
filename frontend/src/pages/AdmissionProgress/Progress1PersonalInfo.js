import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const Progress1PersonalInfo = () => {
    let { user_id } = useParams();
    return (
        <React.Fragment>
            <Header/>
            {user_id}
        </React.Fragment>
    )
}

export default Progress1PersonalInfo