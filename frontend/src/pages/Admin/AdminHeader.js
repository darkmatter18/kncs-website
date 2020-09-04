import React from "react"
import {makeStyles} from "@material-ui/styles";
import HeaderWithDrawer from "../../lib/HeaderComponents/HeaderWithDrawer";
import {useAuth, useSignOut} from "react-auth-jwt";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {Divider, List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import {HomeOutlined, Person, PersonAdd} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const useStyles = makeStyles(() => ({
    list: {
        width: 250,
    },
}))

const AdminHeader = () => {
    const classes = useStyles()
    const signOut = useSignOut()
    // eslint-disable-next-line
    const auth = useAuth()
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

    const drawerElement = (
        <div className={classes.list}>
            <List>
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar className={classes.listColor}>
                            <HomeOutlined/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Home"} />
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar className={classes.listColor}>
                            <PersonAdd />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Admission Selection"/>
                </ListItem>
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar className={classes.listColor}>
                            <Person />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Student Database"/>
                </ListItem>
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar className={classes.listColor}>
                            <Person/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Teacher Database"/>
                </ListItem>
            </List>
        </div>
    )

    return (
        <React.Fragment>
            <HeaderWithDrawer rightLinks={headerLinks} drawerElements={drawerElement}/>
        </React.Fragment>
    )
}

export default AdminHeader