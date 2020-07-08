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
        caste: '',
        aadhaar_no: '',
        mother_tongue: '',
        apply_for_reserved_seat: false,
        caste_certificate_no: '',
        weather_bpl: false,
        bpl_card_no: '',
        father_name: '',
        father_occupation: '',
        mother_name: '',
        mother_occupation: '',
        guardian_name: '',
        guardian_occupation: '',
        guardian_same_father: false,
        address_line_1: '',
        address_line_2: '',
        city: '',
        district: '',
        pin: '',
        email: '',
        mobile: '',
    }
    const initialErrorState = {
        first_name: [false, ""],
        middle_name: [false, ""],
        last_name: [false, ""],
        dob: [false, ""],
        gender: [false, "Enter your Gender"],
        religion: [false, "Enter your Religion"],
        caste: [false, "Enter your Cast"],
        aadhaar_no: [false, "Enter your 12 digit Aadhar No"],
        mother_tongue: [false, "Enter your Mother Tongue"],
        apply_for_reserved_seat: [false, "Apply for a Reserved Seat"],
        caste_certificate_no: [false, "Enter the Caste Certificate No"],
        weather_bpl: [false, "Apply for a Reserved Seat"],
        bpl_card_no: [false, "Enter the BPL card No"],
        father_name: [false, "Enter your Father's Name"],
        father_occupation: [false, "Enter your Father's Occupation"],
        mother_name: [false, "Enter your Mother's Name"],
        mother_occupation: [false, "Enter your Mother's Occupation"],
        guardian_name: [false, "Enter your Guardian's Name"],
        guardian_occupation: [false, "Enter your Guardian's Occupation"],
        address_line_1: [false, "Enter Your Address/Area"],
        address_line_2: [false, "Enter Your Locality"],
        city: [false, "Enter your City/Village"],
        district: [false, "Enter your District"],
        pin: [false, "Enter your Pin"],
        email: [false, "Enter your E-Mail Id"],
        mobile: [false, "Enter 10 Digit Mobile Number"],
    }

    const [formData, setFormData] = React.useState(initialState)
    const [errors, setErrors] = React.useState(initialErrorState)
    const [guardianDisabled, setGuardianDisabled] = React.useState(false)
    const [networkState, setNetworkState] = React.useState(netState.IDLE)

    const handleFormDataChange = (name) => (e) => {
        e.persist()
        setFormData(prevState => ({...prevState, [name]: e.target.value}))
    }

    const handleChangeGuardianSameFather = (e) => {
        setFormData(prevState => ({...prevState, guardian_same_father: e.target.checked}))
        if (e.target.checked) {
            setFormData(prevState => ({...prevState, guardian_name: prevState.father_name}))
            setFormData(prevState => ({...prevState, guardian_occupation: prevState.guardian_occupation}))
            setGuardianDisabled(true)
        } else {
            setGuardianDisabled(false)
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
                                        <FormControl variant="outlined" fullWidth error={errors.caste[0]}>
                                            <InputLabel id="form-caste-label">Caste</InputLabel>
                                            <Select
                                                labelId="form-caste-label"
                                                id="form-caste"
                                                value={formData.caste}
                                                onChange={handleFormDataChange('caste')}
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
                                            <FormHelperText>{errors.caste[1]}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} className={classes.spacer}>

                                    <Grid item md={4}>
                                        <TextField fullWidth required error={errors.aadhaar_no[0]}
                                                   helperText={errors.aadhaar_no[1]}
                                                   label={"Aadhaar No"} id={"aadhaar_no"}
                                                   variant={"outlined"} value={formData.aadhaar_no}
                                                   onChange={handleFormDataChange("aadhaar_no")}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <FormControl variant="outlined" fullWidth error={errors.mother_tongue[0]}>
                                            <InputLabel id="form-mother-tongue-label">Mother Tongue</InputLabel>
                                            <Select
                                                labelId="form-mother-tongue-label"
                                                id="form-mother-tongue"
                                                value={formData.mother_tongue}
                                                onChange={handleFormDataChange('mother_tongue')}
                                                label="Mother Tongue"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'Bengali'}>Bengali</MenuItem>
                                                <MenuItem value={'English'}>English</MenuItem>
                                                <MenuItem value={'Hindi'}>Hindi</MenuItem>
                                                <MenuItem value={'Nepali'}>Nepali</MenuItem>
                                                <MenuItem value={'Santal'}>Santal</MenuItem>
                                                <MenuItem value={'Others'}>Others</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.mother_tongue[1]}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>


                                <Grid container justify={"space-around"} className={classes.spacer}>

                                    <Grid container item md={6} justify={"center"}>
                                        {/*//TODO: Complete On change apply_for_reserved_seat function*/}
                                        <Grid item md={5}>
                                            <FormControlLabel
                                                value={"Apply for Reserved Seat"}
                                                control={<Switch
                                                    checked={formData.apply_for_reserved_seat}
                                                    onChange={handleChangeGuardianSameFather}
                                                    color="secondary"
                                                    name="apply_for_reserved_seat"
                                                />}
                                                label={"Apply for Reserved Seat"}
                                                labelPlacement={"bottom"}/>
                                        </Grid>
                                        <Grid item md={7}>
                                            <TextField fullWidth required error={errors.caste_certificate_no[0]}
                                                       helperText={errors.caste_certificate_no[1]}
                                                       label={"Caste Certificate No"} id={"caste_certificate_no"}
                                                       variant={"outlined"} value={formData.caste_certificate_no}
                                                       onChange={handleFormDataChange("caste_certificate_no")}/>
                                        </Grid>
                                    </Grid>

                                    <Grid container item md={6} justify={"center"}>
                                        <Grid item md={5}>
                                            {/*//TODO: Complete On change weather_bpl function*/}
                                            <FormControlLabel
                                                value={"Weather BPL"}
                                                control={<Switch
                                                    checked={formData.weather_bpl}
                                                    onChange={handleChangeGuardianSameFather}
                                                    color="secondary"
                                                    name="weather_bpl"
                                                />}
                                                label={"Weather BPL"}
                                                labelPlacement={"bottom"}/>
                                        </Grid>
                                        <Grid item md={7}>
                                            <TextField fullWidth required error={errors.bpl_card_no[0]}
                                                       helperText={errors.bpl_card_no[1]}
                                                       label={"BPL Card No"} id={"bpl_card_no"}
                                                       variant={"outlined"} value={formData.bpl_card_no}
                                                       onChange={handleFormDataChange("bpl_card_no")}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>


                        <Typography variant={"h6"} color={"textPrimary"} className={classes.spacer}>
                            Family Information
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
                                        <TextField required fullWidth disabled={guardianDisabled}
                                                   error={errors.guardian_name[0]}
                                                   helperText={errors.guardian_name[1]}
                                                   label={"Guardian's Name"} id={"guardian-name"}
                                                   variant={"outlined"} value={formData.guardian_name}
                                                   onChange={handleFormDataChange('guardian_name')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth disabled={guardianDisabled}
                                                   error={errors.guardian_occupation[0]}
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
                        <Typography variant={"h6"} color={"textPrimary"} className={classes.spacer}>
                            Contact Information
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container spacing={5} justify={"center"}>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.address_line_1[0]}
                                                   helperText={errors.address_line_1[1]}
                                                   label={"Address Line 1"} id={"address_line_1"}
                                                   variant={"outlined"} value={formData.address_line_1}
                                                   onChange={handleFormDataChange('address_line_1')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.address_line_2[0]}
                                                   helperText={errors.address_line_2[1]}
                                                   label={"Address Line 2"} id={"address_line_2"}
                                                   variant={"outlined"} value={formData.address_line_2}
                                                   onChange={handleFormDataChange('address_line_2')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.city[0]}
                                                   helperText={errors.city[1]}
                                                   label={"City / Village"} id={"city"}
                                                   variant={"outlined"} value={formData.city}
                                                   onChange={handleFormDataChange('city')}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} justify={"center"}>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.district[0]}
                                                   helperText={errors.district[1]}
                                                   label={"District"} id={"district"}
                                                   variant={"outlined"} value={formData.district}
                                                   onChange={handleFormDataChange('district')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.pin[0]}
                                                   helperText={errors.pin[1]}
                                                   label={"PIN"} id={"pin"}
                                                   variant={"outlined"} value={formData.pin}
                                                   onChange={handleFormDataChange('pin')}/>
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