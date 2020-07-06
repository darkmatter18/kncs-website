import React from "react";
import {useParams} from "react-router-dom";
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
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3)
    },
    spacer: {
        marginTop: theme.spacing(2)
    }
}))

const Progress1PersonalInfo = () => {
    const classes = useStyles()
    let {user_id} = useParams();

    const initialState = {
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: new Date(),
        gender: '',
        religion: '',
        cast: '',
        father_name: '',
        father_occupation: '',
        mother_name: '',
        mother_occupation: '',
        guardian_name: '',
        guardian_occupation: '',
        guardian_same_father: false,
        aadhar_no: '',
        email: '',
        mobile: '',
    }
    const [formData, setFormData] = React.useState(initialState)
    const [errors, setErrors] = React.useState({
        first_name: [false, ""],
        middle_name: [false, ""],
        last_name: [false, ""],
        dob: [false, ""],
        gender: [false, "Enter your Gender"],
        religion: [false, "Enter your Religion"],
        cast: [false, "Enter your Cast"],
        father_name: [false, "Enter your Father's Name"],
        father_occupation: [false, "Enter your Father's Occupation"],
        mother_name: [false, "Enter your Mother's Name"],
        mother_occupation: [false, "Enter your Mother's Occupation"],
        guardian_name: [false, "Enter your Guardian's Name"],
        guardian_occupation: [false, "Enter your Guardian's Occupation"],
        aadhar_no: [false, "Enter your 12 digit Aadhar No"],
        email: [false, "Enter your E-Mail Id"],
        mobile: [false, "Enter 10 Digit Mobile Number"],
    })
    const [networkState, setNetworkState] = React.useState(netState.IDLE)

    const handleFormDataChange = (name) => (e) => {
        e.persist()
        setFormData(prevState => ({...prevState, [name]: e.target.value}))
    }

    const handleChangeGuardianSameFather = (e)=> {
        console.log(e.target.value)
        setFormData(prevState => ({...prevState, guardian_same_father: e.target.checked}))
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
                                    <Grid item md={3}>
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
                                    <Grid item md={3}>
                                        <FormControl variant="outlined" fullWidth error={errors.gender[0]}>
                                            <InputLabel id="form-gender-label">Gender</InputLabel>
                                            <Select
                                                labelId="form-gender-label"
                                                id="form-gender"
                                                value={formData.gender}
                                                onChange={handleFormDataChange('gender')}
                                                label="Gender"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'Male'}>Male</MenuItem>
                                                <MenuItem value={'Female'}>Female</MenuItem>
                                                <MenuItem value={'Third Gender'}>Third Gender</MenuItem>
                                                <MenuItem value={'Not Applicable'}>Not Applicable</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.gender[1]}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={3}>
                                        <FormControl variant="outlined" fullWidth error={errors.religion[0]}>
                                            <InputLabel id="form-religion-label">Religion</InputLabel>
                                            <Select
                                                labelId="form-religion-label"
                                                id="form-religion"
                                                value={formData.religion}
                                                onChange={handleFormDataChange('religion')}
                                                label="Religion"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'Hindu'}>Hindu</MenuItem>
                                                <MenuItem value={'Muslim'}>Muslim</MenuItem>
                                                <MenuItem value={'Cristian'}>Cristian</MenuItem>
                                                <MenuItem value={'Sikh'}>Sikh</MenuItem>
                                                <MenuItem value={'Jain'}>Jain</MenuItem>
                                                <MenuItem value={'Parshi'}>Parshi</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.religion[1]}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={3}>
                                        <FormControl variant="outlined" fullWidth error={errors.cast[0]}>
                                            <InputLabel id="form-caste-label">Cast</InputLabel>
                                            <Select
                                                labelId="form-caste-label"
                                                id="form-cast"
                                                value={formData.cast}
                                                onChange={handleFormDataChange('cast')}
                                                label="Cast"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'General'}>General</MenuItem>
                                                <MenuItem value={'SC'}>SC</MenuItem>
                                                <MenuItem value={'ST'}>ST</MenuItem>
                                                <MenuItem value={'OBC-A'}>OBC-A</MenuItem>
                                                <MenuItem value={'OBC-B'}>OBC-B</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.cast[1]}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Typography variant={"h6"} color={"textPrimary"} className={classes.spacer}>
                            Guardian's Information
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container spacing={5} justify={"flex-start"}>
                                    <Grid item md={6}>
                                        <TextField required fullWidth error={errors.father_name[0]}
                                                   helperText={errors.father_name[1]}
                                                   label={"Father's Name"} id={"father-name"}
                                                   variant={"outlined"} value={formData.father_name}
                                                   onChange={handleFormDataChange('father_name')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.father_occupation[0]}
                                                   helperText={errors.father_occupation[1]}
                                                   label={"Father's Occupation"} id={"father-occupation"}
                                                   variant={"outlined"} value={formData.father_occupation}
                                                   onChange={handleFormDataChange('father_occupation')}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} justify={"flex-start"} className={classes.spacer}>
                                    <Grid item md={6}>
                                        <TextField required fullWidth error={errors.mother_name[0]}
                                                   helperText={errors.mother_name[1]}
                                                   label={"Mother's Name"} id={"mother-name"}
                                                   variant={"outlined"} value={formData.mother_name}
                                                   onChange={handleFormDataChange('mother_name')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.mother_occupation[0]}
                                                   helperText={errors.mother_occupation[1]}
                                                   label={"Mother's Occupation"} id={"mother-occupation"}
                                                   variant={"outlined"} value={formData.mother_occupation}
                                                   onChange={handleFormDataChange('mother_occupation')}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} justify={"flex-start"} className={classes.spacer}>
                                    <Grid item md={5}>
                                        <TextField required fullWidth error={errors.guardian_name[0]}
                                                   helperText={errors.guardian_name[1]}
                                                   label={"Guardian's Name"} id={"guardian-name"}
                                                   variant={"outlined"} value={formData.guardian_name}
                                                   onChange={handleFormDataChange('guardian_name')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.guardian_occupation[0]}
                                                   helperText={errors.guardian_occupation[1]}
                                                   label={"Guardian's Occupation"} id={"guardian-occupation"}
                                                   variant={"outlined"} value={formData.guardian_occupation}
                                                   onChange={handleFormDataChange('guardian_occupation')}/>
                                    </Grid>
                                    <Grid item md={3}>
                                        <FormControlLabel
                                            value={"Guardian Same as Father"}
                                            control={<Switch
                                                checked={formData.guardian_same_father}
                                                onChange={handleChangeGuardianSameFather}
                                                color="secondary"
                                                name="guardian_same_father"
                                            />}
                                            label={"Guardian Same as Father"}
                                            labelPlacement={"bottom"}/>
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