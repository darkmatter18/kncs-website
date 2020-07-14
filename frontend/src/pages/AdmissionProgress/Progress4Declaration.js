import React from "react";
import {useParams} from "react-router-dom";
import AdmissionProgressBack from "../../components/AdmissionProgressBack";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import ReactToPrint from 'react-to-print';

import * as banner from '../../assets/banner.png'
import TextField from "@material-ui/core/TextField";
import NetworkSubmit from "../../components/NetworkSubmit";
import {netState} from "../../constant";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {ArrowDownward} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5)
    },
    spacer: {
        marginTop: theme.spacing(2)
    },
    bannerImage: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '25rem',
        maxHeight: '6.25rem'
    }
}))

const Progress4Declaration = () => {
    let {user_id} = useParams();
    const classes = useStyles()
    const printRef = React.useRef()

    const formValue = {
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: '01/01/1990',
        gender: '',
        religion: '',
        caste: '',
        aadhar_no: '',
        mother_tongue: '',
        apply_for_reserved_seat: '',
        caste_certificate_no: '',
        weather_bpl: '',
        bpl_card_no: '',
        father_name: '',
        father_occupation: '',
        mother_name: '',
        mother_occupation: '',
        guardian_name: '',
        guardian_occupation: '',
        guardian_same_father: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        district: '',
        pin: '',
        email: '',
        mobile: '',
        whatsapp_no: '',
        previous_school_name: '',
        year_of_madhyamik: '',
        previous_student_id: '',
        marks_beng: '',
        marks_engb: '',
        marks_maths: '',
        marks_psc: '',
        marks_lsc: '',
        marks_hist: '',
        marks_geo: '',
        stream: '',
        first_language: 'BENA',
        second_language: 'ENGB',
        first_major: '',
        second_major: '',
        third_major: '',
        forth_major: '',

    }
    const [formState, setFormState] = React.useState(formValue)
    const [networkState, setNetworkState] = React.useState(netState.IDLE)

    //TODO: complete handle submit
    const handleSubmit = () => {

    }

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Paper elevation={0} square>
                    <CardContent>
                        <Typography variant={"h6"} color={"textPrimary"}>
                            Check the Form
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <div ref={printRef}>
                                    <Grid container justify={"center"} alignItems={"center"}>
                                        <Grid item md={12}>
                                            <Typography align={"center"}>
                                                <img src={banner} alt={"College Banner"}
                                                     className={classes.bannerImage}/>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider/>
                                    <Container className={classes.spacer}>
                                        <Typography variant={"h6"} color={"textPrimary"}>
                                            Personal Information
                                        </Typography>
                                        <Card variant={"outlined"}>
                                            <CardContent>
                                                <Grid container justify={"center"}>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            First Name: <b>{formState.first_name}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Middle Name: <b>{formState.middle_name}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Last Name: <b>{formState.last_name}</b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container justify={"center"} className={classes.spacer}>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Date of Birth: <b>{formState.dob}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Gender: <b>{formState.gender}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Religion: <b>{formState.religion}</b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container className={classes.spacer}>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Caste: <b>{formState.caste}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Aadhar No: <b>{formState.aadhar_no}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Mother Tongue: <b>{formState.mother_tongue}</b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container className={classes.spacer}>
                                                    <Grid item md={3}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Apply for Reserved
                                                            Seat: <b>{formState.apply_for_reserved_seat}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Caste Certificate
                                                            No: <b>{formState.caste_certificate_no}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Weather BPL: <b>{formState.weather_bpl}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={3}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            BPL card No: <b>{formState.bpl_card_no}</b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>

                                        <Typography variant={"h6"} color={"textPrimary"} className={classes.spacer}>
                                            Family Information
                                        </Typography>
                                        <Card variant={"outlined"}>
                                            <CardContent>
                                                <Container>
                                                    <Grid container className={classes.spacer}>
                                                        <Grid item md={3}>
                                                            <Typography variant={"body1"} color={"textPrimary"}
                                                                        align={"center"}>
                                                                Father's Name: <b>{formState.father_name}</b>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Typography variant={"body1"} color={"textPrimary"}
                                                                        align={"center"}>
                                                                Father's
                                                                Occupation: <b>{formState.father_occupation}</b>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Typography variant={"body1"} color={"textPrimary"}
                                                                        align={"center"}>
                                                                Mother's Name: <b>{formState.mother_name}</b>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Typography variant={"body1"} color={"textPrimary"}
                                                                        align={"center"}>
                                                                Mother's
                                                                Occupation: <b>{formState.mother_occupation}</b>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container className={classes.spacer}>
                                                        <Grid item md={4}>
                                                            <Typography variant={"body1"} color={"textPrimary"}
                                                                        align={"center"}>
                                                                Guardian's Name: <b>{formState.guardian_name}</b>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item md={4}>
                                                            <Typography variant={"body1"} color={"textPrimary"}
                                                                        align={"center"}>
                                                                Guardian's
                                                                Occupation: <b>{formState.guardian_occupation}</b>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item md={4}>
                                                            <Typography variant={"body1"} color={"textPrimary"}
                                                                        align={"center"}>
                                                                Guardian Same as
                                                                Father: <b>{formState.guardian_same_father}</b>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                        <Typography variant={"h6"} color={"textPrimary"} className={classes.spacer}>
                                            Contact Information
                                        </Typography>
                                        <Card variant={"outlined"}>
                                            <CardContent>
                                                <Grid container>
                                                    <Grid item md={6}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Address Line 1: <b>{formState.address_line_1}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Address Line 2: <b>{formState.address_line_2}</b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container className={classes.spacer}>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Village/City: <b>{formState.city}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            District: <b>{formState.district}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Pin: <b>{formState.pin}</b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container className={classes.spacer}>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Email Id: <b>{formState.email}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Mobile: <b>{formState.mobile}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            WhatsApp No: <b>{formState.whatsapp_no}</b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>

                                        <Typography variant={"h6"} color={"textPrimary"} className={classes.spacer}>
                                            Previous Academic Information
                                        </Typography>
                                        <Card variant={"outlined"}>
                                            <CardContent>
                                                <Grid container>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Previous School
                                                            Name: <b>{formState.previous_school_name}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Year of Passing
                                                            Madhyamik: <b>{formState.year_of_madhyamik}</b>
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant={"body1"} color={"textPrimary"}
                                                                    align={"center"}>
                                                            Previous Student Id: <b>{formState.previous_student_id}</b>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                                <Typography variant={"body1"} color={"textPrimary"}
                                                            className={classes.spacer}>
                                                    <b>Madhyamik Marks</b>
                                                </Typography>
                                                <Card variant={"outlined"}>
                                                    <CardContent>
                                                        <Grid container>
                                                            <Grid item md={4}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    Bengali: <b>{formState.marks_beng}</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={4}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    English: <b>{formState.marks_engb}</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={4}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    Mathematics: <b>{formState.marks_maths}</b>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container className={classes.spacer}>
                                                            <Grid item md={3}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    Physical Science: <b>{formState.marks_psc}</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={3}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    Life Science: <b>{formState.marks_lsc}</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={3}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    History: <b>{formState.marks_hist}</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={3}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    Geography: <b>{formState.marks_geo}</b>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </CardContent>
                                        </Card>

                                        <Typography variant={"h6"} color={"textPrimary"} className={classes.spacer}>
                                            Academic Info
                                        </Typography>
                                        <Card variant={"outlined"}>
                                            <CardContent>
                                                <Typography variant={"body1"}>
                                                    Selected Stream: <b>{formState.stream}</b>
                                                </Typography>
                                                <Typography variant={"body2"} color={"textPrimary"}
                                                            className={classes.spacer}>
                                                    <b>Subject Combination</b>
                                                </Typography>
                                                <Card variant={"outlined"}>
                                                    <CardContent>
                                                        <Grid container>
                                                            <Grid item md={2}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    First
                                                                    Language: <br/><b>{formState.first_language}</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={2}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    Second
                                                                    Language: <br/><b>{formState.second_language}</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={2}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    First Major: <br/><b>{formState.first_major}</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={2}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    Second Major: <br/><b>{formState.second_major}</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={2}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    Third Major: <br/><b>{formState.third_major}</b>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={2}>
                                                                <Typography variant={"body1"} color={"textPrimary"}
                                                                            align={"center"}>
                                                                    Forth Major: <br/><b>{formState.forth_major}</b>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            </CardContent>
                                        </Card>
                                    </Container>
                                </div>
                                <Typography align={"center"} className={classes.spacer}>
                                    <ReactToPrint content={()=> printRef.current} trigger={()=>{
                                        return (
                                            <Button variant={"outlined"} color={"secondary"}
                                                    startIcon={<ArrowDownward/>}>
                                                Save Application Form
                                            </Button>
                                        )
                                    }}/>
                                </Typography>
                            </CardContent>
                        </Card>


                        <Card variant={"outlined"} className={classes.spacer}>
                            <CardContent>
                                <Container>
                                    <Typography variant={"h6"} align={"center"}>
                                        Declaration
                                    </Typography>
                                    <Typography variant={"body1"} align={"center"}>
                                        I certify a) that the particular stated above regarding the candidate named are
                                        true to the best of my knowledge , information and belief and I shall not change
                                        it
                                        under any circumstance.b)that I have read the prospectus and undertake to abide
                                        by
                                        every rule and decesion of the school and the Head Master willingly.
                                    </Typography>
                                    <Grid container alignItems={"center"} className={classes.spacer}>
                                        <Grid item style={{float: "left"}} md={6}>
                                            <TextField variant={"outlined"} label={"Date"}/><br/><br/>
                                            <TextField variant={"outlined"} label={"Place"}/>
                                        </Grid>
                                        <Grid item style={{float: "right"}} md={6}>
                                            <Typography variant={"body2"} align={"center"}>
                                                Enter your full legal name
                                            </Typography>
                                            <TextField fullWidth variant={"outlined"} label={"Full Name of Applicant"}/>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </CardContent>
                        </Card>
                        <Grid container className={classes.spacer} justify={"flex-start"}>
                            <Grid item md={1}>
                                <AdmissionProgressBack/>
                            </Grid>
                            <Grid item md={6}>
                                <NetworkSubmit networkState={networkState} handleSubmit={handleSubmit}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default Progress4Declaration