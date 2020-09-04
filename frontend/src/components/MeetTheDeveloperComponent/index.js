import React from "react";
import {Header} from "../../lib/HeaderComponents";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DeveloperCard from "./DeveloperCard";
import * as ArkadipImg from '../../assets/arkadip.jpeg';
import * as ManojitImg from '../../assets/manojit.jpeg';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Footer from "../../lib/Footer";

const useStyle = makeStyles((theme) =>({
    bar: {
        borderBottom: `2px solid #000000`,
        maxWidth: theme.spacing(8),
        marginBottom: theme.spacing(6)
    },
    subheader: {
        marginBottom: theme.spacing(3)
    }
}))

const MeetTheDeveloperComponent = () => {
    const classes = useStyle()
    return (
        <React.Fragment>
            <Header/>
            <Container>
                <Typography variant={"h4"} className={classes.subheader}>
                    Meet the Developers
                </Typography>
                <div className={classes.bar}/>
                <Grid container spacing={2}>
                    <Grid item>
                        <DeveloperCard imageUrl={ArkadipImg} personName={'Arkadip Bhattacharya'}
                                       portfolioUrl={'https://www.arkadip.co'} emailId={'in2arkadipb13@gmail.com'}/>
                    </Grid>
                    <Grid item>
                        <DeveloperCard imageUrl={ManojitImg} personName={'Manojit Karmakar'}
                                       portfolioUrl={'#'} emailId={'jony.karmakar.2013@gmail.com'}/>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </React.Fragment>
    )
}

export default MeetTheDeveloperComponent