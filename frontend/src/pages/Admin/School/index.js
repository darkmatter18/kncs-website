import React from "react"
import {makeStyles} from "@material-ui/styles";
import AdminHeader from "../AdminHeader";

const useStyles = makeStyles(() => ({
    list: {
        width: 250,
    },
}))

const School = () => {

    return (
        <React.Fragment>
            <AdminHeader/>
        </React.Fragment>
    )
}

export default School