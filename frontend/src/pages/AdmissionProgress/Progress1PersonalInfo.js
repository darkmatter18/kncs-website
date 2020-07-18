import React from "react";
import AdmissionProgressBack from "../../components/AdmissionProgressBack";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {buttonType, netState, PRE_REGISTRATION_PRESONAL_INFO, RECAPTCHA_SITE_KEY} from "../../constant";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import NetworkSubmit from "../../components/NetworkSubmit";
import {validateMobileNo, ValidateName} from "../../utils/validate";
import api from './../../api'
import {useHistory} from "react-router-dom";
import {useAuthHeader} from "react-auth-jwt";
import ImageUploaderComponent from "../../components/ImageUploaderComponent";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5)
    },
    spacer: {
        marginTop: theme.spacing(2)
    },
    container: {
        marginTop: '1rem',
        height: '25rem'
    },
}))

const Progress1PersonalInfo = () => {
    const classes = useStyles()
    const history = useHistory()
    const authHeader = useAuthHeader()
    const initialState = {
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: new Date(),
        gender: '',
        religion: '',
        caste: '',
        aadhar_no: '',
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
        whatsapp_no: ''
    }
    const initialErrorState = {
        first_name: [false, ""],
        middle_name: [false, ""],
        last_name: [false, ""],
        dob: [false, ""],
        gender: [false, "Enter your Gender"],
        religion: [false, "Enter your Religion"],
        caste: [false, "Enter your Cast"],
        aadhar_no: [false, "Enter your 12 digit Aadhar No"],
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
        whatsapp_no: [false, "Enter 10 Digit Whatsapp Number"],
    }

    React.useEffect(()=>{
        api.get(PRE_REGISTRATION_PRESONAL_INFO, {
            headers: {
                Authorization: authHeader()
            }
        })
            .then((res)=>{
                if(res.data.status){
                    if (res.data.data){
                        setFormData(prevState => ({...prevState,
                            ...res.data.data,
                            apply_for_reserved_seat: res.data.data.apply_for_reserved_seat ?
                                (res.data.data.apply_for_reserved_seat === 'true' ||
                                    res.data.data.apply_for_reserved_seat === '1' ||
                                    res.data.data.apply_for_reserved_seat === true)
                                : false,
                            weather_bpl: res.data.data.weather_bpl > 0 ?
                                (res.data.data.weather_bpl === 'true' ||
                                    res.data.data.weather_bpl === '1' || res.data.data.weather_bpl === true)
                                : false,
                            guardian_same_father: res.data.data.guardian_same_father ?
                                (res.data.data.guardian_same_father === 'true' ||
                                    res.data.data.guardian_same_father === '1' || res.data.data.guardian_same_father === true)
                                : false,
                            dob: new Date(res.data.data.dob),
                            gender: res.data.data.gender ? res.data.data.gender : '',
                            religion: res.data.data.religion ? res.data.data.religion : '',
                            caste: res.data.data.caste ? res.data.data.caste : '',
                            mother_tongue: res.data.data.mother_tongue ? res.data.data.mother_tongue : '',
                            caste_certificate_no: res.data.data.caste_certificate_no ? res.data.data.caste_certificate_no : '',
                            bpl_card_no: res.data.data.bpl_card_no ? res.data.data.bpl_card_no : '',
                            father_name: res.data.data.father_name ? res.data.data.father_name : '',
                            father_occupation: res.data.data.father_occupation ? res.data.data.father_occupation : '',
                            mother_name: res.data.data.mother_name ? res.data.data.mother_name : '',
                            mother_occupation: res.data.data.mother_occupation ? res.data.data.mother_occupation : '',
                            guardian_name: res.data.data.guardian_name ? res.data.data.guardian_name : '',
                            guardian_occupation: res.data.data.guardian_occupation ? res.data.data.guardian_occupation : '',
                            address_line_1: res.data.data.address_line_1 ? res.data.data.address_line_1 : '',
                            address_line_2: res.data.data.address_line_2 ? res.data.data.address_line_2 : '',
                            city: res.data.data.city ? res.data.data.city : '',
                            district: res.data.data.district ? res.data.data.district : '',
                            pin: res.data.data.pin ? res.data.data.pin : '',
                            whatsapp_no: res.data.data.whatsapp_no ? res.data.data.whatsapp_no : ''
                        }))
                    }
                }else {
                    console.error(res.data.error)
                }
            }).catch((e)=>{
                console.error(e)
        })
    },[])

    const [file, setfile] = React.useState(null);
    const [formData, setFormData] = React.useState(initialState)
    const [errors, setErrors] = React.useState(initialErrorState)
    const [networkState, setNetworkState] = React.useState(netState.IDLE)

    const handleFormDataChange = (name) => (e) => {
        e.persist()
        setFormData(prevState => ({...prevState, [name]: e.target.value}))
    }

    const handleCheckboxChange = (name) => (e) => {
        e.persist()
        setFormData(prevState => ({...prevState, [name]: e.target.checked}))
    }

    const handleFileChange = (file) => {
        setfile(file)
    }

    const handleChangeGuardianSameFather = (e) => {
        setFormData(prevState => ({...prevState, guardian_same_father: e.target.checked}))
        if (e.target.checked) {
            setFormData(prevState => ({...prevState,
                guardian_name: prevState.father_name, guardian_occupation: prevState.father_occupation}))
        } else {
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const validateSelects = (name) => {
        if (formData[name].length > 0) {
            setErrors(prevState => ({...prevState, [name]: initialErrorState[name]}))
            return true
        } else {
            setErrors(prevState => ({...prevState, [name]: [true, "Please Enter the Value"]}))
            return false
        }
    }

    const validateCasteCert = () => {
        if (formData.apply_for_reserved_seat) {
            if (formData.caste_certificate_no.length > 2) {
                setErrors(prevState => ({...prevState, caste_certificate_no: initialErrorState.caste_certificate_no}))
                return true
            } else {
                setErrors(prevState => ({...prevState, caste_certificate_no: [true, "Enter the Caste Certificate No"]}))
            }
        } else {
            return true
        }
    }

    const validateBplNo = () => {
        if (formData.weather_bpl) {
            if (formData.bpl_card_no.length > 2) {
                setErrors(prevState => ({...prevState, bpl_card_no: initialErrorState.bpl_card_no}))
                return true
            } else {
                setErrors(prevState => ({...prevState, bpl_card_no: [true, "Enter the BPL card No"]}))
            }
        } else {
            return true
        }
    }

    const validateName = (name_type) => {
        if (ValidateName(formData[name_type])) {
            setErrors(prevState => ({...prevState, [name_type]: initialErrorState[name_type]}))
            return true
        } else {
            setErrors(prevState => ({...prevState, [name_type]: [true, "Invalid Input"]}))
            return false
        }
    }

    const validateRawData = (data) => {
        if (formData[data].length > 2){
            setErrors(prevState => ({...prevState, [data]: initialErrorState[data]}))
            return true
        } else {
            setErrors(prevState => ({...prevState, [data]: [true, "Invalid Input"]}))
            return false
        }
    }

    const validatePin = () => {
        if (/^\d{6}$/g.test(formData.pin)){
            setErrors(prevState => ({...prevState, pin: initialErrorState.pin}))
            return true
        } else {
            setErrors(prevState => ({...prevState, pin: [true, "Enter your Pin"]}))
            return false
        }
    }

    const checkWhatsAppNum = () => {
        if (validateMobileNo(formData.whatsapp_no)) {
            setErrors(prevState => ({...prevState, whatsapp_no: initialErrorState.whatsapp_no}))
            return true
        } else {
            setErrors(prevState => ({...prevState, whatsapp_no: [true, "Invalid Mobile Number"]}))
            return false
        }
    }

    const validate = () => {
        const _a1 = validateSelects('gender')
        const _a2 = validateSelects('religion')
        const _a3 = validateSelects('caste')
        const _a4 = validateSelects('mother_tongue')

        const _b1 = validateCasteCert()
        const _b2 = validateBplNo()

        const _c1 = validateName('father_name')
        const _c2 = validateName('mother_name')
        const _c3 = validateName('guardian_name')

        const _d1 = validateRawData('father_occupation')
        const _d2 = validateRawData('mother_occupation')
        const _d3 = validateRawData('guardian_occupation')
        const _d4 = validateRawData('address_line_1')
        const _d5 = validateRawData('address_line_2')
        const _d6 = validateRawData('city')
        const _d7 = validateRawData('district')

        const _e1 = validatePin()
        const _e2 = checkWhatsAppNum()

        return (_a1 && _a2 && _a3 && _a4 && _b1 && _b2 && _c1 && _c2 && _c3 && _d1 && _d2 && _d3 && _d4 && _d5
            && _d6 && _d7 && _e1 &&_e2)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(file === null){
            alert("Select a file before Submitting");
        }
        else {
            if (validate()) {
                setNetworkState(netState.BUSY)
                console.log("DOB", formData.dob)
                const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date(formData.dob))
                const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(new Date(formData.dob))
                const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(new Date(formData.dob))
                window.grecaptcha.ready(() => {
                    window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'}).then((token)=> {
                        toBase64(file).then(imageValue => {
                            api.post(PRE_REGISTRATION_PRESONAL_INFO, {
                                ...formData,
                                dob: `${ye}-${mo}-${da}`,
                                image: imageValue,
                                recaptcha_token: token
                            },{
                                headers:{
                                    Authorization: authHeader()
                                }
                            }).then((res) => {
                                if (res.data.status) {
                                    history.push(`/admission/progress/academic_info`)
                                } else {
                                    setNetworkState(netState.ERROR)
                                }
                            }).catch((e) => {
                                console.error(e)
                                setNetworkState(netState.ERROR)
                            })
                        }).catch((e)=>{
                            console.error(e)
                        })
                    })
                })
            }
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
                                        <TextField fullWidth disabled error={errors.aadhar_no[0]}
                                                   helperText={errors.aadhar_no[1]}
                                                   label={"Aadhaar No"} id={"aadhar_no"}
                                                   variant={"outlined"} value={formData.aadhar_no}/>
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
                                        <Grid item md={5}>
                                            <FormControlLabel
                                                value={"Apply for Reserved Seat"}
                                                control={<Switch
                                                        checked={formData.apply_for_reserved_seat}
                                                    onChange={handleCheckboxChange('apply_for_reserved_seat')}
                                                    color="secondary"
                                                    name="apply_for_reserved_seat"
                                                />}
                                                label={"Apply for Reserved Seat"}
                                                labelPlacement={"bottom"}/>
                                        </Grid>
                                        <Grid item md={7}>
                                            <TextField fullWidth disabled={!formData.apply_for_reserved_seat}
                                                       error={errors.caste_certificate_no[0]}
                                                       helperText={errors.caste_certificate_no[1]}
                                                       label={"Caste Certificate No"} id={"caste_certificate_no"}
                                                       variant={"outlined"} value={formData.caste_certificate_no}
                                                       onChange={handleFormDataChange("caste_certificate_no")}/>
                                        </Grid>
                                    </Grid>

                                    <Grid container item md={6} justify={"center"}>
                                        <Grid item md={5}>
                                            <FormControlLabel
                                                value={"Weather BPL"}
                                                control={<Switch
                                                    checked={formData.weather_bpl}
                                                    onChange={handleCheckboxChange('weather_bpl')}
                                                    color="secondary"
                                                    name="weather_bpl"
                                                />}
                                                label={"Weather BPL"}
                                                labelPlacement={"bottom"}/>
                                        </Grid>
                                        <Grid item md={7}>
                                            <TextField fullWidth disabled={!formData.weather_bpl}
                                                       error={errors.bpl_card_no[0]}
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
                                    <Grid item md={5}>
                                        <TextField required fullWidth disabled={formData.guardian_same_father}
                                                   error={errors.guardian_name[0]}
                                                   helperText={errors.guardian_name[1]}
                                                   label={"Guardian's Name"} id={"guardian-name"}
                                                   variant={"outlined"} value={formData.guardian_name}
                                                   onChange={handleFormDataChange('guardian_name')}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth disabled={formData.guardian_same_father}
                                                   error={errors.guardian_occupation[0]}
                                                   helperText={errors.guardian_occupation[1]}
                                                   label={"Guardian's Occupation"} id={"guardian-occupation"}
                                                   variant={"outlined"} value={formData.guardian_occupation}
                                                   onChange={handleFormDataChange('guardian_occupation')}/>
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
                                <Grid container spacing={5} justify={"center"} className={classes.spacer}>
                                    <Grid item md={4}>

                                        <FormControl variant="outlined" fullWidth error={errors.district[0]}>
                                            <InputLabel id="form-district-label">District</InputLabel>
                                            <Select
                                                labelId="form-district-label"
                                                id="form-district"
                                                value={formData.district}
                                                onChange={handleFormDataChange('district')}
                                                label="District"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'Alipurduar'}>Alipurduar</MenuItem>
                                                <MenuItem value={'Bankura'}>Bankura</MenuItem>
                                                <MenuItem value={'Birbhum'}>Birbhum</MenuItem>
                                                <MenuItem value={'Cooch Behar'}>Cooch Behar</MenuItem>
                                                <MenuItem value={'Dakshin Dinajpur'}>Dakshin Dinajpur</MenuItem>
                                                <MenuItem value={'Darjeeling'}>Darjeeling</MenuItem>
                                                <MenuItem value={'East Midnapore'}>East Midnapore</MenuItem>
                                                <MenuItem value={'Hooghly'}>Hooghly</MenuItem>
                                                <MenuItem value={'Howrah'}>Howrah</MenuItem>
                                                <MenuItem value={'Jalpaiguri'}>Jalpaiguri</MenuItem>
                                                <MenuItem value={'Jhargram'}>Jhargram</MenuItem>
                                                <MenuItem value={'Kalimpong'}>Kalimpong</MenuItem>
                                                <MenuItem value={'Kolkata'}>Kolkata</MenuItem>
                                                <MenuItem value={'Malda'}>Malda</MenuItem>
                                                <MenuItem value={'Murshidabad'}>Murshidabad</MenuItem>
                                                <MenuItem value={'Nadia'}>Nadia</MenuItem>
                                                <MenuItem value={'North 24 Parganas'}>North 24 Parganas</MenuItem>
                                                <MenuItem value={'Paschim Bardhaman'}>Paschim Bardhaman</MenuItem>
                                                <MenuItem value={'Purba Bardhaman'}>Purba Bardhaman</MenuItem>
                                                <MenuItem value={'Purulia'}>Purulia</MenuItem>
                                                <MenuItem value={'South 24 Parganas'}>South 24 Parganas</MenuItem>
                                                <MenuItem value={'Uttar Dinajpur'}>Uttar Dinajpur</MenuItem>
                                                <MenuItem value={'West Midnapore'}>West Midnapore</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.district[1]}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.pin[0]}
                                                   helperText={errors.pin[1]}
                                                   label={"PIN"} id={"pin"}
                                                   variant={"outlined"} value={formData.pin}
                                                   onChange={handleFormDataChange('pin')}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5} justify={"center"} className={classes.spacer}>
                                    <Grid item md={4}>
                                        <TextField disabled required fullWidth error={errors.email[0]}
                                                   helperText={errors.email[1]}
                                                   label={"Email"} id={"email"}
                                                   variant={"outlined"} value={formData.email}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField disabled required fullWidth error={errors.mobile[0]}
                                                   helperText={errors.mobile[1]}
                                                   label={"Mobile"} id={"mobile"}
                                                   variant={"outlined"} value={formData.mobile}/>
                                    </Grid>
                                    <Grid item md={4}>
                                        <TextField required fullWidth error={errors.whatsapp_no[0]}
                                                   helperText={errors.whatsapp_no[1]}
                                                   label={"Whatsapp No"} id={"whatsapp_no"}
                                                   variant={"outlined"} value={formData.whatsapp_no}
                                                   onChange={handleFormDataChange('whatsapp_no')}/>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Typography variant={"h6"} color={"textPrimary"} className={classes.spacer}>
                            Image Upload
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <ImageUploaderComponent onChange={handleFileChange} />
                            </CardContent>
                        </Card>
                        <Grid container className={classes.spacer} justify={"flex-start"}>
                            <Grid item>
                                <AdmissionProgressBack/>
                            </Grid>
                            <Grid item>
                                <NetworkSubmit buttonStyle={buttonType.SAVE_NEXT} networkState={networkState} handleSubmit={handleSubmit}/>
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

        </React.Fragment>
    )
}

export default Progress1PersonalInfo