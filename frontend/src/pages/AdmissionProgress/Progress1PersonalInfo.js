import React from "react";
import { useParams } from "react-router-dom";

const Progress1PersonalInfo = () => {
    let { user_id } = useParams();
    return (
        <React.Fragment>
            {user_id}
        </React.Fragment>
    )
}

export default Progress1PersonalInfo