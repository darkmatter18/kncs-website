import React from "react";
import { useParams } from "react-router-dom";
import AdmissionProgressBack from "../../components/AdmissionProgressBack";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {netState} from "../../constant";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme)=>({
    root: {
        marginTop: theme.spacing(3)
    },
    spacer: {
        marginTop: theme.spacing(2)
    }
}))

const Progress1PersonalInfo = () => {
    const classes = useStyles()
    let { user_id } = useParams();

    const initialState = {
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: new Date(),
        gender: 'male',
        aadhar_no: '',
        email: '',
        mobile: '',
    }
    const [formData, setFormData] = React.useState(initialState)
    const [errors, setErrors] = React.useState({
        first_name: [false, "Enter your First Name"],
        middle_name: [false, "Enter your Middle Name"],
        last_name: [false, "Enter your Last Name"],
        dob: [false, "Enter your Date of Birth"],
        gender: [false, "Enter your gender"],
        aadhar_no: [false, "Enter your 12 digit Aadhar No"],
        email: [false, "Enter your E-Mail Id"],
        mobile: [false, "Enter 10 Digit Mobile Number"],
    })
    const [networkState, setNetworkState] = React.useState(netState.IDLE)

    const handleFormDataChange = (name) => (e) => {
        e.persist()
        setFormData(prevState => ({...prevState, [name]: e.target.value}))
    }


    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Paper elevation={0} square>
                    <CardContent>
                        <Typography variant={"h6"} color={"textPrimary"}>
                            Personal Information
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container spacing={5} justify={"center"}>
                                    <Grid item md={4}>
                                        <TextField disabled required fullWidth error={errors.first_name[0]}
                                                   helperText={errors.first_name[1]}
                                                   label={"First Name"} id={"first_name"}
                                                   variant={"outlined"} value={formData.first_name}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField disabled fullWidth error={errors.middle_name[0]}
                                                   helperText={errors.middle_name[1]}
                                                   label={"Middle Name"} id={"middle_name"}
                                                   variant={"outlined"} value={formData.middle_name}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField disabled fullWidth error={errors.last_name[0]}
                                                   helperText={errors.last_name[1]}
                                                   label={"Last Name"} id={"last_name"}
                                                   variant={"outlined"} value={formData.last_name}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} className={classes.spacer}>
                                    <Grid item md={4}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                autoOk
                                                disabled
                                                variant="inline"
                                                inputVariant="outlined"
                                                format="dd/MM/yyyy"
                                                id="dob"
                                                label="Date of Birth"
                                                value={formData.dob}
                                                helperText={errors.dob[1]}
                                                InputAdornmentProps={{position: "start"}}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item md={4}>
                                        <FormControl variant="outlined" fullWidth error={errors.gender[0]}>
                                            <InputLabel id="form-gender-label">Gender</InputLabel>
                                            <Select
                                                labelId="form-gender-label"
                                                id="form-gender"
                                                value={formData.gender}
                                                onChange={handleFormDataChange('gender')}
                                                label="Gender"
                                            >
                                                <MenuItem value={'male'}>Male</MenuItem>
                                                <MenuItem value={'female'}>Female</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.gender[1]}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        <AdmissionProgressBack/>
                    </CardContent>
                </Paper>
            </Container>

        </React.Fragment>
    )
}

export default Progress1PersonalInfo