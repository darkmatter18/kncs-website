import React from "react";
import {useHistory, Redirect, Link as LinkRouter} from 'react-router-dom';
import {ADMISSION_EXISTING, ADMISSION_NEW} from "../routes/route";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const AdmissionNewDone = () => {
    const history = useHistory()
    if (history.location.state === undefined || history.location.state === null) {
        return (
            <Redirect to={ADMISSION_NEW}/>
        )
    } else {
        const applicationNo = history.location.state.application_no
        return (
            <React.Fragment>
                <Header/>
                <SubHeader/>
                <Container>
                    <Paper elevation={0} square>
                        <CardContent>
                            <Card variant={"outlined"}>
                                <CardContent>
                                    <Typography variant={"body1"} align={"center"}>
                                        Thank You for your Registration. Your Application No is {applicationNo}.
                                        Complete the remaining registration. <br/>
                                        Remember "Your account will be invalid after 30 days."<br/>
                                        <LinkRouter to={ADMISSION_EXISTING}>
                                            Proceed to Application
                                        </LinkRouter>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Paper>
                </Container>
            </React.Fragment>
        )
    }
}

export default AdmissionNewDone