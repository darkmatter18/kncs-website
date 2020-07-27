import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {
    HOME,
    ADMISSION_HOME,
    ADMISSION_NEW,
    ADMISSION_EXISTING,
    ADMISSION_NEW_DONE,
    ADMISSION_PROGRESS_ROUTE,
    ADMISSION_ALL_DONE,
    MEET_THE_DEVS,
    LOGIN, DASHBOARD, ADMIN_ADMISSION_SELECTION
} from './route';

import Home from '../pages/Home';
import AdmissionHome from '../pages/Admission/AdmissionHome';
import AdmissionNew from "../pages/Admission/AdmissionNew";
import AdmissionExisting from "../pages/Admission/AdmissionExisting";
import AdmissionNewDone from "../pages/Admission/AdmissionNewDone";
import AdmissionProgress from "../pages/Admission/AdmissionProgress";
import {PrivateRoute} from "react-auth-jwt";
import Page404 from "../pages/Page404";
import AdmissionAllDone from "../pages/Admission/AdmissionAllDone";
import MeetTheDevelopers from "../pages/MeetTheDevelopers";
import AllLogin from "../pages/Login";
import Dashboard from "../pages/Dashboard";


const RouteComponent = () => {
    return (
        <Router basename={'/portal'}>
            <Switch>
                <Route path={HOME} component={Home} exact/>

                <Route path={ADMISSION_HOME} component={AdmissionHome} exact/>
                <Route path={ADMISSION_NEW} component={AdmissionNew} exact/>
                <Route path={ADMISSION_NEW_DONE} component={AdmissionNewDone} exact/>
                <Route path={ADMISSION_EXISTING} component={AdmissionExisting} exact/>
                <Route path={ADMISSION_ALL_DONE} component={AdmissionAllDone} exact/>
                <PrivateRoute path={ADMISSION_PROGRESS_ROUTE} Component={AdmissionProgress} loginPath={ADMISSION_NEW} exact/>

                <Route path={LOGIN} component={AllLogin} exact/>
                <PrivateRoute path={DASHBOARD} Component={Dashboard} loginPath={LOGIN} exact/>
                <PrivateRoute path={ADMIN_ADMISSION_SELECTION} Component={Dashboard} loginPath={LOGIN} exact/>

                <Route path={MEET_THE_DEVS} component={MeetTheDevelopers} exact/>
                <Route path='*' exact={true} component={Page404} />
            </Switch>
        </Router>
    )
}

export default RouteComponent;