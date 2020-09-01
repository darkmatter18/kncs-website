import React from "react";
import Header from "../Headers/BasicHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useAuth, useSignOut} from "react-auth-jwt";

const DashboardHeader = () => {
    const signOut = useSignOut()
    const auth = useAuth()
    const {first_name, last_name} = auth().authState
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

    return (
        <React.Fragment>
            <Header rightLinks={headerLinks}/>
        </React.Fragment>
    )
}

export default DashboardHeader