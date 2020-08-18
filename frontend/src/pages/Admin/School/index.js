import React from "react"
import {makeStyles} from "@material-ui/styles";
import AdminHeader from "../AdminHeader";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    content: {
        marginLeft: theme.spacing(15)
    }
}))

const School = () => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <AdminHeader/>
            <main className={classes.content}>
                <Typography>
                    Hello World
                </Typography>
            </main>
        </React.Fragment>
    )
}

export default School