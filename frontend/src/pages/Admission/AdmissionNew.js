import React from "react";
import Header from "../../components/Headers/BasicHeader";
import AdmissionNewExistingSwitch from "../../components/AdmissionNewExistingSwitch";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import Button from "@material-ui/core/Button";
import SubHeader from "../../components/SubHeader";
import {makeStyles} from "@material-ui/core/styles";
import {validateAadhar, ValidateEmail, validateMobileNo, ValidateName} from "../../utils/validate";
import {buttonType, netState, PRE_REGISTRATION, RECAPTCHA_SITE_KEY} from "../../constant";
import NetworkSubmit from "../../components/NetworkSubmit";
import {useHistory} from 'react-router-dom';
import api from '../../api'
import {ADMISSION_NEW_DONE} from "../../components/RouterComponent/routes";
import Footer from "../../components/Footer";
import {Link} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    subLine: {
        marginBottom: theme.spacing(1)
    },
    spacer: {
        marginTop: theme.spacing(2)
    }
}))

const AdmissionNew = () => {
    const classes = useStyle()
    const history = useHistory()

    const initialState = {
        first_name: '',
        middle_name: '',
        last_name: '',
        aadhar_no: '',
        email: '',
        mobile: '',
        dob: new Date("2006-04-01")
    }
    const [formData, setFormData] = React.useState(initialState)
    const [errors, setErrors] = React.useState({
        first_name: [false, "Enter your First Name"],
        middle_name: [false, "Enter your Middle Name"],
        last_name: [false, "Enter your Last Name"],
        aadhar_no: [false, "Enter your 12 digit Aadhar No"],
        email: [false, "Enter your E-Mail Id"],
        mobile: [false, "Enter 10 Digit Mobile Number"],
    })
    const [networkState, setNetworkState] = React.useState([netState.IDLE, ''])

    const handleFormDataChange = (name) => (e) => {
        e.persist()
        setFormData(prevState => ({...prevState, [name]: e.target.value}))
    }

    const handleReset = (e) => {
        e.preventDefault()
        setFormData(initialState)
    }
    const handleDateChange = (date) => {
        setFormData(prevState => ({...prevState, dob: date}))
    };

    const validateName = (name_type) => {
        if (ValidateName(formData[name_type])) {
            const _n = name_type === 'first_name' ? 'First' : 'Last'
            setErrors(prevState => ({...prevState, [name_type]: [false, `Enter your ${_n} Name`]}))
            return true
        } else {
            setErrors(prevState => ({...prevState, [name_type]: [true, "Invalid Input"]}))
            return false
        }
    }

    const validateMiddleName = () => {
        if (formData.middle_name.length === 0) {
            setErrors(prevState => ({...prevState, middle_name: [false, "Enter your Middle Name"]}))
            return true
        } else {
            return validateName('middle_name')
        }
    }

    const validateAadharNum = () => {
        if (formData.aadhar_no.length === 0){
            setErrors(prevState => ({...prevState, aadhar_no: [false, "Enter your 12 digit Aadhar No"]}))
            return true
        } else {
            if (validateAadhar(formData.aadhar_no)) {
                setErrors(prevState => ({...prevState, aadhar_no: [false, "Enter your 12 digit Aadhar No"]}))
                return true
            } else {
                setErrors(prevState => ({...prevState, aadhar_no: [true, "Invalid Aadhar Number"]}))
                return false
            }
        }
    }

    const checkEmailId = () => {
        if (ValidateEmail(formData.email)) {
            setErrors(prevState => ({...prevState, email: [false, "Enter your E-Mail Id"]}))
            return true
        } else {
            setErrors(prevState => ({...prevState, email: [true, "Invalid Email-ID"]}))
            return false
        }
    }

    const checkMobileNum = () => {
        if (validateMobileNo(formData.mobile)) {
            setErrors(prevState => ({...prevState, mobile: [false, "Enter 10 Digit Mobile Number"]}))
            return true
        } else {
            setErrors(prevState => ({...prevState, mobile: [true, "Invalid Mobile Number"]}))
            return false
        }
    }

    const validate = () => {
        const _fname = validateName('first_name')
        const _mname = validateMiddleName()
        const _lname = validateName('last_name')
        const _aadhar = validateAadharNum()
        const _email = checkEmailId()
        const _mobile = checkMobileNum()

        return _fname && _mname && _lname && _aadhar && _email && _mobile
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        if (validate()) {
            setNetworkState([netState.BUSY, ''])
            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(formData.dob)
            const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(formData.dob)
            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(formData.dob)
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'}).then((token) => {
                    api.post(PRE_REGISTRATION, {
                        ...formData,
                        dob: `${ye}-${mo}-${da}`,
                        recaptcha_token: token
                    }).then((res) => {
                        if (res.data.status) {
                            history.push(ADMISSION_NEW_DONE, {
                                application_no: res.data.application_no,
                                email: formData.email,
                                dob: formData.dob
                            })
                        } else {
                            setNetworkState([netState.ERROR, res.data.error])
                        }
                    }).catch((e) => {
                        console.error(e)
                        setNetworkState([netState.ERROR, `Internal error occurred 
                        (${e.response.status} - ${e.response.data.error})`])
                    })
                }).catch((e)=>{
                    console.error(e)
                    setNetworkState([netState.ERROR, "Recaptcha failed - Please try again"])
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
            <AdmissionNewExistingSwitch routeId={0}/>
            <Container>
                <Paper elevation={0} square>
                    <CardContent>
                        <Typography variant={"h6"} color={"textPrimary"}>
                            Applicant information
                        </Typography>
                        <Typography variant={"subtitle2"} className={classes.subLine}>
                            Fill this form for your initial registration.
                            This will generate your Application No and will guide you for the entire application step.
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container spacing={5} justify={"center"}>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <TextField required fullWidth error={errors.first_name[0]}
                                                   helperText={errors.first_name[1]}
                                                   label={"First Name"} id={"first_name"}
                                                   variant={"outlined"} value={formData.first_name}
                                                   onChange={handleFormDataChange("first_name")}/>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <TextField fullWidth error={errors.middle_name[0]}
                                                   helperText={errors.middle_name[1]}
                                                   label={"Middle Name"} id={"middle_name"}
                                                   variant={"outlined"} value={formData.middle_name}
                                                   onChange={handleFormDataChange("middle_name")}/>
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <TextField required fullWidth error={errors.last_name[0]}
                                                   helperText={errors.last_name[1]}
                                                   label={"Last Name"} id={"last_name"}
                                                   variant={"outlined"} value={formData.last_name}
                                                   onChange={handleFormDataChange("last_name")}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} className={classes.spacer}>
                                    <Grid item md={3} sm={12} xs={12}>
                                        <TextField fullWidth error={errors.aadhar_no[0]}
                                                   helperText={errors.aadhar_no[1]}
                                                   label={"Aadhar No"} id={"aadhar_no"}
                                                   variant={"outlined"} value={formData.aadhar_no}
                                                   onChange={handleFormDataChange("aadhar_no")}/>
                                    </Grid>
                                    <Grid item md={3} sm={12} xs={12}>
                                        <TextField fullWidth required error={errors.email[0]}
                                                   helperText={errors.email[1]}
                                                   type={"email"} label={"E-Mail Id"} id={"email"}
                                                   variant={"outlined"} value={formData.email}
                                                   onChange={handleFormDataChange("email")}/>
                                    </Grid>
                                    <Grid item md={3} sm={12} xs={12}>
                                        <TextField fullWidth required error={errors.mobile[0]}
                                                   helperText={errors.mobile[1]}
                                                   label={"Mobile No"} id={"mobile"}
                                                   variant={"outlined"} value={formData.mobile}
                                                   onChange={handleFormDataChange("mobile")}/>
                                    </Grid>
                                </Grid>
                                <div className={classes.spacer}>
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
                                </div>

                                <Grid container style={{marginTop: 16}} spacing={3} alignItems={"center"}>
                                    <Grid item>
                                        <NetworkSubmit buttonStyle={buttonType.SAVE_NEXT} handleSubmit={handleSubmit} networkState={networkState[0]}/>
                                    </Grid>
                                    <Grid item>
                                        <Button variant={"outlined"} color={"secondary"} onClick={handleReset}>
                                            reset
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={"subtitle2"} align={"center"} color={"error"}>
                                            {networkState[0] === netState.ERROR ? networkState[1] : ""}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Paper>
            </Container>
            <Footer/>
        </React.Fragment>
    )
}


export default AdmissionNew