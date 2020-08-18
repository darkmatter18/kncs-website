import React from "react";
import Drawer from "@material-ui/core/Drawer";
import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";
import {Toolbar} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
}))

const MiniInternalDrawer = ({miniDrawerElements}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        console.log("Open");
        setOpen(true);
    };

    const handleDrawerClose = () => {
        console.log("Close");
        setOpen(false);
    };


    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }, classes.paper ),
            }}
            onMouseEnter={() => handleDrawerOpen()}
            onMouseDown={() => handleDrawerClose()}
            onMouseLeave={() => handleDrawerClose()}
        >
            <Toolbar/>
            {miniDrawerElements}
        </Drawer>
    )
}

export default MiniInternalDrawer