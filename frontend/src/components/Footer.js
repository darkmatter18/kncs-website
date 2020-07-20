import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import {MEET_THE_DEVS} from "../routes/route";

const useStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        marginTop: theme.spacing(6),
        width: '100%',
        position: props => props.Ftype || 'relative',
        bottom: 0
    },
    container: {
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2)
    }
}))

const Footer = (props) => {
    const classes = useStyle(props)
    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Typography variant={"subtitle1"} align={"center"}>
                    KNCS and It's{' '}
                    <Link to={MEET_THE_DEVS}>
                        Developers
                    </Link>
                    {' '}&copy; {new Intl.DateTimeFormat('en', {year: 'numeric'}).format(new Date())}
                </Typography>
                <Typography variant={"subtitle1"} align={"center"}>
                    All rights received
                </Typography>
            </Container>
        </div>
    )
}

export default Footer