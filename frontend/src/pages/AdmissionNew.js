import React from "react";
import Header from "../components/Header";
import AdmissionNewExistingSwitch from "../components/AdmissionNewExistingSwitch";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const AdmissionNew = () => {
    return (
        <React.Fragment>
            <Header/>
            <AdmissionNewExistingSwitch routeId={0}/>
            <Container>
                <Paper elevation={0}>
                    <CardContent>
                        <Typography variant={"body2"}>
                            Fill the form bellow to Apply for Admission
                        </Typography>
                    </CardContent>
                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default AdmissionNew