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
        marks_beng: '',
        marks_engb: '',
        marks_maths: '',
        marks_psc: '',
        marks_lsc: '',
        marks_geo: '',
        marks_hist: '',
        marks_total: 0,
        marks_percentage: 0,
    }
    const initialErrorState = {
        previous_school_name: [false, "Enter name of your Previous School"],
        year_of_madhyamik: [false, "Enter year of Passing Madhyamik"],
        previous_student_id: [false, "Enter Previous Student Id, if any"],
        marks_beng: [false, "Bengali"],
        marks_engb: [false, "English"],
        marks_maths: [false, "Maths"],
        marks_psc: [false, "Physical Science"],
        marks_lsc: [false, "Life Science"],
        marks_geo: [false, "Geography"],
        marks_hist: [false, "History"],
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
    const handleMarksChange = (name) => (e) => {
        e.persist()
        setFormData(prevState => ({...prevState, [name]: e.target.value}))

        setFormData(prevState => {
            const total = Number(prevState.marks_beng) + Number(prevState.marks_engb) + Number(prevState.marks_maths)
            + Number(prevState.marks_psc) + Number(prevState.marks_lsc) + Number(prevState.marks_geo)
            + Number(prevState.marks_hist)

            return {...prevState, marks_total: total}
        })
        setFormData(prevState => {
            const total = Number(prevState.marks_beng) + Number(prevState.marks_engb) + Number(prevState.marks_maths)
                + Number(prevState.marks_psc) + Number(prevState.marks_lsc) + Number(prevState.marks_geo)
                + Number(prevState.marks_hist)

            return {...prevState, marks_percentage: (total / 7)}
        })
    }

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
                                        <Grid container justify={"flex-start"} spacing={2}>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_beng[0]}
                                                           helperText={errors.marks_beng[1]}
                                                           label={"BENG"} id={"marks_beng"}
                                                           variant={"outlined"} value={formData.marks_beng}
                                                           onChange={handleMarksChange("marks_beng")}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_engb[0]}
                                                           helperText={errors.marks_engb[1]}
                                                           label={"ENGB"} id={"marks_engb"}
                                                           variant={"outlined"} value={formData.marks_engb}
                                                           onChange={handleMarksChange("marks_engb")}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_maths[0]}
                                                           helperText={errors.marks_maths[1]}
                                                           label={"Mathematics"} id={"marks_maths"}
                                                           variant={"outlined"} value={formData.marks_maths}
                                                           onChange={handleMarksChange("marks_maths")}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_psc[0]}
                                                           helperText={errors.marks_psc[1]}
                                                           label={"Physical Science"} id={"marks_psc"}
                                                           variant={"outlined"} value={formData.marks_psc}
                                                           onChange={handleMarksChange("marks_psc")}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_lsc[0]}
                                                           helperText={errors.marks_lsc[1]}
                                                           label={"Life Science"} id={"marks_lsc"}
                                                           variant={"outlined"} value={formData.marks_lsc}
                                                           onChange={handleMarksChange("marks_lsc")}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_geo[0]}
                                                           helperText={errors.marks_geo[1]}
                                                           label={"Geography"} id={"marks_geo"}
                                                           variant={"outlined"} value={formData.marks_geo}
                                                           onChange={handleMarksChange("marks_geo")}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_hist[0]}
                                                           helperText={errors.marks_hist[1]}
                                                           label={"History"} id={"marks_hist"}
                                                           variant={"outlined"} value={formData.marks_hist}
                                                           onChange={handleMarksChange("marks_hist")}/>
                                            </Grid>
                                        </Grid>
                                        <Grid container justify={"flex-start"} spacing={2} className={classes.spacer}>
                                            <Grid item md={3}>
                                                <TextField disabled fullWidth required label={"Total"} id={"total"}
                                                           variant={"filled"} value={formData.marks_total}/>
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField disabled fullWidth required label={"Percentage"}
                                                           id={"percentage"} variant={"filled"}
                                                           value={`${formData.marks_percentage} %`}/>
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