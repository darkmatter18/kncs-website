import React from 'react';
import {AuthProvider} from 'react-auth-kit'
import {CssBaseline} from '@material-ui/core';
import RouteComponent from './../RouterComponent';
import {ThemeProvider} from "@material-ui/styles";
import theme from "./theme";
import {ErrorProvider} from "../../context/NetworkError";
import {AppSettingsProvider} from "../../context/AppSettings";

const App = () => (
    <React.Fragment>
        <ThemeProvider theme={theme}>
            <AppSettingsProvider>
                <AuthProvider authStorageType={"cookie"}
                              cookieDomain={window.location.hostname}
                              cookieSecure={window.location.protocol === "https:"}>
                    <CssBaseline/>
                    <ErrorProvider>
                        <RouteComponent/>
                    </ErrorProvider>
                </AuthProvider>
            </AppSettingsProvider>
        </ThemeProvider>
    </React.Fragment>
)

export default App;
