import React from "react";
import AdmissionProgressBack from "../../components/AdmissionProgressBack";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {netState} from "../../constant";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5)
    },
    spacer: {
        marginTop: theme.spacing(2)
    }
}))

const Progress2AcademicInfo = () => {
    const classes = useStyles()

    const initialState = {
        previous_school_name: '',
        year_of_madhyamik: new Date(),
        previous_student_id: '',
    }
    const initialErrorState = {
        previous_school_name: [false, "Enter name of your Previous School"],
        year_of_madhyamik: [false, "Enter year of Passing Madhyamik"],
        previous_student_id: [false, "Enter Previous Student Id, if any"]
    }
    const [formData, setFormData] = React.useState(initialState)
    // Todo: work with errors
    const [errors, setErrors] = React.useState(initialErrorState)
    const [guardianDisabled, setGuardianDisabled] = React.useState(false)
    // Todo: work in submiiting
    const [networkState, setNetworkState] = React.useState(netState.IDLE)

    const handleFormDataChange = (name) => (e) => {
        e.persist()
        setFormData(prevState => ({...prevState, [name]: e.target.value}))
    }
    const handleDateChange = (date) => {
        setFormData(prevState => ({...prevState, year_of_madhyamik: date}))
    };

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Paper elevation={0} square>
                    <CardContent>
                        <Typography variant={"h6"} color={"textPrimary"}>
                            Previous Academic Info
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container spacing={5} justify={"center"}>
                                    <Grid item md={6}>
                                        <TextField fullWidth required error={errors.previous_school_name[0]}
                                                   helperText={errors.previous_school_name[1]}
                                                   label={"Previous School Name"} id={"previous_school_name"}
                                                   variant={"outlined"} value={formData.previous_school_name}
                                                   onChange={handleFormDataChange("previous_school_name")}/>
                                    </Grid>
                                    <Grid item md={3}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                autoOk
                                                variant="inline"
                                                inputVariant="outlined"
                                                id="year_of_madhyamik"
                                                label="Year of Passing Madhyamik"
                                                views={["year"]}
                                                value={formData.year_of_madhyamik}
                                                helperText={errors.year_of_madhyamik[1]}
                                                InputAdornmentProps={{position: "start"}}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                onChange={handleDateChange}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item md={3}>
                                        <TextField fullWidth required error={errors.previous_student_id[0]}
                                                   helperText={errors.previous_student_id[1]}
                                                   label={"Previous Student Id"} id={"previous_student_id"}
                                                   variant={"outlined"} value={formData.previous_student_id}
                                                   onChange={handleFormDataChange("previous_student_id")}/>
                                    </Grid>
                                </Grid>
                                <Typography variant={"subtitle1"} color={"textPrimary"} className={classes.spacer}>
                                    Madhyamik Result Details
                                </Typography>
                                <Card variant={"outlined"}>
                                    <CardContent>
                                        <Grid container justify={"flex-start"}>
                                            <Grid item md={3}>

                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Paper>
            </Container>
            <AdmissionProgressBack/>
        </React.Fragment>
    )
}

export default Progress2AcademicInfo