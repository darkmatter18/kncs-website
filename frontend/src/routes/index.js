import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const RouteComponent = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={} exact component={} />
                    <Route path={} exact component={} />
                    {/* <Route path="*" component={}/> 404 */}
                </Switch>
            </Router>
        </div>
    )
}

export default RouteComponent;