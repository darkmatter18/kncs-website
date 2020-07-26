import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Dashboard} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/styles";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
    divider: {
        marginBottom: theme.spacing(2)
    },
    btn: {
        height: theme.spacing(12),
        width: theme.spacing(12),
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.black,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}))

const DashboardAdmin = () => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <Container>
                <Grid container spacing={4}>
                    <Grid item md={7} sm={12} xs={12}>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container alignItems={"center"} className={classes.divider}>
                                    <Grid item>
                                        <Dashboard/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5" component="h2">
                                            Dashboard
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography variant="h6" component="h6">
                                    Admission
                                </Typography>
                                <Divider/>
                                <Grid container>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <ButtonBase
                                            focusRipple

                                            className={classes.btn}
                                            focusVisibleClassName={classes.focusVisible}
                                        >
                                            <span className={classes.imageButton}>
                                                <Typography
                                                    component="span"
                                                    variant="subtitle1"
                                                    color="inherit"
                                                >
                                                    Hello World
                                                    <span className={classes.imageMarked}/>
                                                </Typography>
                                            </span>
                                        </ButtonBase>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <Card variant={"outlined"}>
                            <CardContent>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default DashboardAdmin