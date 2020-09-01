import React from "react";
import Header from "../Headers/BasicHeader";
import AdmissionNewExistingSwitch from "./AdmissionNewExistingSwitch";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SubHeader from "../SubHeader";
import {makeStyles} from "@material-ui/core/styles";
import Footer from "../../lib/Footer";
import {Link} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    subLine: {
        marginBottom: theme.spacing(1)
    },
    spacer: {
        marginTop: theme.spacing(2)
    }
}))

const AdmissionStop = () => {
    const classes = useStyle()

    const linkData = [
        {name: "Home", link: "#"},
        {name: "About", link: "#"},
        {name: "Notice", link: "#"},
        {name: "Alumni", link: "#"},
        {name: "Login", link: "#"},
        {name: "Contact", link: "#"},
    ]

    const links = () => {
        return (
            linkData.map((v, i)=>{
                return (
                    <Link variant="button" color="textPrimary" href={v.link} key={i}>
                        {v.name}
                    </Link>
                )
            })
        )
    }

    return (
        <React.Fragment>
            <Header links={links()}/>
            <SubHeader/>
            <AdmissionNewExistingSwitch routeId={0}/>
            <Container>
                <Paper elevation={0} square>
                    <CardContent>
                        <Typography variant={"h6"} color={"textPrimary"}>
                            Admission stopped
                        </Typography>
                        <Typography variant={"subtitle2"} className={classes.subLine}>
                            Admission for <b>Class XI</b> is stopped
                        </Typography>
                        <Typography variant={"subtitle2"}>
                            You can still see your existing Application forms
                        </Typography>
                    </CardContent>
                </Paper>
            </Container>
            <Footer/>
        </React.Fragment>
    )
}


export default AdmissionStop