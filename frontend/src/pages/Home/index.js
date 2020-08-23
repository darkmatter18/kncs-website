import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Footer from "../../components/Footer";
import {LOGIN} from "../../routes/route";
import {useHistory} from 'react-router-dom'

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
    const history = useHistory()
    const re = true
    if(re) {
        history.push(LOGIN)
        return <React.Fragment/>
    }
    else {
        return (
            <React.Fragment>
                <Grid container alignItems={"center"} justify={"center"} alignContent={"center"} className={classes.root}>
                    <Grid item md={12}>
                        <Typography variant={"h4"} align={"center"} color={"textPrimary"}>
                            Student Management Portal
                        </Typography>
                        <br/>
                        <Typography variant={"h6"} align={"center"} color={"textSecondary"}>
                            Go To notice and then click admission notice link
                        </Typography>
                    </Grid>
                </Grid>
                <Footer Ftype={'absolute'}/>
            </React.Fragment>
        )
    }
}

export default Home;