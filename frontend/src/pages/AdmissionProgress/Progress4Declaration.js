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

import * as banner from '../../assets/banner.png'
import TextField from "@material-ui/core/TextField";
import NetworkSubmit from "../../components/NetworkSubmit";
import {netState} from "../../constant";

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

    const formValue = {
        first_name: 'Abcd',

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
                                <div>
                                    <Grid container justify={"center"} alignItems={"center"}>
                                        <Grid item md={12}>
                                            <Typography align={"center"}>
                                                <img src={banner} alt={"College Banner"}
                                                     className={classes.bannerImage}/>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item md={3}>
                                            <Typography variant={"body1"} component={"p"} color={"textPrimary"}
                                                        display={"inline"}>
                                                {`First Name:    ${formState.first_name}`}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </div>
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