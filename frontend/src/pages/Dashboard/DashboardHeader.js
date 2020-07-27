import React from "react";
import Header from "../../components/Header";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useSignOut} from "react-auth-jwt";

const DashboardHeader = () => {
    const signOut = useSignOut()
    const nameInitial ="AB"
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
            <Header links={headerLinks}/>
        </React.Fragment>
    )
}

export default DashboardHeader