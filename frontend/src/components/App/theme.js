import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import lightBlue from "@material-ui/core/colors/lightBlue";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: lightBlue[400],
        }
    },
});

export default theme