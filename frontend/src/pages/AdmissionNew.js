import React from "react";
import Header from "../components/Header";
import AdmissionNewExistingSwitch from "../components/AdmissionNewExistingSwitch";
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
import SubHeader from "../components/SubHeader";
import {makeStyles} from "@material-ui/core/styles";

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
    const initialState = {
        first_name: '',
        middle_name: '',
        last_name: '',
        aadhar_no: '',
        email: '',
        mobile: '',
        dob: new Date()
    }
    const [formData, setFormData] = React.useState(initialState)

    const handleFormDataChange = (name) => (e) => {
        e.preventDefault()
        setFormData({...formData, [name]: e.target.value})
    }

    const handleReset = (e) => {
        e.preventDefault()
        setFormData(initialState)
    }
    const handleDateChange = (date) => {
        setFormData({...formData, dob: date})
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <React.Fragment>
            <Header/>
            <SubHeader/>
            <AdmissionNewExistingSwitch routeId={0}/>
            <Container>
                <Paper elevation={0} square>
                    <CardContent>
                        <Typography variant={"h6"} color={"textPrimary"}>
                            Applicant information
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container spacing={5} justify={"center"}>
                                    <Grid item md={4}>
                                        <TextField required fullWidth label={"First Name"} id={"first_name"}
                                                   variant={"outlined"} value={formData.first_name}
                                                   onChange={handleFormDataChange("first_name")}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField fullWidth label={"Middle Name"} id={"middle_name"}
                                                   variant={"outlined"} value={formData.middle_name}
                                                   onChange={handleFormDataChange("middle_name")}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth label={"Last Name"} id={"last_name"}
                                                   variant={"outlined"} value={formData.last_name}
                                                   onChange={handleFormDataChange("last_name")}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} className={classes.spacer}>
                                    <Grid item md={3}>
                                        <TextField fullWidth required label={"Aadhar No"} id={"aadhar_no"}
                                                   variant={"outlined"} value={formData.aadhar_no}
                                                   onChange={handleFormDataChange("aadhar_no")}/>
                                    </Grid>
                                    <Grid item md={3}>
                                        <TextField fullWidth required type={"email"} label={"E-Mail Id"} id={"email"}
                                                   variant={"outlined"} value={formData.email}
                                                   onChange={handleFormDataChange("email")}/>
                                    </Grid>
                                    <Grid item md={3}>
                                        <TextField fullWidth required label={"Mobile No"} id={"mobile"}
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
                                            maxDate={new Date()}
                                            InputAdornmentProps={{position: "start"}}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>

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

export default AdmissionNew