import React from "react";
import { useParams } from "react-router-dom";

const Progress4Declaration = () => {
    let { user_id } = useParams();
    return (
        <React.Fragment>
            {user_id} Declaration
        </React.Fragment>
    )
}

export default Progress4Declaration