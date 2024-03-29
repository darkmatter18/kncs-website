import React from "react";
import {useHistory, Redirect} from 'react-router-dom';
import {ADMISSION_NEW} from "../RouterComponent/routes";
import {Header, SubHeader} from "../../lib/HeaderComponents";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {useSignOut} from "react-auth-jwt";
import Button from "@material-ui/core/Button";
import {Home} from "@material-ui/icons";
import Footer from "../../lib/Footer";

const AdmissionAllDone = () => {
    const history = useHistory()
    const signOut = useSignOut()
    if (history.location.state === undefined || history.location.state === null) {
        return (
            <Redirect to={ADMISSION_NEW}/>
        )
    } else {
        signOut()
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
                                        Thank You for your Registration.
                                    </Typography>
                                    <Typography align={"center"} style={{marginTop: 16}}>
                                        <Button variant={"outlined"} startIcon={<Home/>}
                                                href={ADMISSION_NEW}>
                                            Back to home
                                        </Button>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Paper>
                </Container>
                <Footer Ftype={'absolute'}/>
            </React.Fragment>
        )
    }
}

export default AdmissionAllDone