import React from "react";
import {useHistory, Redirect} from 'react-router-dom';
import { ADMISSION_NEW} from "../RouterComponent/routes";
import {Header, SubHeader} from "../../lib/HeaderComponents";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {networkButtonTypes, networkStates, RECAPTCHA_SITE_KEY} from "../../constant";
import {useSignIn} from "react-auth-kit";
import NetworkButton from "../../lib/NetworkButton";
import Footer from "../../lib/Footer";
import {Link} from "@material-ui/core";
import AdmissionApi from "./api";
import {useAxiosNetworkError, useError} from "../../context/NetworkError";

const AdmissionNewDone = () => {
    const history = useHistory()
    const signIn = useSignIn()
    const setError = useError()
    const setAxiosError = useAxiosNetworkError()

    const [networkState, setNetworkState] = React.useState(networkStates.IDLE)

    const handleSubmit = (e) => {
        e.preventDefault()
        setNetworkState(networkStates.BUSY)
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date(history.location.state.dob))
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(new Date(history.location.state.dob))
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(new Date(history.location.state.dob))
        window.grecaptcha.ready(()=>{
            window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'}).then((token)=> {
                AdmissionApi.post('/login', {
                    application_no: history.location.state.application_no,
                    email: history.location.state.email,
                    dob: `${ye}-${mo}-${da}`,
                    recaptcha_token: token
                }).then((res)=>{
                    if(res.status === 200){
                        const r = signIn({
                            token:res.data.auth.access_token,
                            authState: res.data.user,
                            expiresIn: 120,
                            tokenType: res.data.auth.token_type})
                        if(r){
                            if(res.data.user.status === 'DRAFT'){
                                history.push(`/admission/progress/personal_info`)
                            } else {
                                history.push(`/admission/progress/declaration`)
                            }
                        }else {
                            setNetworkState(networkStates.ERROR)
                            setError("Some unexpected error occurred")
                        }
                    }
                    else {
                        setNetworkState(networkStates.ERROR)
                        setError("Some unexpected error occurred")
                    }
                }).catch((e)=>{
                    setNetworkState(networkStates.ERROR)
                    setAxiosError(e)
                })
            }).catch(()=>{
                setNetworkState(networkStates.ERROR)
                setError("ReCaptcha Verification failed")
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
                                        <NetworkButton buttonStyle={networkButtonTypes.SAVE_NEXT}
                                                handleSubmit={handleSubmit} networkState={networkState}/>
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