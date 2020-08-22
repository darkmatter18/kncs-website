import React from "react";
import Grid from "@material-ui/core/Grid";
import {ClassRounded, TableChart} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";
import EnhancedTableToolbar from "../../../components/EnhancedTableToolbar";
import {Table, TableContainer, TableHead, TableRow} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme)=> ({

}))

const Classes = () => {
    const classes = useStyles()
    const [selected, setSelected] = React.useState([]);
    return (
        <React.Fragment>
            <Grid container alignItems={"center"}>
                <Grid item>
                    <ClassRounded/>
                </Grid>
                <Grid item>
                    <Typography variant="h5" component="h2">
                        Classes
                    </Typography>
                </Grid>
            </Grid>

            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="classes"
                    size={"medium"}
                    aria-label="classes table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Class
                            </TableCell>
                            <TableCell>
                                Section
                            </TableCell>
                            <TableCell>
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default Classes