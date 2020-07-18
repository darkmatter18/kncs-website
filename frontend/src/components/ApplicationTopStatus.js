import React from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useAuth, useSignOut} from "react-auth-jwt";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme)=>({
    root: {
        marginBottom: theme.spacing(6)
    }
}))

const ApplicationTopStatus = () => {
    const classes = useStyles()
    const auth = useAuth()
    const signOut = useSignOut()
    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item md={6}>
                        <Typography variant={"body1"} align={"left"}>
                            Application No: <b>{auth().authState.application_no}</b>
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Typography align={"right"}>
                            <Button variant={"outlined"} onClick={()=>{signOut()}} endIcon={<ExitToAppIcon/>}>
                                Sign Out
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default ApplicationTopStatus