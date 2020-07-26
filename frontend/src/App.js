import React from 'react';
import { AuthProvider } from 'react-auth-jwt'
import { CssBaseline } from '@material-ui/core';
import RouteComponent from './routes';
import {ThemeProvider} from "@material-ui/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: lightBlue[400],
        }
    },
});

const App = () => (
    <React.Fragment>
        <ThemeProvider theme={theme}>
            <AuthProvider authCookieName={"_a"}
                          authTimeCookieName={"_at"}
                          stateCookieName={"_s"}
                          cookieDomain={window.location.hostname}
                          cookieSecure={window.location.protocol === "https:"}>
                <CssBaseline />
                <RouteComponent />
            </AuthProvider>
        </ThemeProvider>
    </React.Fragment>
);

export default App;