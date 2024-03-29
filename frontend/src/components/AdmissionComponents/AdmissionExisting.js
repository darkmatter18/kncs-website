import React from "react";
import {Header, SubHeader} from "../../lib/HeaderComponents";
import AdmissionNewExistingSwitch from "./AdmissionNewExistingSwitch";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {ValidateEmail} from "../../lib/validation";
import NetworkButton from "../../lib/NetworkButton";
import {networkStates, networkButtonTypes, PRE_REGISTRATION_LOGIN, RECAPTCHA_SITE_KEY} from "../../constant";
import {Api} from "../../api";
import {useSignIn} from "react-auth-jwt";
import {useHistory} from "react-router-dom";
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

const AdmissionExisting = () => {
    const signIn = useSignIn()
    const classes = useStyle()
    const history = useHistory()
    const initialState = {application_no: '', email: '', dob: new Date("2006-04-01")}
    const [formData, setFormData] = React.useState(initialState)
    const [errors, setErrors] = React.useState({
        application_no: [false, "Enter Your 10 digit Application No"],
        email: [false, "Enter your E-Mail Id"]
    })
    const [networkState, setNetworkState] = React.useState([networkStates.IDLE, ''])

    const handleFormDataChange = (name) => (e) => {
        e.preventDefault()
        setFormData({...formData, [name]: e.target.value})
    }

    const handleDateChange = (date) => {
        setFormData({...formData, dob: date})
    };
    const handleReset = (e) => {
        e.preventDefault()
        setFormData(initialState)
    }

    const checkApplicationId = () => {
        if (formData.application_no.length === 10) {
            setErrors(prevState => ({...prevState, application_no: [false, ""]}))
            return true
        } else {
            setErrors(prevState => ({
                ...prevState, application_no: [true, "Invalid Application No " +
                "(Must be a 10 digits long)"]
            }))
            return false
        }
    }

    const checkEmailId = () => {
        if (ValidateEmail(formData.email)) {
            setErrors(prevState => ({...prevState, email: [false, ""]}))
            return true
        } else {
            setErrors(prevState => ({...prevState, email: [true, "Invalid Email-ID"]}))
            return false
        }
    }

    const validate = () => {
        const x = checkApplicationId()
        const y = checkEmailId()
        return x && y
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            setNetworkState([networkState.BUSY, ''] )
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(formData.dob)
            const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(formData.dob)
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(formData.dob)
            window.grecaptcha.ready(()=>{
                window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'}).then((token)=> {
                    Api.post(PRE_REGISTRATION_LOGIN, {
                        ...formData,
                        dob: `${ye}-${mo}-${da}`,
                        recaptcha_token: token
                    }).then((res)=>{
                        if(res.data.status){
                            const r = signIn(res.data.jwt, 120, {application_no: res.data.application_no,
                                status: res.data.RecStatus})
                            if(r){
                                console.log("Signing In")
                                if(res.data.RecStatus === 'DRAFT'){
                                    history.push(`/admission/progress/personal_info`)
                                } else {
                                    history.push(`/admission/progress/declaration`)
                                }
                            }else {
                                setNetworkState([networkStates.ERROR, 'Internal error occurred (Authentication Failed. ' +
                                'Please Retry from "http://kncs.com/portal/admission/existing" )'])
                            }
                        }
                        else {
                            setNetworkState([networkStates.ERROR, res.data.error])
                        }
                    }).catch((e)=>{
                        console.log(e)
                        setNetworkState([networkStates.ERROR, `Internal Error occurred 
                        (${e.response.status} - ${e.response.data.error})`])
                    })
                }).catch((e)=>{
                    console.error(e)
                    setNetworkState([networkStates.ERROR, "Recaptcha failed - Please try again"])
                })
            })
        }
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

    return (
        <React.Fragment>
            <Header links={links()}/>
            <SubHeader/>
            <AdmissionNewExistingSwitch routeId={1}/>
            <Container>
                <Paper elevation={0} square>
                    <CardContent>
                        <Typography variant={"subtitle2"} className={classes.subLine}>
                            You can complete your pending application form or regenerate the acknowledgement receipt by
                            login into the Register user module.
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container spacing={5} alignItems={"flex-start"}>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <TextField required fullWidth error={errors.application_no[0]}
                                                   helperText={errors.application_no[1]}
                                                   label={"Application No."} id={"application_no"}
                                                   variant={"outlined"} value={formData.application_no}
                                                   onChange={handleFormDataChange('application_no')}/>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <TextField required fullWidth error={errors.email[0]}
                                                   helperText={errors.email[1]}
                                                   label={"Email Id"} id={"email"}
                                                   variant={"outlined"} value={formData.email}
                                                   onChange={handleFormDataChange('email')}/>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                autoOk
                                                variant="inline"
                                                inputVariant="outlined"
                                                format="dd/MM/yyyy"
                                                id="dob"
                                                label="Date of Birth"
                                                value={formData.dob}
                                                maxDate={new Date("2006-04-01")}
                                                InputAdornmentProps={{position: "start"}}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                                <Grid container style={{marginTop: 16}} spacing={3} alignItems={"center"}>
                                    <Grid item>
                                        <NetworkButton buttonStyle={networkButtonTypes.SEARCH} handleSubmit={handleSubmit} networkState={networkState[0]}/>
                                    </Grid>
                                    <Grid item>
                                        <Button variant={"outlined"} color={"secondary"} onClick={handleReset}>
                                            reset
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={"subtitle2"} color={"error"}>
                                            {networkState[0] === networkStates.ERROR ? networkState[1] :""}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Paper>
            </Container>
            <Footer Ftype={'absolute'}/>
        </React.Fragment>
    )
}

export default AdmissionExisting