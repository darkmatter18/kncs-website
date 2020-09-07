import React from "react";
import DashboardHeader from "../../../DashboardComponent/DashboardHeader";
import {makeStyles} from "@material-ui/styles";
import MaterialTable from 'material-table'
import {Api} from "../../../../api";
import {
    ADMIN_ADMISSION_DELETE,
    ADMIN_ADMISSION_DETAILS,
    ADMIN_ADMISSION_SELECTION,
    ADMIN_PAYMENT_CONFIRM
} from "../../../../constant";
import {useAuthHeader} from "react-auth-jwt";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {AttachMoney} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    card: {
        height: theme.spacing(50)
    },
    table: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    },
    loader: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(15)
    },
    detailPanel: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    spacing: {
        marginTop: theme.spacing(2)
    }
}))

const AdminAdmissionSelection = () => {
    const classes = useStyles()
    const authHeader = useAuthHeader()
    const [data, setData] = React.useState([])

    const TABLE_TITLE = "Student Admission Selection"

    React.useEffect(() => {
        Api.get(ADMIN_ADMISSION_DETAILS, {
            headers: {
                Authorization: authHeader()
            }
        }).then((res) => {
            if (res.data.status) {
                console.log(res.data.data)
                setData(() => res.data.data.map((v) => {
                    return {...v, name: `${v.first_name} ${v.middle_name} ${v.last_name}`}
                }))
            } else {
                console.error(res.data.error)
            }
        }).catch((e) => {
            console.error(e)
        })
        // eslint-disable-next-line
    }, [])

    const doAction = (action_url ,data) =>{
        const _d = data.map((v) => v.application_no)
        setData([])
        Api.post(action_url, {
            application_no: _d
        }, {
            headers: {
                Authorization: authHeader()
            }
        }).then((res) => {
            if (res.data.status) {
                console.log(res.data.data)
                setData(() => res.data.data.map((v) => {
                    return {...v, name: `${v.first_name} ${v.middle_name} ${v.last_name}`}
                }))
            } else {
                console.error(res.data.error)
            }
        }).catch((e) => {
            console.error(e)
        })
    }

    return (
        <React.Fragment>
            <DashboardHeader/>
            <div className={classes.table}>
                <MaterialTable
                    title={TABLE_TITLE}
                    isLoading={data.length === 0}
                    columns={[
                        {title: 'Application No', field: 'application_no', sorting: false, type: "numeric"},
                        {title: 'Name', field: 'name', filtering: false, sorting: false, type: "string"},
                        {
                            title: 'Father\'s name',
                            field: 'father_name',
                            filtering: false,
                            sorting: false,
                            type: "string"
                        },
                        {
                            title: 'Stream',
                            field: 'stream',
                            sorting: false,
                            type: "string",
                            lookup: {Science: 'Science', Humanities: 'Humanities'}
                        },
                        {title: 'Madhyamik Total', field: 'marks_total', type: 'numeric', filtering: false,},
                        {
                            title: 'Previous School',
                            field: 'previous_school_name',
                            type: 'string',
                        },
                        {
                            title: 'Medium',
                            field: 'medium',
                            type: "string",
                            lookup: {Bengali: 'Bengali', English: 'English'}
                        },
                        {
                            title: 'Status',
                            field: 'status',
                            type: "string",
                            lookup: {SUBMITTED: 'SUBMITTED', SELECTED: 'SELECTED'}
                        },
                        {
                            title: 'Payment verified',
                            field: 'verified_transaction',
                            type: "string",
                            lookup: {Y: 'Y', N: 'N'}
                        }
                    ]}
                    data={data}
                    options={{
                        filtering: true,
                        exportButton: true,
                        selection: true,
                        pageSize: 20,
                        pageSizeOptions: [10, 20, 30, 40]
                    }}
                    actions={[
                        {
                            tooltip: 'Select the student',
                            icon: 'add',
                            onClick: (evt, data) => {
                                doAction(ADMIN_ADMISSION_SELECTION, data)
                            }
                        },
                        {
                            tooltip: 'Verified the Payment',
                            icon: () => <AttachMoney/>,
                            onClick: (evt, data) => {
                                doAction(ADMIN_PAYMENT_CONFIRM, data)
                            }
                        },
                        {
                            tooltip: 'Delete the Record',
                            icon: 'delete',
                            onClick: (evt, data) => {
                                doAction(ADMIN_ADMISSION_DELETE, data)
                            }
                        },
                    ]}
                    detailPanel={rowData => {
                        return (
                            <React.Fragment>
                                <Container className={classes.detailPanel}>
                                    <Grid container spacing={4}>
                                        <Grid item md={6}>
                                            <Typography variant={"h6"}>
                                                Madhyamik Marks
                                            </Typography>
                                            <Card variant={"outlined"}>
                                                <CardContent>
                                                    <Grid container spacing={4} justify={"center"}>
                                                        <Grid item>
                                                            <Typography variant={"body2"}>
                                                                Bengali: {rowData.marks_beng}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"body2"}>
                                                                English: {rowData.marks_engb}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"body2"}>
                                                                Maths: {rowData.marks_maths}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"body2"}>
                                                                Physical Science: {rowData.marks_psc}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"body2"}>
                                                                Life Science: {rowData.marks_lsc}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={4} justify={"center"}
                                                          alignItems={"center"}>
                                                        <Grid item>
                                                            <Typography variant={"body2"}>
                                                                History: {rowData.marks_hist}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"body2"}>
                                                                Geography: {rowData.marks_geo}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"subtitle1"}>
                                                                <b>Total Marks: {rowData.marks_total}</b>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"subtitle1"}>
                                                                <b> Percentage: {rowData.marks_percentage}%</b>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item md={6}>
                                            <Typography variant={"h6"}>
                                                Selected Subjects
                                            </Typography>
                                            <Card variant={"outlined"}>
                                                <CardContent>
                                                    <Grid container spacing={4} justify={"center"}>
                                                        <Grid item>
                                                            <Typography variant={"body1"}>
                                                                {rowData.first_language}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"body1"}>
                                                                {rowData.second_language}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"body1"}>
                                                                {rowData.first_major}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"body1"}>
                                                                {rowData.second_major}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"body1"}>
                                                                {rowData.third_major}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant={"body1"}>
                                                                {rowData.forth_major}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                    <Typography variant={"h6"} className={classes.spacing}>
                                        Payment Details
                                    </Typography>
                                    <Card variant={"outlined"}>
                                        <CardContent>
                                            <Grid container spacing={4} justify={"center"} alignItems={"center"}>
                                                <Grid item>
                                                    <Typography variant={"body1"}>
                                                        Mode of Payment: <b>{rowData.mode_of_payment}</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant={"body1"}>
                                                        Name of Bank: <b>{rowData.name_of_bank}</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant={"body1"}>
                                                        Transaction Id: <b>{rowData.transaction_id}</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant={"body1"}>
                                                        Transaction Date: <b>{rowData.transaction_date}</b>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Container>
                            </React.Fragment>
                        )
                    }}
                />
            </div>
        </React.Fragment>
    )
}

export default AdminAdmissionSelection