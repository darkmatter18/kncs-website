import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Footer from "../../components/Footer";

const useStyles = makeStyles(() => ({
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
                    <br/>
                    <Typography variant={"h6"} align={"center"} color={"textSecondary"}>
                        Due to some unavoidable circumstances, the application form is not yet released.<br/>
                        Please keep visiting the page periodically. <br/>
                        The form will be available soon. Thank you for your understanding and co-operation.
                    </Typography>
                </Grid>
            </Grid>
            <Footer/>
        </React.Fragment>
    )
}

export default Home;