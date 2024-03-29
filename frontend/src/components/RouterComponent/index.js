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

import Home from "../HomeComponent";
import AllLogin from "../LoginComponent";
import Dashboard from "../DashboardComponent";
import {SchoolComponent, AdminAdmissionSelection} from "../AdminComponents";
import MeetTheDeveloperComponent from "../MeetTheDeveloperComponent";
import Page404Component from "../Page404Component";
import {
    AdmissionHome,
    AdmissionNew,
    AdmissionNewDone,
    AdmissionExisting,
    AdmissionAllDone,
    AdmissionProgress,
    AdmissionStop
} from "../AdmissionComponents";

const RouterComponent = () => {
    const admissionOn = false;

    return (
        <Router basename={'/portal'}>
            <Switch>
                <Route path={HOME} component={Home} exact/>

                <Route path={ADMISSION_HOME} component={AdmissionHome} exact/>
                {admissionOn ? (
                    <Route path={ADMISSION_NEW} component={AdmissionNew} exact/>
                ) : (
                    <Route path={ADMISSION_NEW} component={AdmissionStop} exact/>
                )}
                <Route path={ADMISSION_NEW_DONE} component={AdmissionNewDone} exact/>
                <Route path={ADMISSION_EXISTING} component={AdmissionExisting} exact/>
                <Route path={ADMISSION_ALL_DONE} component={AdmissionAllDone} exact/>
                <PrivateRoute path={ADMISSION_PROGRESS_ROUTE} Component={AdmissionProgress} loginPath={ADMISSION_NEW}
                              exact/>

                <Route path={LOGIN} component={AllLogin} exact/>
                <PrivateRoute path={DASHBOARD} Component={Dashboard} loginPath={LOGIN} exact/>
                <PrivateRoute path={ADMIN_ADMISSION_SELECTION} Component={AdminAdmissionSelection} loginPath={LOGIN}
                              exact/>
                <Route path={ADMIN_MANAGE_SCHOOL} component={SchoolComponent} exact/>
                <Route path={MEET_THE_DEVS} component={MeetTheDeveloperComponent} exact/>
                <Route path='*' exact={true} component={Page404Component}/>
            </Switch>
        </Router>
    )
}

export default RouterComponent