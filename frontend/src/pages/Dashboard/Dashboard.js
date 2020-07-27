import React from "react";
import Header from "../../components/Header";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useSignOut} from "react-auth-jwt";
import Avatar from "@material-ui/core/Avatar";
import {Redirect, useParams} from "react-router-dom";
import {ADMISSION_EXISTING} from "../../routes/route";
import {DASHBOARD_TYPE} from "../../constant";
import DashboardAdmin from "./DashboardAdmin";
import DashboardStudent from "./DashboardStudent";
import DashboardTeacher from "./DashboardTeacher";

const DashboardComponent = () => {
    const signOut = useSignOut()
    let {user_type} = useParams();
    const nameInitial ="AB"
    const headerLinks = [
        (
            <Avatar>{nameInitial}</Avatar>
        ),
        (
            <IconButton onClick={() => signOut()} aria-label="show 17 new notifications" color="inherit">
                <ExitToAppIcon/>
            </IconButton>
        )
    ]

    const renderType = () => {

        switch (user_type) {
            case DASHBOARD_TYPE[0]:
                return <DashboardStudent/>
            case DASHBOARD_TYPE[1]:
                return <DashboardTeacher/>
            case DASHBOARD_TYPE[2]:
                return <DashboardAdmin/>
            default:
                return <Redirect to={ADMISSION_EXISTING}/>
        }
    }

    return (
        <React.Fragment>
            <Header links={headerLinks}/>
            {renderType()}
        </React.Fragment>
    )
}

export default DashboardComponent