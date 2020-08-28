import React from "react";
import Grid from "@material-ui/core/Grid";
import {ClassRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";


const Classes = () => {
    // eslint-disable-next-line
    const [classData, setClassData] = React.useState([])
    return (
        <React.Fragment>
            <MaterialTable
                columns={[
                    {title: "Standard", field: "standard", type: "string"},
                    {title: "Section", field: "section", type: "string"}
                ]}
                data={classData}
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
                            <ClassRounded/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" component="h2">
                                Classes
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            />
        </React.Fragment>
    )
}

export default Classes