import React from 'react';
import { AuthProvider } from 'react-auth-jwt'
import { CssBaseline } from '@material-ui/core';
import RouteComponent from './routes';

const App = () => (
    <React.Fragment>
        <AuthProvider cookieName={"admissionAuth"}>
            <CssBaseline />
            <RouteComponent />
        </AuthProvider>
    </React.Fragment>
);

export default App;