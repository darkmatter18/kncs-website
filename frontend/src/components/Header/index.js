import React from "react";
import {AppBar, Container, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as banner from '../../assets/banner_new.jpg'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyle = makeStyles((theme)=> ({
    header: {
        marginBottom: theme.spacing(6)
    },
    bannerImage: {
        maxWidth: '4rem',
        maxHeight: '4rem',
        marginRight: theme.spacing(4)
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    hearerText: {
        fontFamily: 'Raleway, sans-serif',
        flexGrow: 1,
    }

}))

const Header = () => {
    const classes = useStyle()
    return (
        <header className={classes.header}>

            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Container>
                        <Grid container alignItems={"center"}>
                            <Grid item>
                                <img src={banner} alt={"College Banner"} className={classes.bannerImage}/>
                            </Grid>
                            <Grid item>
                                <Typography display={"inline"} variant="h5" color="inherit" noWrap  className={classes.hearerText}>
                                    Krishnath College School
                                </Typography>
                            </Grid>
                        </Grid>

                        <nav>

                        </nav>
                    </Container>
                </Toolbar>
            </AppBar>


            {/*<Container>*/}

            {/*    <Typography className={classes.hearerText}>*/}
            {/*        Krishnath College School*/}
            {/*    </Typography>*/}
            {/*</Container>*/}
        </header>
    )
}

export default Header