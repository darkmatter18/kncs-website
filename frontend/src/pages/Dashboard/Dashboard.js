import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {ADMISSION_EXISTING} from "../../routes/route";
import {DASHBOARD_TYPE} from "../../constant";
import DashboardAdmin from "./DashboardAdmin";
import DashboardStudent from "./DashboardStudent";
import DashboardTeacher from "./DashboardTeacher";
import DashboardHeader from "./DashboardHeader";

const DashboardComponent = () => {
    let {user_type} = useParams();

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
            <DashboardHeader/>
            {renderType()}
        </React.Fragment>
    )
}

export default DashboardComponent