import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HOME } from './route';

import Home from '../pages/Home';


const RouteComponent = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={HOME} exact component={Home} />
                    {/* <Route path="*" component={}/> 404 */}
                </Switch>
            </Router>
        </div>
    )
}

export default RouteComponent;