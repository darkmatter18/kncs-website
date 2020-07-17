import React from "react";
import AdmissionProgressBack from "../../components/AdmissionProgressBack";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useParams} from "react-router-dom";
import {useAuthHeader} from "react-auth-jwt";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
    netState,
    PRE_REGISTRATION_PAYMENT_INFO,
    RECAPTCHA_SITE_KEY
} from "../../constant";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import NetworkSubmit from "../../components/NetworkSubmit";
import api from "../../api";


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5)
    },
    spacer: {
        marginTop: theme.spacing(2)
    }
}))

const Progress3PaymentInfo = () => {
    const classes = useStyles()
    let {user_id} = useParams()
    const history = useHistory()
    const authHeader = useAuthHeader()

    const initialState = {
        mode_of_payment: '',
        name_of_bank: '',
        transaction_id: '',
        transaction_date: new Date()
    }

    const initialErrorState = {
        mode_of_payment: [false, "Enter your mode of Payment"],
        name_of_bank: [false, "Enter name of your bank"],
        transaction_id: [false, "Enter your Transaction Id"],
        transaction_date: [false, "Enter your Transaction Date"]
    }

    const [formData, setFormData] = React.useState(initialState)
    const [errors, setErrors] = React.useState(initialErrorState)
    const [networkState, setNetworkState] = React.useState(netState.IDLE)

    React.useEffect(()=>{
        api.get(PRE_REGISTRATION_PAYMENT_INFO, {
            headers: {
                Authorization: authHeader()
            }
        })
            .then((res)=>{
                if(res.data.status){
                    setFormData(prevState => ({...prevState, ...res.data.data}))
                }else {
                    console.error(res.data.error)
                }
            }).catch((e)=>{
            console.error(e)
        })
    },[])
    const handleDateChange = (date) => {
        setFormData(prevState => ({...prevState, transaction_date: date}))
    };

    const handleFormDataChange = (name) => (e) => {
        e.persist()
        setFormData(prevState => ({...prevState, [name]: e.target.value}))
    }


    const validate = () => {
        //TODO: Validate
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()){
            window.grecaptcha.ready(()=>{
                window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'}).then((token)=>{
                    api.post(PRE_REGISTRATION_PAYMENT_INFO, {
                        ...formData,
                        recaptcha_token: token
                    },{
                        headers:{
                            Authorization: authHeader()
                        }
                    }).then((res) => {
                        if (res.data.status) {
                            history.push(`/admission/progress/${user_id}/declaration`)
                        } else {
                            setNetworkState(netState.ERROR)
                        }
                    }).catch((e) => {
                        console.error(e)
                        setNetworkState(netState.ERROR)
                    })
                })
            })
        }
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
                                        <FormControl variant="outlined" fullWidth error={errors.mode_of_payment[0]}>
                                            <InputLabel id="form-mode_of_payment-label">Mode of Payment</InputLabel>
                                            <Select
                                                labelId="form-mode_of_payment-label"
                                                id="form-mode_of_payment "
                                                value={formData.mode_of_payment}
                                                onChange={handleFormDataChange('mode_of_payment')}
                                                label="mode_of_payment"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'Cash Deposit'}>Cash Deposit</MenuItem>
                                                <MenuItem value={'NEFT/IMPS'}>NEFT/IMPS</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.mode_of_payment[1]}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} justify={"center"} className={classes.spacer}>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.name_of_bank[0]}
                                                   helperText={errors.name_of_bank[1]}
                                                   label={"Name of Bank"} id={"name_of_bank"}
                                                   variant={"outlined"} value={formData.name_of_bank}
                                                   onChange={handleFormDataChange('name_of_bank')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.transaction_id[0]}
                                                   helperText={errors.transaction_id[1]}
                                                   label={"Transaction Id"} id={"transaction_id"}
                                                   variant={"outlined"} value={formData.transaction_id}
                                                   onChange={handleFormDataChange('transaction_id')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                autoOk
                                                variant="inline"
                                                inputVariant="outlined"
                                                format="dd/MM/yyyy"
                                                id="dob"
                                                label="Transaction Date"
                                                value={formData.transaction_date}
                                                maxDate={new Date()}
                                                InputAdornmentProps={{position: "start"}}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Grid container className={classes.spacer} justify={"flex-start"}>
                            <Grid item>
                                <AdmissionProgressBack/>
                            </Grid>
                            <Grid item>
                                <NetworkSubmit networkState={networkState} handleSubmit={handleSubmit}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"subtitle2"} color={"error"}>
                                    {networkState === netState.ERROR ? "Some unexpected Network error occurred" : ""}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Paper>
            </Container>
            <AdmissionProgressBack/>
        </React.Fragment>
    )
}

export default Progress3PaymentInfo