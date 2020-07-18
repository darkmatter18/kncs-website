import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {
    HOME,
    ADMISSION_HOME,
    ADMISSION_NEW,
    ADMISSION_EXISTING, ADMISSION_NEW_DONE, ADMISSION_PROGRESS_ROUTE, ADMISSION_ALL_DONE
} from './route';

import Home from '../pages/Home';
import AdmissionHome from '../pages/AdmissionHome';
import AdmissionNew from "../pages/AdmissionNew";
import AdmissionExisting from "../pages/AdmissionExisting";
import AdmissionNewDone from "../pages/AdmissionNewDone";
import AdmissionProgress from "../pages/AdmissionProgress";
import {PrivateRoute} from "react-auth-jwt";
import Page404 from "../pages/Page404";
import AdmissionAllDone from "../pages/AdmissionAllDone";


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
                <Route path='*' exact={true} component={Page404} />
            </Switch>
        </Router>
    )
}

export default RouteComponent;