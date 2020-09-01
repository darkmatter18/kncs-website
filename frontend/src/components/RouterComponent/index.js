import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {
    ADMIN_ADMISSION_SELECTION, ADMIN_MANAGE_SCHOOL,
    ADMISSION_ALL_DONE,
    ADMISSION_EXISTING,
    ADMISSION_HOME,
    ADMISSION_NEW,
    ADMISSION_NEW_DONE, ADMISSION_PROGRESS_ROUTE, DASHBOARD,
    HOME, LOGIN, MEET_THE_DEVS
} from "./routes";
import {PrivateRoute} from "react-auth-jwt";

import Home from "../Home";
import AdmissionHome from "../../pages/Admission/AdmissionHome";
import AdmissionNew from "../../pages/Admission/AdmissionNew";
import AdmissionStop from "../../pages/Admission/AdmissionStopped";
import AdmissionNewDone from "../../pages/Admission/AdmissionNewDone";
import AdmissionExisting from "../../pages/Admission/AdmissionExisting";
import AdmissionAllDone from "../../pages/Admission/AdmissionAllDone";
import AdmissionProgress from "../../pages/Admission/AdmissionProgress";
import AllLogin from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import AdminAdmissionSelection from "../../pages/Admin/Adminssion/AdminAdmissionSelection";
import School from "../../pages/Admin/School";
import MeetTheDevelopers from "../../pages/MeetTheDevelopers";
import Page404 from "../../pages/Page404";

const RouterComponent = () => {
    const admissionOn = false;

    return (
        <Router basename={'/portal'}>
            <Switch>
                <Route path={HOME} component={Home} exact/>

                <Route path={ADMISSION_HOME} component={AdmissionHome} exact/>
                {admissionOn ? (
                    <Route path={ADMISSION_NEW} component={AdmissionNew} exact/>
                ): (
                    <Route path={ADMISSION_NEW} component={AdmissionStop} exact/>
                )}
                <Route path={ADMISSION_NEW_DONE} component={AdmissionNewDone} exact/>
                <Route path={ADMISSION_EXISTING} component={AdmissionExisting} exact/>
                <Route path={ADMISSION_ALL_DONE} component={AdmissionAllDone} exact/>
                <PrivateRoute path={ADMISSION_PROGRESS_ROUTE} Component={AdmissionProgress} loginPath={ADMISSION_NEW} exact/>

                <Route path={LOGIN} component={AllLogin} exact/>
                <PrivateRoute path={DASHBOARD} Component={Dashboard} loginPath={LOGIN} exact/>
                <PrivateRoute path={ADMIN_ADMISSION_SELECTION} Component={AdminAdmissionSelection} loginPath={LOGIN} exact/>
                <Route path={ADMIN_MANAGE_SCHOOL} component={School} exact/>
                <Route path={MEET_THE_DEVS} component={MeetTheDevelopers} exact/>
                <Route path='*' exact={true} component={Page404} />
            </Switch>
        </Router>
    )
}

export default RouterComponent