import React from "react";
import {useHistory, Redirect} from 'react-router-dom';
import { ADMISSION_NEW} from "../../components/RouterComponent/routes";
import Header from "../../components/Headers/BasicHeader";
import SubHeader from "../../components/SubHeader";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {buttonType, netState, PRE_REGISTRATION_LOGIN, RECAPTCHA_SITE_KEY} from "../../constant";
import api from "../../api";
import {useSignIn} from "react-auth-jwt";
import NetworkSubmit from "../../components/NetworkSubmit";
import Footer from "../../components/Footer";
import {Link} from "@material-ui/core";

const AdmissionNewDone = () => {
    const history = useHistory()
    const signIn = useSignIn()

    const [networkState, setNetworkState] = React.useState([netState.IDLE, ''])

    const handleSubmit = (e) => {
        e.preventDefault()
        setNetworkState([netState.BUSY, ''])
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date(history.location.state.dob))
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(new Date(history.location.state.dob))
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(new Date(history.location.state.dob))
        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'}).then((token) => {
                api.post(PRE_REGISTRATION_LOGIN, {
                    application_no: history.location.state.application_no,
                    email: history.location.state.email,
                    dob: `${ye}-${mo}-${da}`,
                    recaptcha_token: token
                }).then((res) => {
                    if (res.data.status) {
                        const r = signIn(res.data.jwt, 120, {application_no: res.data.application_no,
                            status: res.data.RecStatus})
                        if (r) {
                            console.log("Signing In")
                            if(res.data.RecStatus === 'DRAFT'){
                                history.push(`/admission/progress/personal_info`)
                            } else {
                                history.push(`/admission/progress/declaration`)
                            }
                        } else {
                            setNetworkState([netState.ERROR, 'Internal error occurred'])
                        }
                    } else {
                        setNetworkState([netState.ERROR, res.data.error])
                    }
                }).catch((e) => {
                    console.log(e)
                    setNetworkState([netState.ERROR, `Internal error occurred 
                    (${e.response.status} - ${e.response.data.error})`])
                })
            }).catch((e)=>{
                console.error(e)
                setNetworkState([netState.ERROR, "Recaptcha failed - Please try again"])
            })
        })
    }

    const linkdata = [
        {name: "Home", link: "#"},
        {name: "About", link: "#"},
        {name: "Notice", link: "#"},
        {name: "Amumni", link: "#"},
        {name: "Login", link: "#"},
        {name: "Contact", link: "#"},
    ]

    const links = () => {
        return (
            linkdata.map((v, i)=>{
                return (
                    <Link variant="button" color="textPrimary" href={v.link} key={i}>
                        {v.name}
                    </Link>
                )
            })
        )
    }


    if (history.location.state === undefined || history.location.state === null) {
        return (
            <Redirect to={ADMISSION_NEW}/>
        )
    } else {
        const applicationNo = history.location.state.application_no
        return (
            <React.Fragment>
                <Header links={links()}/>
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
                                    <Typography align={"center"} style={{marginTop: 16}}>
                                        <NetworkSubmit buttonStyle={buttonType.SAVE_NEXT}
                                                       handleSubmit={handleSubmit} networkState={networkState[0]}/>
                                    </Typography>
                                    <Typography variant={"body2"} >
                                        {networkState[0] === netState.ERROR ? networkState[1] : ""}
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

export default AdmissionNewDone