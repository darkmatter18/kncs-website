import React from "react";
import Grid from "@material-ui/core/Grid";
import {ClassRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme)=> ({

}))

const Classes = () => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <Grid container alignItems={"center"}>
                <Grid item>
                    <ClassRounded/>
                </Grid>
                <Grid item>
                    <Typography variant="h5" component="h2">
                        Classes
                    </Typography>
                </Grid>
            </Grid>


        </React.Fragment>
    )
}

export default Classes