import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HOME, ADMIN_DASHBOARD, TEACHER_DASHBOARD, STUDENT_DASHBOARD } from './route';

import Home from '../pages/Home';

import Dashboard from '../pages/Dashboard';
import { PrivateRoute } from 'jwt-auth-react';


const RouteComponent = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={HOME} exact component={Home} />
                    <PrivateRoute component={Dashboard} path={ADMIN_DASHBOARD} loginPath={HOME} exact />
                    <PrivateRoute component={Dashboard} path={TEACHER_DASHBOARD} loginPath={HOME} exact />
                    <PrivateRoute component={Dashboard} path={STUDENT_DASHBOARD} loginPath={HOME} exact />
               {/* <Route path="*" component={}/> 404 */}
                </Switch>
            </Router>
        </div>
    )
}

export default RouteComponent;