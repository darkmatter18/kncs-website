import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        marginTop: theme.spacing(6),
        width: '100%',
        position: 'relative',
        bottom: 0
    },
    container: {
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2)
    }
}))

const Footer = () => {
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Typography variant={"subtitle1"} align={"center"}>
                    KNCS and It's
                    Developers &copy; {new Intl.DateTimeFormat('en', {year: 'numeric'}).format(new Date())}
                </Typography>
                <Typography variant={"subtitle1"} align={"center"}>
                    All rights received
                </Typography>
            </Container>
        </div>
    )
}

export default Footer