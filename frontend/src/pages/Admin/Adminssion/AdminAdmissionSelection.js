import React from "react";
import DashboardHeader from "../../Dashboard/DashboardHeader";
import {makeStyles} from "@material-ui/styles";
import MaterialTable from 'material-table'
import api from "../../../api";
import {ADMIN_ADMISSION_SELECTION} from "../../../constant";
import {useAuthHeader} from "react-auth-jwt";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    }
}))

const AdminAdmissionSelection = () => {
    const classes = useStyles()
    const authHeader = useAuthHeader()
    const [data, setData] = React.useState([])

    const TABLE_TITLE = "Student Admission Selection"

    React.useEffect(() => {
        api.get(ADMIN_ADMISSION_SELECTION, {
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

    const renderC = () => {
        if(data.length !== 0) {
            return (
                <MaterialTable
                    title={TABLE_TITLE}
                    columns={[
                        {title: 'Application No', field: 'application_no', sorting: false, type: "numeric"},
                        {title: 'Name', field: 'name', filtering: false, sorting: false, type: "string"},
                        {
                            title: 'Father\' name',
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
                                console.log(data)
                            }
                        }
                    ]}
                />
            )
        } else {
            return (
                <React.Fragment>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant={"h6"}>
                                {TABLE_TITLE}
                                <Grid container justify={"center"} alignItems={"center"}>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <Typography component={"div"} align={"center"}>
                                            <CircularProgress className={classes.loader} />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Typography>
                        </CardContent>
                    </Card>
                </React.Fragment>
            )
        }
    }

    /**
     * Application,
     * S name
     * F name
     * Stream
     * Madhyamik total
     * Medium
     * Status
     */
    console.log(data)
    return (
        <React.Fragment>
            <DashboardHeader/>
            <div className={classes.table}>
                {renderC()}
            </div>
        </React.Fragment>
    )
}

export default AdminAdmissionSelection