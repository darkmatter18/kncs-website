import React from "react";
import Grid from "@material-ui/core/Grid";
import {ClassRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import api from "../../../api";
import {ADMIN_SCHOOL_CLASS} from "../../../constant";
import {useAuthHeader} from "react-auth-jwt";

const Classes = () => {
    
    const authHeader =useAuthHeader()
    const [classData, setClassData] = React.useState([])

    React.useEffect(()=> {
        api.get(ADMIN_SCHOOL_CLASS,{
            headers: {
                Authorization: authHeader()
            }
        }).then((res)=>{
            if (res.data.status) {
                console.log(res.data.data)
                setClassData(() => res.data.data)
            } else {
                console.error(res.data.error)
            }
        }).catch((e) => {
            console.error(e)
        })
        // eslint-disable-next-line
    },[])

    return (
        <React.Fragment>
            <MaterialTable
                columns={[
                    {title: "Standard", field: "standard", type: "string"},
                    {title: "Section", field: "section", type: "string"}
                ]}
                data={classData}
                isLoading={classData.length === 0}
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