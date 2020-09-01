import React from "react";
import {CardContent, Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {
    DashboardRounded,
    Group,
    NotificationsRounded,
    PersonAdd,
    ViewListRounded
} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
    divider: {
        marginBottom: theme.spacing(2),
    },
    listColor: {
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main
    }
}))

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Monday', 159, 6.0, 24, 4.0),
    createData('Tuesday', 237, 9.0, 37, 4.3),
    createData('Wednesday', 262, 16.0, 24, 6.0),
    createData('Thursday', 305, 3.7, 67, 4.3),
    createData('Friday', 356, 16.0, 49, 3.9),
    createData('Saturday', 356, 16.0, 49, 3.9),
];

const DashboardStudent = () => {
    const classes = useStyles()

    /**
     * Notification Schema:
     * {id: (int) notice_id, title: (string) notice_title, description: (string)notice_description }
     */
    // eslint-disable-next-line
    const [notices, setNotices] = React.useState(null)


    return (
        <React.Fragment>
            <Container>
                <Card variant={"outlined"} className={classes.divider}>
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid item md={7} sm={12} xs={12}>
                                <Card variant={"outlined"}>
                                    <CardContent>
                                        <Grid container alignItems={"center"} className={classes.divider}>
                                            <Grid item>
                                                <DashboardRounded/>
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
                                                    <ListItem button>
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
                                                <Typography variant="h6" component="h6">
                                                    Admission
                                                </Typography>
                                                <Divider className={classes.divider}/>
                                                <List>
                                                    <ListItem button>
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
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={5} sm={12} xs={12}>
                                <Card variant={"outlined"}>
                                    <CardContent>
                                        <Grid container alignItems={"center"} className={classes.divider}>
                                            <Grid item>
                                                <NotificationsRounded/>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h5" component="h2">
                                                    Notification
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider/>
                                        {notices ? (
                                            <List>
                                                {notices.map((notice)=> (
                                                    <React.Fragment>
                                                        <ListItem button key={notice.id}>
                                                            <ListItemText
                                                                primary={notice.title}
                                                                secondary={notice.description}/>
                                                        </ListItem>
                                                        <Divider />
                                                    </React.Fragment>
                                                ))}
                                            </List>
                                        ) : (
                                            <React.Fragment>
                                                <Skeleton height={60}/>
                                                <Skeleton height={60}/>
                                                <Skeleton height={60}/>
                                            </React.Fragment>
                                        )}

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card variant={"outlined"}>
                    <CardContent>
                        <Grid container alignItems={"center"} className={classes.divider}>
                            <Grid item>
                                <ViewListRounded/>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" component="h2">
                                    Routine
                                </Typography>
                            </Grid>
                        </Grid>

                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="routine">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Day</TableCell>
                                        <TableCell align="right">1st Period</TableCell>
                                        <TableCell align="right">2nd Period</TableCell>
                                        <TableCell align="right">3rd Period</TableCell>
                                        <TableCell align="right">4th Period</TableCell>
                                        <TableCell align="right">5th Period</TableCell>
                                        <TableCell align="right">6th Period</TableCell>
                                        <TableCell align="right">7th Period</TableCell>
                                        <TableCell align="right">8th Period</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    )
}
export default DashboardStudent