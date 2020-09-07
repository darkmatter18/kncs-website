import React from "react"
import {makeStyles} from "@material-ui/styles";
import {AdminHeader} from "../";
import {Container, Divider, List, Typography} from "@material-ui/core";
import MiniInternalDrawer from "../../../lib/HeaderComponents/MiniInternalDrawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ClassOutlined, SchoolRounded, SubjectOutlined} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import {useParams, useHistory} from "react-router-dom";
import Classes from "./Classes";
import {ADMIN_SCHOOL_ROUTES, ADMIN_SCHOOL_ROUTES_BASE} from "../../../constant";
import Subjects from "./Subjects";

const useStyles = makeStyles((theme) => ({
    content: {
        marginLeft: theme.spacing(15)
    },
    heading: {
        marginBottom: theme.spacing(6)
    }
}))

const SchoolComponent = () => {
    const classes = useStyles()
    const {school_route} = useParams()
    const history = useHistory()

    const miniDrawerElements = (
        <List>
            <ListItem>
                <ListItemIcon><SchoolRounded/></ListItemIcon>
                <ListItemText>
                    My School
                </ListItemText>
            </ListItem>
            <Divider/>
            <ListItem button onClick={()=> history.push(ADMIN_SCHOOL_ROUTES_BASE + "/" + ADMIN_SCHOOL_ROUTES[0])}>
                <ListItemIcon><ClassOutlined/></ListItemIcon>
                <ListItemText>
                    Classes
                </ListItemText>
            </ListItem>
            <ListItem button onClick={()=> history.push(ADMIN_SCHOOL_ROUTES_BASE + "/" + ADMIN_SCHOOL_ROUTES[1])}>
                <ListItemIcon><SubjectOutlined/></ListItemIcon>
                <ListItemText>
                    Subjects
                </ListItemText>
            </ListItem>
        </List>
    )

    const renderRoute = () => {
        console.log(school_route)
        switch (school_route) {
            case ADMIN_SCHOOL_ROUTES[0]:
                return <Classes/>

            case ADMIN_SCHOOL_ROUTES[1]:
                return <Subjects/>

            default:
                history.push(ADMIN_SCHOOL_ROUTES_BASE + "/" + ADMIN_SCHOOL_ROUTES[0])
        }
    }

    return (
        <React.Fragment>
            <AdminHeader/>
            <MiniInternalDrawer miniDrawerElements={miniDrawerElements}/>
            <main>
                <Container>
                    <Typography variant={"h4"} className={classes.heading}>
                        Manage My School
                    </Typography>
                    {renderRoute()}
                </Container>
            </main>
        </React.Fragment>
    )
}

export default SchoolComponent