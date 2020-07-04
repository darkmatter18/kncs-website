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

const useStyle = makeStyles((theme)=> ({
    subLine: {
        marginBottom: theme.spacing(1)
    },
    spacer: {
        marginTop: theme.spacing(2)
    }
}))

const AdmissionNew = () => {
    const classes = useStyle()
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <React.Fragment>
            <Header/>
            <SubHeader/>
            <AdmissionNewExistingSwitch routeId={0}/>
            <Container>
                <Paper elevation={0} square>
                    <CardContent>
                        <Typography variant={"h6"}  color={"textPrimary"}>
                            Applicant information
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container spacing={5} justify={"center"}>
                                    <Grid item md={4}>
                                        <TextField required fullWidth label={"First Name"} id={"first_name"}
                                                   variant={"outlined"}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth label={"Middle Name"} id={"middle_name"}
                                                   variant={"outlined"}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth label={"Last Name"} id={"last_name"}
                                                   variant={"outlined"}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} className={classes.spacer}>
                                    <Grid item md={3}>
                                        <TextField fullWidth required label={"Aadhar No"} id={"aadhar"}
                                                   variant={"outlined"}/>
                                    </Grid>
                                    <Grid item md={3}>
                                        <TextField fullWidth required type={"email"} label={"E-Mail Id"} id={"email"}
                                                   variant={"outlined"}/>
                                    </Grid>
                                    <Grid item md={3}>
                                        <TextField fullWidth required label={"Mobile No"} id={"mobile"}
                                                   variant={"outlined"}/>
                                    </Grid>
                                </Grid>
                                <div className={classes.spacer}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker

                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            id="dob"
                                            label="Date of Birth"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>

                                <Grid container style={{marginTop: 16}} spacing={3}>
                                    <Grid item>
                                        <Button variant={"outlined"} color={"primary"}>
                                            submit
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant={"outlined"} color={"secondary"}>
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