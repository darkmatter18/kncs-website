import React from 'react';
import { AuthProvider } from 'jwt-auth-react'
import { CssBaseline } from '@material-ui/core';
import RouteComponent from './routes';

const App = () => (
    <React.Fragment>
        <AuthProvider>
            <CssBaseline />
            <RouteComponent />
        </AuthProvider>
    </React.Fragment>
);

export default App;