import React from 'react';
import { AuthProvider } from 'react-auth-jwt'
import { CssBaseline } from '@material-ui/core';
import RouteComponent from './routes';

const App = () => (
    <React.Fragment>
        <AuthProvider authCookieName={"_a"}
                      authTimeCookieName={"_at"}
                      stateCookieName={"_s"}
                      cookieDomain={window.location.hostname}
                      cookieSecure={window.location.protocol === "https:"}>
            <CssBaseline />
            <RouteComponent />
        </AuthProvider>
    </React.Fragment>
);

export default App;