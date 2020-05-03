import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Link, makeStyles, Button } from '@material-ui/core';
import HomeLoginModal from '../HomeLoginModal';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    }
}))


const HomeTopBar = () => {

    const [modalOpen, setmodalOpen] = useState(false)

    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Company name
                    </Typography>
                    <nav>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Features
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Enterprise
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Support
                        </Link>
                    </nav>
                    <Button color="primary" variant="outlined" className={classes.link} onClick={() => { setmodalOpen(true) }}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            <HomeLoginModal open={modalOpen} close={() => { setmodalOpen(false) }} />
        </React.Fragment>
    )
};

export default HomeTopBar;