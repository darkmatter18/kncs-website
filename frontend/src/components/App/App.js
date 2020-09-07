import React from 'react';
import { AuthProvider } from 'react-auth-jwt'
import { CssBaseline } from '@material-ui/core';
import RouteComponent from './../RouterComponent';
import {ThemeProvider} from "@material-ui/styles";
import theme from "./theme";
import {ErrorProvider} from "../../context/NetworkError";

const App = () => (
    <React.Fragment>
        <ThemeProvider theme={theme}>
            <AuthProvider authCookieName={"_a"}
                          authTimeCookieName={"_at"}
                          stateCookieName={"_s"}
                          cookieDomain={window.location.hostname}
                          cookieSecure={window.location.protocol === "https:"}>
                <CssBaseline />
                <ErrorProvider>
                    <RouteComponent />
                </ErrorProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.Fragment>
);

export default App;