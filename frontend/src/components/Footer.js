import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import {MEET_THE_DEVS} from "../routes/route";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '25vh',
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant={"subtitle1"} align={"center"}>
                        KNCS and It's{' '}
                        <Link to={MEET_THE_DEVS}>
                            Developers
                        </Link>
                        {' '}&copy; {new Date().getFullYear()}
                    </Typography>
                    <Typography variant={"subtitle1"} align={"center"}>
                        All rights received
                    </Typography>
                </Container>
            </footer>
        </div>
    );
}

export default Footer