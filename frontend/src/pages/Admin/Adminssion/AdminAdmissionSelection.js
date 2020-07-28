import React from "react";
import DashboardHeader from "../../Dashboard/DashboardHeader";
import {makeStyles} from "@material-ui/styles";
import MaterialTable from 'material-table'
import api from "../../../api";
import {ADMIN_ADMISSION_SELECTION} from "../../../constant";
import {useAuthHeader} from "react-auth-jwt";

const useStyles = makeStyles((theme)=>({
    table: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    }
}))

const AdminAdmissionSelection = () => {
    const classes = useStyles()
    const authHeader = useAuthHeader()
    React.useEffect(() => {
        api.get(ADMIN_ADMISSION_SELECTION, {
            headers: {
                Authorization: authHeader()
            }
        }).then((res)=>{
            if (res.data.status) {
                console.log(res.data)
            } else {
                console.error(res.data.error)
            }
        }).catch((e) => {
            console.error(e)
        })
    }, [])

    const columns = [
        { title: 'Name', field: 'name' },
        { title: 'Stream', field: 'stream'}
    ]

    return (
        <React.Fragment>
            <DashboardHeader/>
            <div className={classes.table}>
                <MaterialTable title={"Student Admission Selection"} columns={columns}/>
            </div>
        </React.Fragment>
    )
}

export default AdminAdmissionSelection