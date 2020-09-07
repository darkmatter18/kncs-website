import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Footer from "../../lib/Footer";
import NetworkButton from "../../lib/NetworkButton";
import {API_ROUTE_LOGIN, networkButtonTypes, networkStates, RECAPTCHA_SITE_KEY} from "../../constant";
import Container from "@material-ui/core/Container";
import {ValidateEmail} from "../../lib/validation";
import {useSignIn} from "react-auth-jwt";
import {useHistory} from "react-router-dom"
import LoginApi from "./api";
import {useForm} from "react-hook-form";

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
    const {register, errors, handleSubmit} = useForm({
        reValidateMode: "onBlur",
        mode: "onBlur"
    })

    const [formState, setFormState] = React.useState({email: '', password: ''})
    const [errrs, setErrors] = React.useState({
        email: [false, "Enter registered Email-Id"],
        password: [false, "Password should be minimum 8"],
    })
    const [networkState, setNetworkState] = React.useState([networkStates.IDLE, '']);

    const handleFormDataChange = (name) => (e) => {
        e.persist()
        setFormState(prevState => ({...prevState, [name]: e.target.value}))
    }

    const checkEmailId = () => {
        if (ValidateEmail(formState.email)) {
            setErrors(prevState => ({...prevState, email: [false, "Enter registered Email-Id"]}))
            return true
        } else {
            setErrors(prevState => ({...prevState, email: [true, "Invalid Email-ID"]}))
            return false
        }
    }

    const checkPassword = () => {
        if (formState.password.length > 7) {
            setErrors(prevState => ({...prevState, password: [false, "Password should be minimum 8"]}))
            return true
        } else {
            setErrors(prevState => ({...prevState, password: [true, "Invalid Password"]}))
            return false
        }
    }

    const validate = () => {
        const e = checkEmailId()
        const p = checkPassword()

        return e && p
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
                        <form className={classes.form} noValidate onSubmit={handleSubmit((data) => {
                            console.log(data)
                            setNetworkState([networkStates.BUSY, ''])
                            window.grecaptcha.ready(() => {
                                window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'login'}).then((token) => {
                                    LoginApi.post(API_ROUTE_LOGIN, {
                                        ...formState,
                                        recaptcha_token: token
                                    }).then((res) => {
                                        if (res.data.status) {
                                            signIn(res.data.jwt, res.data.expiresAt || 120, res.data.user) ?
                                                history.push(`/${res.data.role}/dashboard`) :
                                                setNetworkState([networkStates.ERROR, res.data.error])
                                        } else {
                                            setNetworkState([networkStates.ERROR, `Internal error occurred (Sign-In failed)`])
                                        }
                                    }).catch((e) => {
                                        console.error(e)
                                        setNetworkState([networkStates.ERROR, `Internal error occurred 
                                                                (${e.response.status} - ${e.response.data.error})`])
                                    })
                                }).catch((e) => {
                                    console.error(e)
                                    setNetworkState([networkStates.ERROR, "Recaptcha failed - Please try again"])
                                })
                            })
                        })}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                innerRef={
                                    register({
                                        required: true,
                                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                                    })
                                }
                                error={errors.email}
                                helperText={errors.email?.message}
                                value={formState.email}
                                onChange={handleFormDataChange('email')}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                inputRef={register({
                                    required: true,
                                    minLength: 8
                                })}
                                error={errors.password}
                                helperText={errors.password?.message}
                                value={formState.password}
                                onChange={handleFormDataChange('password')}
                                autoComplete="current-password"
                            />
                            <NetworkButton
                                networkState={networkState[0]}
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