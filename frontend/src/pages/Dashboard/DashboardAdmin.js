import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Dashboard, Group, PersonAdd} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {useHistory} from 'react-router-dom'
import {ADMIN_ADMISSION_SELECTION} from "../../routes/route";

const useStyles = makeStyles((theme) => ({
    divider: {
        marginBottom: theme.spacing(2),
    },
    listColor: {
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main
    },
}))

const DashboardAdmin = () => {
    const classes = useStyles()
    const history = useHistory()

    const onClickEvent = (url) => () => {
        history.push(url)
    }
    return (
        <React.Fragment>
            <Container>
                <Grid container spacing={4}>
                    <Grid item md={7} sm={12} xs={12}>
                        <Card variant={"outlined"}>
                            <CardContent>
                                <Grid container alignItems={"center"} className={classes.divider}>
                                    <Grid item>
                                        <Dashboard/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5" component="h2">
                                            Dashboard
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Typography variant="h6" component="h6">
                                            Admission
                                        </Typography>
                                        <Divider className={classes.divider}/>
                                        <List>
                                            <ListItem button onClick={onClickEvent(ADMIN_ADMISSION_SELECTION)}>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.listColor}>
                                                        <PersonAdd />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Admission Selection"/>
                                            </ListItem>
                                            <Divider />
                                            <ListItem button>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.listColor}>
                                                        <Group />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Admission Selected"/>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12}>

                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <Card variant={"outlined"}>
                            <CardContent>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default DashboardAdmin