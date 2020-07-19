import React from "react";
import {useHistory, Redirect} from 'react-router-dom';
import { ADMISSION_NEW} from "../routes/route";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {buttonType, netState, PRE_REGISTRATION_LOGIN, RECAPTCHA_SITE_KEY} from "../constant";
import api from "../api";
import {useSignIn} from "react-auth-jwt";
import NetworkSubmit from "../components/NetworkSubmit";

const AdmissionNewDone = () => {
    const history = useHistory()
    const signIn = useSignIn()

    const [networkState, setNetworkState] = React.useState([netState.IDLE, ''])

    const handleSubmit = (e) => {
        e.preventDefault()
        setNetworkState([netState.BUSY, ''])
        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'}).then((token) => {
                api.post(PRE_REGISTRATION_LOGIN, {
                    application_no: history.location.state.application_no,
                    email: history.location.state.email,
                    dob: history.location.state.dob,
                    recaptcha_token: token
                }).then((res) => {
                    if (res.data.status) {
                        const r = signIn(res.data.jwt, 120, {application_no: res.data.application_no})
                        if (r) {
                            console.log("Signing In")
                            history.push(`/admission/progress/personal_info`)
                        } else {
                            setNetworkState([netState.ERROR, 'Internal error occured'])
                        }
                    } else {
                        setNetworkState([netState.ERROR, res.data.error])
                    }
                }).catch((e) => {
                    console.log(e)
                    setNetworkState([netState.ERROR, 'Internal error occured'])
                })
            })
        })
    }


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
                                    </Typography>
                                    <Typography align={"center"}>
                                        <NetworkSubmit buttonStyle={buttonType.SAVE_NEXT}
                                                       handleSubmit={handleSubmit} networkState={networkState[0]}/>
                                    </Typography>
                                    <Typography variant={"body2"} >
                                        {networkState[0] === netState.ERROR ? "Some unexpected network error occurred" : ""}
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