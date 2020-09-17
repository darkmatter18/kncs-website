import React from "react";
import {Header} from "../../lib/HeaderComponents";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAuthUser, useSignOut} from "react-auth-kit";

const DashboardHeader = () => {
    const signOut = useSignOut()
    const authUser = useAuthUser()
    const {first_name, last_name} = authUser()

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