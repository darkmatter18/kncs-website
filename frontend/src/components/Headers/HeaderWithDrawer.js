import React from "react"
import Header from "./BasicHeader";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {makeStyles} from "@material-ui/styles";
import Toolbar from "@material-ui/core/Toolbar";

const drawerWidth = 240;

const useStyles = makeStyles((theme)=>({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}))

const HeaderWithDrawer = ({rightLinks, drawerElements}) => {
    const classes = useStyles()
    const [menuAnchor, setMenuAnchor] = React.useState(false)

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMenuAnchor(() => open)
    }

    return (
        <React.Fragment>
            <Header leftMenuClickListener={toggleDrawer(true)} rightLinks={rightLinks}/>
            <SwipeableDrawer
                anchor={"left"}
                open={menuAnchor}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                {drawerElements}
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default HeaderWithDrawer