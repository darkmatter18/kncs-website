import React from "react";
import Header from "../components/Header";
import AdmissionNewExistingSwitch from "../components/AdmissionNewExistingSwitch";
import SubHeader from "../components/SubHeader";
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
import {ValidateEmail} from "../utils/validate";

const useStyle = makeStyles((theme) => ({
    subLine: {
        marginBottom: theme.spacing(1)
    },
    spacer: {
        marginTop: theme.spacing(2)
    }
}))

const AdmissionExisting = () => {
    const classes = useStyle()
    const initialState = {application_no: '', email: '', dob: new Date()}
    const [formData, setFormData] = React.useState(initialState)
    const [errors, setErrors] = React.useState({application_no: [false, ""], email: [false, ""]})

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
        console.log(formData)
        if (validate()) {
            //submit the form
            console.log("Submitting")
        }
    }

    return (
        <React.Fragment>
            <Header/>
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
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.application_no[0]}
                                                   helperText={errors.application_no[1]}
                                                   label={"Application No."} id={"application_no"}
                                                   variant={"outlined"} value={formData.application_no}
                                                   onChange={handleFormDataChange('application_no')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.email[0]}
                                                   helperText={errors.email[1]}
                                                   label={"Email Id"} id={"email"}
                                                   variant={"outlined"} value={formData.email}
                                                   onChange={handleFormDataChange('email')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                autoOk
                                                variant="inline"
                                                inputVariant="outlined"
                                                format="dd/MM/yyyy"
                                                id="dob"
                                                label="Date of Birth"
                                                value={formData.dob}
                                                maxDate={new Date()}
                                                InputAdornmentProps={{position: "start"}}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                                <Grid container style={{marginTop: 16}} spacing={3}>
                                    <Grid item>
                                        <Button variant={"outlined"} color={"primary"} onClick={handleSubmit}>
                                            submit
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant={"outlined"} color={"secondary"} onClick={handleReset}>
                                            reset
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default AdmissionExisting