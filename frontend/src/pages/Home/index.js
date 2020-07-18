import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%'
    },
    internal: {
        margin: 'auto'
    }
}))

const Home = () => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid container alignItems={"center"} justify={"center"} alignContent={"center"} className={classes.root}>
                <Grid item md={12}>
                    <Typography variant={"h4"} align={"center"} color={"textPrimary"}>
                        Application for Admission to Class XI
                    </Typography>
                    <Typography variant={"h6"} align={"center"} color={"textSecondary"}>
                        Application form will be available on 18th July 2020 from 12:00PM onwards
                    </Typography>
                    <Typography variant={"h6"} align={"center"} color={"textSecondary"}>
                        Please press F5 or refresh the page if you see the message after the mentioned time.
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Home;