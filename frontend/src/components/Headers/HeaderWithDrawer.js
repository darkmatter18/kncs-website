import React from "react"
import Header from "./BasicHeader";
import {useAuth, useSignOut} from "react-auth-jwt";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const HeaderWithDrawer = () => {
    const signOut = useSignOut()
    const auth = useAuth()
    const [menuAnchor, setMenuAnchor] = React.useState(false)

    //const {first_name, last_name} = auth().authState
    const first_name = "A"
    const last_name = "B"
    const nameInitial = first_name.charAt(0).toUpperCase() + last_name.charAt(0).toUpperCase()
    const headerLinks = [
        (
            <Avatar>{nameInitial}</Avatar>
        ),
        (
            <IconButton onClick={() => signOut()} aria-label="show 17 new notifications" color="inherit">
                <ExitToAppIcon/>
            </IconButton>
        )
    ]

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMenuAnchor(() => open)
    }

    return (
        <React.Fragment>
            <Header leftMenuClickListener={toggleDrawer(true)} rightLinks={headerLinks}/>
            <SwipeableDrawer
                anchor={"left"}
                open={menuAnchor}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                Hello
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default HeaderWithDrawer