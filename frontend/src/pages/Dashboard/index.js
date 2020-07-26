import React from 'react';
import {Redirect, useParams} from "react-router-dom";
import {DASHBOARD_TYPE} from "../../constant";
import {LOGIN} from "../../routes/route";
import DashboardComponent from "./Dashboard";

const Dashboard = () => {
    let {user_type} = useParams();
    if (!DASHBOARD_TYPE.includes(user_type)) {
        return <Redirect to={LOGIN}/>
    } else {
        return <DashboardComponent/>
    }
    }


export default Dashboard