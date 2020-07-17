import React from "react";
import AdmissionProgressBack from "../../components/AdmissionProgressBack";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {netState, PRE_REGISTRATION_ACADEMIC_INFO, RECAPTCHA_SITE_KEY} from "../../constant";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import NetworkSubmit from "../../components/NetworkSubmit";
import api from "../../api";
import {useHistory, useParams} from "react-router-dom";
import {useAuthHeader} from "react-auth-jwt";
import _ from 'lodash'
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5)
    },
    spacer: {
        marginTop: theme.spacing(2)
    }
}))

const Progress2AcademicInfo = () => {
    const classes = useStyles()
    let {user_id} = useParams()
    const history = useHistory()
    const authHeader = useAuthHeader()

    const scienceSubjects = [
        {id: 1, sub: ['PHYSICS', 'NUTRITION']},
        {id: 2, sub: ['CHEMISTRY', 'ECONOMICS']},
        {id: 3, sub: ['MATHEMATICS']},
        {id: 4, sub: ['BIOLOGY']},
        {id: 5, sub: ['GEOGRAPHY']},
        {id: 6, sub: ['COMPUTER SCIENCE', 'COMPUTER APPLICATION']}]

    const humanitiesSubjects = [
        {id: 1, sub: ['POLITICAL SCIENCE']},
        {id: 2, sub:['NUTRITION']},
        {id: 3, sub:['ECONOMICS', 'SANSKRIT']},
        {id: 4, sub:['PHILOSOPHY']},
        {id: 5, sub:['HISTORY','MATHEMATICS']},
        {id: 6, sub:['GEOGRAPHY']},
        {id: 7, sub:['COMPUTER  APPLICATION']}]

    const StreamDisablityFactors = {ALL: 'f1231', HU: '25115', NONE: 'q113dd'}
    const SubjectElligibilityFactors = {ELIGIBLE: '35b25', NOT_ELIGIBLE: 'ewtwyw'}

    const initialState = {
        previous_school_name: "Krishnanath College School",
        year_of_madhyamik: new Date(),
        previous_student_id: '',
        marks_beng: '',
        marks_engb: '',
        marks_maths: '',
        marks_psc: '',
        marks_lsc: '',
        marks_geo: '',
        marks_hist: '',
        marks_total: 0,
        marks_percentage: 0,
        direct_admission: false,
        medium: '',
        stream: '',
        first_language: 'BENA',
        second_language: 'ENGB',
        first_major: '',
        second_major: '',
        third_major: '',
        forth_major: '',
    }
    const initialErrorState = {
        previous_school_name: [false, "Enter name of your Previous School"],
        year_of_madhyamik: [false, "Enter year of Passing Madhyamik"],
        previous_student_id: [false, "Enter Previous Student Id, if any"],
        marks_beng: [false, "Bengali"],
        marks_engb: [false, "English"],
        marks_maths: [false, "Maths"],
        marks_psc: [false, "Physical Science"],
        marks_lsc: [false, "Life Science"],
        marks_geo: [false, "Geography"],
        marks_hist: [false, "History"],
        medium: [false, "Which is your Medium of Instruction"],
        stream: [false, "Which Stream, you are applying for"],
        first_major: [false, "Enter your first Major choice"],
        second_major: [false, "Enter your second Major choice"],
        third_major: [false, "Enter your third Major choice"],
        forth_major: [false, "Enter your forth Major choice"],
    }
    const [formData, setFormData] = React.useState(initialState)
    const [schoolRadioButton, setSchoolRadioButton] = React.useState("Krishnanath College School")
    // Todo: work with errors
    const [errors, setErrors] = React.useState(initialErrorState)
    const [networkState, setNetworkState] = React.useState(netState.IDLE)
    const [streamDisablityState, setStreamDisablityState] = React.useState(StreamDisablityFactors.ALL)
    const [geographyEligibilyState, setGeographyEligibilyState] = React.useState(SubjectElligibilityFactors.NOT_ELIGIBLE)
    const [comaEligibilyState, setComaEligibilyState] = React.useState(SubjectElligibilityFactors.NOT_ELIGIBLE)
    const [csEligibilyState, setCsEligibilyState] = React.useState(SubjectElligibilityFactors.NOT_ELIGIBLE)

    const initialScienceSubjectCombo = _.flatten(_.map(scienceSubjects, 'sub'))
    const [scienceFirstMajorList, setScienceFirstMajorList] = React.useState(initialScienceSubjectCombo)
    const [scienceSecondMajorList, setScienceSecondMajorList] = React.useState(initialScienceSubjectCombo)
    const [scienceThirdMajorList, setScienceThirdMajorList] = React.useState(initialScienceSubjectCombo)
    const [scienceForthMajorList, setScienceForthMajorList] = React.useState(initialScienceSubjectCombo)

    const initialHumanitiesSubjectCombo = _.flatten(_.map(humanitiesSubjects, 'sub'))
    const [humanitiesFirstMajorList, setHumanitiesFirstMajorList] = React.useState(initialHumanitiesSubjectCombo)
    const [humanitiesSecondMajorList, setHumanitiesSecondMajorList] = React.useState(initialHumanitiesSubjectCombo)
    const [humanitiesThirdMajorList, setHumanitiesThirdMajorList] = React.useState(initialHumanitiesSubjectCombo)
    const [humanitiesForthMajorList, setHumanitiesForthMajorList] = React.useState(initialHumanitiesSubjectCombo)

    React.useEffect(() => {
        api.get(PRE_REGISTRATION_ACADEMIC_INFO, {
            headers: {
                Authorization: authHeader()
            }
        })
            .then((res) => {
                if (res.data.status) {
                    setFormData(prevState => ({...prevState, ...res.data.data}))
                } else {
                    console.error(res.data.error)
                }
            }).catch((e) => {
            console.error(e)
        })
    }, [])

    const handleFormDataChange = (name) => (e) => {
        e.persist()
        setFormData(prevState => ({...prevState, [name]: e.target.value}))
    }
    const handleDateChange = (date) => {
        setFormData(prevState => ({...prevState, year_of_madhyamik: date}))
    };

    const handleDirectAdmissionCheckBox = (e) => {
        setFormData(prevState => ({...prevState, direct_admission: e.target.checked}))
    }

    const handleMarksChange = (name) => (e) => {
        e.persist()
        setFormData(prevState => ({...prevState, [name]: e.target.value}))

        // Set Total Marks
        setFormData(prevState => {
            const total = Number(prevState.marks_beng) + Number(prevState.marks_engb) + Number(prevState.marks_maths)
                + Number(prevState.marks_psc) + Number(prevState.marks_lsc) + Number(prevState.marks_geo)
                + Number(prevState.marks_hist)

            return {...prevState, marks_total: total}
        })

        //Set Percentage
        setFormData(prevState => {
            const total = Number(prevState.marks_beng) + Number(prevState.marks_engb) + Number(prevState.marks_maths)
                + Number(prevState.marks_psc) + Number(prevState.marks_lsc) + Number(prevState.marks_geo)
                + Number(prevState.marks_hist)

            return {...prevState, marks_percentage: (total / 7)}
        })
    }

    React.useEffect(()=>{
        setFormData(prevState => ({...prevState, stream: '', first_major: '',
            second_major: '', third_major: '', forth_major: ''}))

        if(formData.direct_admission){
            if (formData.previous_school_name === "Krishnanath College School") {
                // SC: 560 < formData.marks_total
                // HU: 500 < formData.marks_total
                if (formData.marks_total < 500) {
                    // Eligible for none
                    setStreamDisablityState(() => StreamDisablityFactors.NONE)
                } else if (formData.marks_total < 560) {
                    // Eligible for HU
                    setStreamDisablityState(() => StreamDisablityFactors.HU)
                } else {
                    // Eligible for All
                    setStreamDisablityState(() => StreamDisablityFactors.ALL)
                }
            } else {
                // SC: 600 < formData.marks_total
                // HU: 560 < formData.marks_total
                if (formData.marks_total < 560) {
                    // Eligible for none
                    setStreamDisablityState(() => StreamDisablityFactors.NONE)
                } else if (formData.marks_total < 600) {
                    // Eligible for HU
                    setStreamDisablityState(() => StreamDisablityFactors.HU)
                } else {
                    // Eligible for All
                    setStreamDisablityState(() => StreamDisablityFactors.ALL)
                }
            }
        } else {
            setStreamDisablityState(StreamDisablityFactors.ALL)
        }
    }, [formData.marks_total, formData.direct_admission])

    const renderSubjectErrors = () => {
        switch (streamDisablityState) {
            case StreamDisablityFactors.NONE:
                return `You are not eligible for Admission, as your Total Marks is too low.`
            case StreamDisablityFactors.HU:
                return `You are not eligible for Admission in Science Stream, as your Total Marks is too low.`
            case StreamDisablityFactors.ALL:
                return <React.Fragment/>
        }
    }

    const handleSchoolRadioButtonChange = (event) => {
        setSchoolRadioButton(() => event.target.value)
        if (event.target.value === "Krishnanath College School") {
            setFormData(prevState => ({...prevState, previous_school_name: "Krishnanath College School"}))
        }
    }

    React.useEffect(()=> {
        if (formData.marks_geo < 80){
            setGeographyEligibilyState(() => SubjectElligibilityFactors.NOT_ELIGIBLE)
        } else {
            setGeographyEligibilyState(() => SubjectElligibilityFactors.ELIGIBLE)
        }

        if (formData.marks_maths < 70) {
            setComaEligibilyState(() => SubjectElligibilityFactors.NOT_ELIGIBLE)
        } else {
            setComaEligibilyState(() => SubjectElligibilityFactors.ELIGIBLE)
        }

        if (formData.marks_maths < 80){
            setCsEligibilyState(()=> SubjectElligibilityFactors.NOT_ELIGIBLE)
        } else {
            setCsEligibilyState(()=> SubjectElligibilityFactors.ELIGIBLE)
        }

    }, [formData.marks_geo, formData.marks_maths])

    React.useEffect(()=>{

        if(formData.stream === "Science"){
            setScienceFirstMajorList(()=>{
                const pick = _.pickBy(scienceSubjects, (i)=>{
                    return !(i.sub.includes(formData.forth_major) || i.sub.includes(formData.second_major) ||
                        i.sub.includes(formData.third_major))
                })
                const qq = _.flatten(_.map(pick, 'sub'))
                _.remove(qq, (i)=> {
                    const g = geographyEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "GEOGRAPHY" : "";
                    const co = comaEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER APPLICATION" : "";
                    const cs = csEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER SCIENCE" : "";
                    return (i === g || i === co || i === cs)
                })
                console.log(qq)
                return qq
            })
            setScienceSecondMajorList(()=>{
                const pick = _.pickBy(scienceSubjects, (i)=>{
                    return !(i.sub.includes(formData.forth_major) || i.sub.includes(formData.first_major) ||
                        i.sub.includes(formData.third_major))
                })
                const qq = _.flatten(_.map(pick, 'sub'))
                _.remove(qq, (i)=> {
                    const g = geographyEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "GEOGRAPHY" : "";
                    const co = comaEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER APPLICATION" : "";
                    const cs = csEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER SCIENCE" : "";
                    return (i === g || i === co || i === cs)
                })
                return qq
            })
            setScienceThirdMajorList(()=>{
                const pick = _.pickBy(scienceSubjects, (i)=>{
                    return !(i.sub.includes(formData.second_major) || i.sub.includes(formData.first_major) ||
                        i.sub.includes(formData.forth_major))
                })
                const qq = _.flatten(_.map(pick, 'sub'))
                _.remove(qq, (i)=> {
                    const g = geographyEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "GEOGRAPHY" : "";
                    const co = comaEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER APPLICATION" : "";
                    const cs = csEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER SCIENCE" : "";
                    return (i === g || i === co || i === cs)
                })
                return qq
            })
            setScienceForthMajorList(()=>{
                const pick = _.pickBy(scienceSubjects, (i)=>{
                    return !(i.sub.includes(formData.second_major) || i.sub.includes(formData.first_major) ||
                        i.sub.includes(formData.third_major))
                })
                const qq = _.flatten(_.map(pick, 'sub'))
                _.remove(qq, (i)=> {
                    const g = geographyEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "GEOGRAPHY" : "";
                    const co = comaEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER APPLICATION" : "";
                    const cs = csEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER SCIENCE" : "";
                    return (i === g || i === co || i === cs)
                })
                return qq
            })
        } else if (formData.stream === "Humanities") {
            setHumanitiesFirstMajorList(()=>{
                const pick = _.pickBy(scienceSubjects, (i)=>{
                    return !(i.sub.includes(formData.forth_major) || i.sub.includes(formData.second_major) ||
                        i.sub.includes(formData.third_major))
                })
                const qq =_.flatten(_.map(pick, 'sub'))
                _.remove(qq, (i)=> {
                    const g = geographyEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "GEOGRAPHY" : "";
                    const co = comaEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER APPLICATION" : "";
                    const cs = csEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER SCIENCE" : "";
                    return (i === g || i === co || i === cs)
                })
                return qq
            })
            setHumanitiesSecondMajorList(()=>{
                const pick = _.pickBy(scienceSubjects, (i)=>{
                    return !(i.sub.includes(formData.forth_major) || i.sub.includes(formData.first_major) ||
                        i.sub.includes(formData.third_major))
                })
                const qq = _.flatten(_.map(pick, 'sub'))
                _.remove(qq, (i)=> {
                    const g = geographyEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "GEOGRAPHY" : "";
                    const co = comaEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER APPLICATION" : "";
                    const cs = csEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER SCIENCE" : "";
                    return (i === g || i === co || i === cs)
                })
                return qq
            })
            setHumanitiesThirdMajorList(()=>{
                const pick = _.pickBy(scienceSubjects, (i)=>{
                    return !(i.sub.includes(formData.second_major) || i.sub.includes(formData.first_major) ||
                        i.sub.includes(formData.forth_major))
                })
                const qq = _.flatten(_.map(pick, 'sub'))
                _.remove(qq, (i)=> {
                    const g = geographyEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "GEOGRAPHY" : "";
                    const co = comaEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER APPLICATION" : "";
                    const cs = csEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER SCIENCE" : "";
                    return (i === g || i === co || i === cs)
                })
                return qq
            })
            setHumanitiesForthMajorList(()=>{
                const pick = _.pickBy(scienceSubjects, (i)=>{
                    return !(i.sub.includes(formData.second_major) || i.sub.includes(formData.first_major) ||
                        i.sub.includes(formData.third_major))
                })
                const qq =_.flatten(_.map(pick, 'sub'))
                _.remove(qq, (i)=> {
                    const g = geographyEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "GEOGRAPHY" : "";
                    const co = comaEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER APPLICATION" : "";
                    const cs = csEligibilyState === SubjectElligibilityFactors.NOT_ELIGIBLE ? "COMPUTER SCIENCE" : "";
                    return (i === g || i === co || i === cs)
                })
                return qq
            })
        }
    }, [formData.first_major, formData.second_major, formData.third_major, formData.forth_major, formData.stream,
        geographyEligibilyState, comaEligibilyState, csEligibilyState])

    const validate = () => {
        //TODO: Validate
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'}).then((token) => {
                    api.post(PRE_REGISTRATION_ACADEMIC_INFO, {
                        ...formData,
                        recaptcha_token: token
                    }, {
                        headers: {
                            Authorization: authHeader()
                        }
                    }).then((res) => {
                        if (res.data.status) {
                            history.push(`/admission/progress/${user_id}/payment_info`)
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

    const renderStreamSubjectSelector = () => {
        if (formData.stream === '') {
            return <React.Fragment/>
        } else if (formData.stream === 'Science') {
            return (
                <React.Fragment>
                    <Grid container spacing={1}>
                        <Grid item md={2}>
                            <TextField disabled fullWidth required label={"First Language"} id={"first_language"}
                                       variant={"outlined"} value={formData.first_language}/>
                        </Grid>
                        <Grid item md={2}>
                            <TextField disabled fullWidth required label={"Second Language"} id={"second_language"}
                                       variant={"outlined"} value={formData.second_language}/>
                        </Grid>
                        <Grid item md={2}>
                            <FormControl variant="outlined" fullWidth error={errors.first_major[0]}>
                                <InputLabel id="form-first_major-label">First Major</InputLabel>
                                <Select
                                    labelId="form-first_major-label"
                                    id="form-first_major"
                                    value={formData.first_major}
                                    onChange={handleFormDataChange('first_major')}
                                    label="First Major"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {scienceFirstMajorList.map((v, i) => {
                                        return <MenuItem key={i} value={v}>{v}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{errors.forth_major[1]}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={2}>
                            <FormControl variant="outlined" fullWidth error={errors.second_major[0]}>
                                <InputLabel id="form-second_major-label">Second Major</InputLabel>
                                <Select
                                    labelId="form-second_major-label"
                                    id="form-second_major"
                                    value={formData.second_major}
                                    onChange={handleFormDataChange('second_major')}
                                    label="Second Major"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {scienceSecondMajorList.map((v, i) => {
                                        return <MenuItem key={i} value={v}>{v}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{errors.second_major[1]}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={2}>
                            <FormControl variant="outlined" fullWidth error={errors.third_major[0]}>
                                <InputLabel id="form-third_major-label">Third Major</InputLabel>
                                <Select
                                    labelId="form-third_major-label"
                                    id="form-third_major"
                                    value={formData.third_major}
                                    onChange={handleFormDataChange('third_major')}
                                    label="Third Major"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {scienceThirdMajorList.map((v, i) => {
                                        return <MenuItem key={i} value={v}>{v}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{errors.third_major[1]}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={2}>
                            <FormControl variant="outlined" fullWidth error={errors.forth_major[0]}>
                                <InputLabel id="form-forth_major-label">Forth Major</InputLabel>
                                <Select
                                    labelId="form-forth_major-label"
                                    id="form-forth_major"
                                    value={formData.forth_major}
                                    onChange={handleFormDataChange('forth_major')}
                                    label="Forth Major"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {scienceForthMajorList.map((v, i) => {
                                        return <MenuItem key={i} value={v}>{v}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{errors.forth_major[1]}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </React.Fragment>
            )
        } else if (formData.stream === 'Humanities') {
            return (
                <React.Fragment>
                    <Grid container spacing={1}>
                        <Grid item md={2}>
                            <TextField disabled fullWidth required label={"First Language"} id={"first_language"}
                                       variant={"outlined"} value={formData.first_language}/>
                        </Grid>
                        <Grid item md={2}>
                            <TextField disabled fullWidth required label={"Second Language"} id={"second_language"}
                                       variant={"outlined"} value={formData.second_language}/>
                        </Grid>
                        <Grid item md={2}>
                            <FormControl variant="outlined" fullWidth error={errors.first_major[0]}>
                                <InputLabel id="form-first_major-label">First Major</InputLabel>
                                <Select
                                    labelId="form-first_major-label"
                                    id="form-first_major"
                                    value={formData.first_major}
                                    onChange={handleFormDataChange('first_major')}
                                    label="First Major"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {humanitiesFirstMajorList.map((v, i) => {
                                        return <MenuItem key={i} value={v}>{v}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{errors.second_major[1]}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={2}>
                            <FormControl variant="outlined" fullWidth error={errors.second_major[0]}>
                                <InputLabel id="form-second_major-label">Second Major</InputLabel>
                                <Select
                                    labelId="form-second_major-label"
                                    id="form-second_major"
                                    value={formData.second_major}
                                    onChange={handleFormDataChange('second_major')}
                                    label="Second Major"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {humanitiesSecondMajorList.map((v, i) => {
                                        return <MenuItem key={i} value={v}>{v}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{errors.second_major[1]}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={2}>
                            <FormControl variant="outlined" fullWidth error={errors.third_major[0]}>
                                <InputLabel id="form-third_major-label">Third Major</InputLabel>
                                <Select
                                    labelId="form-third_major-label"
                                    id="form-third_major"
                                    value={formData.third_major}
                                    onChange={handleFormDataChange('third_major')}
                                    label="Third Major"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {humanitiesThirdMajorList.map((v, i) => {
                                        return <MenuItem key={i} value={v}>{v}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{errors.third_major[1]}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={2}>
                            <FormControl variant="outlined" fullWidth error={errors.forth_major[0]}>
                                <InputLabel id="form-forth_major-label">Forth Major</InputLabel>
                                <Select
                                    labelId="form-forth_major-label"
                                    id="form-forth_major"
                                    value={formData.forth_major}
                                    onChange={handleFormDataChange('forth_major')}
                                    label="Forth Major"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {humanitiesForthMajorList.map((v, i) => {
                                        return <MenuItem key={i} value={v}>{v}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{errors.forth_major[1]}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            <Container className={classes.root}>
                <Paper elevation={0} square>
                    <CardContent>
                        <Typography variant={"h6"} color={"textPrimary"}>
                            Previous Academic Info
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container spacing={5} justify={"center"} alignItems={"center"}>
                                    <Grid item md={6}>
                                        <FormControl component={"fieldset"}>
                                            <FormLabel component="legend">{errors.previous_school_name[1]}</FormLabel>
                                            <RadioGroup row aria-label="position" name="position"
                                                        value={schoolRadioButton}
                                                        onChange={handleSchoolRadioButtonChange}>
                                                <FormControlLabel value="Krishnanath College School"
                                                                  control={<Radio color="primary"/>}
                                                                  label="Krishnanath College School"/>
                                                <FormControlLabel value={"Others"}
                                                                  control={<Radio color="primary"/>}
                                                                  label="Others"/>
                                            </RadioGroup>
                                        </FormControl>
                                        <TextField fullWidth required
                                                   disabled={schoolRadioButton === "Krishnanath College School"}
                                                   error={errors.previous_school_name[0]}
                                                   helperText={errors.previous_school_name[1]}
                                                   label={"Others"}
                                                   id={"previous_school_name"}
                                                   variant={"outlined"}
                                                   value={formData.previous_school_name}
                                                   onChange={handleFormDataChange("previous_school_name")}/>
                                    </Grid>
                                    <Grid item md={3}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                autoOk
                                                variant="inline"
                                                inputVariant="outlined"
                                                id="year_of_madhyamik"
                                                label="Year of Passing Madhyamik"
                                                views={["year"]}
                                                value={formData.year_of_madhyamik}
                                                helperText={errors.year_of_madhyamik[1]}
                                                InputAdornmentProps={{position: "start"}}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                onChange={handleDateChange}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item md={3}>
                                        <TextField fullWidth required error={errors.previous_student_id[0]}
                                                   helperText={errors.previous_student_id[1]}
                                                   label={"Previous Student Id"} id={"previous_student_id"}
                                                   variant={"outlined"} value={formData.previous_student_id}
                                                   onChange={handleFormDataChange("previous_student_id")}/>
                                    </Grid>
                                </Grid>
                                <Typography variant={"subtitle1"} color={"textPrimary"} className={classes.spacer}>
                                    Madhyamik Result Details
                                </Typography>
                                <Card variant={"outlined"}>
                                    <CardContent>
                                        <Grid container justify={"flex-start"} spacing={2}>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_beng[0]}
                                                           helperText={errors.marks_beng[1]}
                                                           label={"BENG"} id={"marks_beng"}
                                                           variant={"outlined"} value={formData.marks_beng}
                                                           onChange={handleMarksChange("marks_beng")}
                                                           inputProps={{min: 0, max: 100, maxlength:3}}  />
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_engb[0]}
                                                           helperText={errors.marks_engb[1]}
                                                           label={"ENGB"} id={"marks_engb"}
                                                           variant={"outlined"} value={formData.marks_engb}
                                                           onChange={handleMarksChange("marks_engb")}
                                                           inputProps={{min: 0, max: 100, maxlength:3}}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_maths[0]}
                                                           helperText={errors.marks_maths[1]}
                                                           label={"Mathematics"} id={"marks_maths"}
                                                           variant={"outlined"} value={formData.marks_maths}
                                                           onChange={handleMarksChange("marks_maths")}
                                                           inputProps={{min: 0, max: 100, maxlength:3}}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_psc[0]}
                                                           helperText={errors.marks_psc[1]}
                                                           label={"Physical Science"} id={"marks_psc"}
                                                           variant={"outlined"} value={formData.marks_psc}
                                                           onChange={handleMarksChange("marks_psc")}
                                                           inputProps={{min: 0, max: 100, maxlength:3}}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_lsc[0]}
                                                           helperText={errors.marks_lsc[1]}
                                                           label={"Life Science"} id={"marks_lsc"}
                                                           variant={"outlined"} value={formData.marks_lsc}
                                                           onChange={handleMarksChange("marks_lsc")}
                                                           inputProps={{min: 0, max: 100, maxlength:3}}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_geo[0]}
                                                           helperText={errors.marks_geo[1]}
                                                           label={"Geography"} id={"marks_geo"}
                                                           variant={"outlined"} value={formData.marks_geo}
                                                           onChange={handleMarksChange("marks_geo")}
                                                           inputProps={{min: 0, max: 100, maxlength:3}}/>
                                            </Grid>
                                            <Grid item>
                                                <TextField fullWidth required error={errors.marks_hist[0]}
                                                           helperText={errors.marks_hist[1]}
                                                           label={"History"} id={"marks_hist"}
                                                           variant={"outlined"} value={formData.marks_hist}
                                                           onChange={handleMarksChange("marks_hist")}
                                                           inputProps={{min: 0, max: 3, maxlength:3}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid container justify={"flex-start"} spacing={2} className={classes.spacer}>
                                            <Grid item md={3}>
                                                <TextField fullWidth required label={"Total"} id={"total"}
                                                           variant={"filled"} value={formData.marks_total}
                                                           onChange={handleMarksChange("marks_total")}/>
                                            </Grid>
                                            <Grid item md={3}>
                                                <TextField fullWidth required label={"Percentage"}
                                                           id={"percentage"} variant={"filled"}
                                                           value={formData.marks_percentage}
                                                           onChange={handleMarksChange("marks_percentage")}/>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                        <Typography variant={"h6"} color={"textPrimary"} className={classes.spacer}>
                            Admission Info
                        </Typography>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container justify={"flex-start"} alignItems={"center"} spacing={4}>
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.direct_admission}
                                                    onChange={handleDirectAdmissionCheckBox}
                                                    name="direct_admission"
                                                />
                                            }
                                            label="Direct Admission"
                                            labelPlacement={"bottom"}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormControl variant="outlined" fullWidth error={errors.medium[0]}>
                                            <InputLabel id="form-medium-label">Medium</InputLabel>
                                            <Select
                                                labelId="form-medium-label"
                                                id="form-medium"
                                                value={formData.medium}
                                                onChange={handleFormDataChange('medium')}
                                                label="medium"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'Bengali'}>Bengali</MenuItem>
                                                <MenuItem value={'English'}>English</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.medium[1]}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl variant="outlined" fullWidth error={errors.stream[0]}
                                                     disabled={streamDisablityState === StreamDisablityFactors.NONE}>
                                            <InputLabel id="form-stream-label">Stream</InputLabel>
                                            <Select
                                                labelId="form-stream-label"
                                                id="form-stream"
                                                value={formData.stream}
                                                onChange={handleFormDataChange('stream')}
                                                label="Stream"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem
                                                    disabled={!(streamDisablityState === StreamDisablityFactors.ALL)}
                                                    value={'Science'}>
                                                    Science
                                                </MenuItem>
                                                <MenuItem value={'Humanities'}>Humanities</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.stream[1]}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={"body2"} color={"error"}>
                                            {renderSubjectErrors()}
                                        </Typography>
                                        <Typography variant={"body2"} color={"error"}>
                                            {geographyEligibilyState === SubjectElligibilityFactors.ELIGIBLE ? "":
                                                "Your marks in Geography" +
                                                " is less than 80. You can't take Geography"}
                                        </Typography>
                                        <Typography variant={"body2"} color={"error"}>
                                            {comaEligibilyState === SubjectElligibilityFactors.ELIGIBLE ? "":
                                                "Your marks in Maths" +
                                                " is less than 70. You can't take Computer Application"}
                                        </Typography>
                                        <Typography variant={"body2"} color={"error"}>
                                            {csEligibilyState === SubjectElligibilityFactors.ELIGIBLE ? "":
                                                "Your marks in Maths" +
                                                " is less than 80. You can't take Computer Science"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography variant={"subtitle1"} color={"textPrimary"} className={classes.spacer}>
                                    Subject Combination
                                </Typography>
                                <Card variant={"outlined"}>
                                    <CardContent>
                                        {renderStreamSubjectSelector()}
                                    </CardContent>
                                </Card>
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
        </React.Fragment>
    )
}

export default Progress2AcademicInfo