import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HOME, ADMIN_DASHBOARD, TEACHER_DASHBOARD, STUDENT_DASHBOARD } from './route';

import Home from '../pages/Home';
import { PrivateRoute } from 'jwt-auth-react';
import Dashboard from '../pages/Dashboard';


const RouteComponent = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={HOME} exact component={Home} />
                    <PrivateRoute path={ADMIN_DASHBOARD} component={Dashboard} login_path={HOME} />
                    <PrivateRoute path={TEACHER_DASHBOARD} component={Dashboard} login_path={HOME} />
                    <PrivateRoute path={STUDENT_DASHBOARD} component={Dashboard} login_path={HOME} />
                    {/* <Route path="*" component={}/> 404 */}
                </Switch>
            </Router>
        </div>
    )
}

export default RouteComponent;