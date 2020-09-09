import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useSignIn} from "react-auth-kit";
import {useHistory} from "react-router-dom"
import {useForm} from "react-hook-form";
import LoginApi from "./api";
import Footer from "../../lib/Footer";
import NetworkButton from "../../lib/NetworkButton";
import {useAxiosNetworkError, useError} from "../../context/NetworkError";
import {API_ROUTE_LOGIN, networkButtonTypes, networkStates, RECAPTCHA_SITE_KEY} from "../../constant";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    subheader: {
        marginBottom: theme.spacing(8)
    },
}));

const AllLogin = () => {
    const signIn = useSignIn();
    const history = useHistory()
    const classes = useStyles();
    const setError = useError()
    const axiosNetworkError = useAxiosNetworkError()
    const {register, errors, handleSubmit} = useForm({
        reValidateMode: "onBlur",
        mode: "onBlur"
    })

    const [networkState, setNetworkState] = React.useState(networkStates.IDLE);
    const onSubmitEvent = (data) => {
        console.log(data)
        setNetworkState(networkStates.BUSY)
        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'login'}).then(async (token) => {
                try {
                    const res = await LoginApi.post(API_ROUTE_LOGIN, {...data, recaptcha_token: token})
                    if (res.status === 200){
                        signIn({
                            token:res.data.auth.access_token,
                            authState:res.data.user,
                            expiresIn: 120,
                            tokenType: 'Bearer'})
                            ?
                            history.push(`/${res.data.user.role}/dashboard`) :
                            setError("Unexpected Error Occurred. Try Again!")
                    }
                    else {
                        setError(res.status + "Unexpected Error Occurred. Try Again!")
                        setNetworkState(networkStates.IDLE)
                    }
                } catch (error) {
                    axiosNetworkError(error)
                    setNetworkState(networkStates.IDLE)
                }
            }).catch(() => {
                setError("ReCaptcha Validation failed. Try Again!")
                setNetworkState(networkStates.IDLE)
            })
        })
    }

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={8} className={classes.image}/>
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                <Container>
                    <div className={classes.paper}>
                        <Typography variant={"h4"} className={classes.subheader}>
                            KNCS Portal
                        </Typography>
                        <div className={classes.bar}/>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmitEvent)}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                inputRef={
                                    register({
                                        required: "Input must be an E-mail Address",
                                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                                    })
                                }
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                inputRef={register({
                                    required: "Password must have length 8",
                                    minLength: 8,
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                autoComplete="current-password"
                            />
                            <NetworkButton
                                type={"submit"}
                                disabled={!!errors.email || !!errors.password}
                                networkState={networkState}
                                buttonStyle={networkButtonTypes.SUBMIT}
                                handleSubmit={handleSubmit}
                            />
                        </form>
                        <Typography variant={"subtitle2"} align={"center"} color={"error"}>
                            {networkState[0] === networkStates.ERROR ? networkState[1] : ""}
                        </Typography>
                    </div>
                </Container>
                <Box mt={5}>
                    <Footer/>
                </Box>
            </Grid>
        </Grid>
    );
}

export default AllLogin