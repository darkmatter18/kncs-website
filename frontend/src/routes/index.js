import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {PrivateRoute} from 'jwt-auth-react';

import {
    HOME,
    ADMIN_DASHBOARD,
    TEACHER_DASHBOARD,
    STUDENT_DASHBOARD,
    ADMISSION_HOME,
    ADMISSION_NEW,
    ADMISSION_EXISTING, ADMISSION_NEW_DONE, ADMISSION_PROGRESS_ROUTE
} from './route';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import AdmissionHome from '../pages/AdmissionHome';
import AdmissionNew from "../pages/AdmissionNew";
import AdmissionExisting from "../pages/AdmissionExisting";
import AdmissionNewDone from "../pages/AdmissionNewDone";
import AdmissionProgress from "../pages/AdmissionProgress";


const RouteComponent = () => {
    return (
        <Router basename={'/portal'}>
            <Switch>
                <Route path={HOME} component={Home} exact/>
                <Route path={ADMISSION_HOME} component={AdmissionHome} exact/>
                <Route path={ADMISSION_NEW} component={AdmissionNew} exact/>
                <Route path={ADMISSION_NEW_DONE} component={AdmissionNewDone} exact/>
                <Route path={ADMISSION_EXISTING} component={AdmissionExisting} exact/>
                <Route path={ADMISSION_PROGRESS_ROUTE} component={AdmissionProgress} exact/>
                <PrivateRoute component={Dashboard} path={ADMIN_DASHBOARD} loginPath={HOME} exact/>
                <PrivateRoute component={Dashboard} path={TEACHER_DASHBOARD} loginPath={HOME} exact/>
                <PrivateRoute component={Dashboard} path={STUDENT_DASHBOARD} loginPath={HOME} exact/>
                {/* <Route path="*" component={}/> 404 */}
            </Switch>
        </Router>
    )
}

export default RouteComponent;