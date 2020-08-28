import React from "react";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import {SubjectRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

const Subjects = () => {
    // eslint-disable-next-line
    const [subjectData, setSubjectData] = React.useState([])
    return (
        <React.Fragment>
            <MaterialTable
                columns={[
                    {title: "Subjects", field: "subject", type: "string"},
                ]}
                data={subjectData}
                options={{
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30]
                }}
                editable={{
                    onRowAdd: newData => {
                        console.log(newData)
                    },
                    onRowUpdate: newData => {
                        console.log(newData)
                    },
                    onRowDelete: oldData => {
                        console.log(oldData)
                    }
                }}
                title={(<Grid container alignItems={"center"}>
                        <Grid item>
                            <SubjectRounded/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" component="h2">
                                Subjects
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            />
        </React.Fragment>
    )
}

export default Subjects