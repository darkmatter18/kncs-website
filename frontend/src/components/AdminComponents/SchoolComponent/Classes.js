import React from "react";
import Grid from "@material-ui/core/Grid";
import {ClassRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import {useAuthHeader} from "react-auth-jwt";
import {classApi} from "./api";

const Classes = () => {

    const authHeader = useAuthHeader()
    const [classData, setClassData] = React.useState([])

    React.useEffect(() => {
        classApi({
            headers: {
                Authorization: authHeader()
            }
        }).then((res) => {
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
    }, [])


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
                    onRowAdd: async newData => {
                        console.log(newData)
                        const res = await classApi.post('', newData,
                            {headers: {Authorization: authHeader()}})
                        if(res.statusText === '200'){
                            setClassData(res.data.data)
                        }
                        else {
                            //TODO: Handle Error
                        }
                    },
                    onRowUpdate: async newData => {
                        console.log(newData)
                        const res = await classApi.put(`/${newData.id}`, newData,
                            {headers: {Authorization: authHeader()}})
                        if(res.statusText === '200'){
                            setClassData(res.data.data)
                        }
                        else {
                            //TODO: Handle Error
                        }
                    },
                    onRowDelete: async oldData => {
                        console.log(oldData)
                        const res = await classApi.delete(`/${oldData.id}`,
                            {headers: {Authorization: authHeader()}})
                        if(res.statusText === '200'){
                            setClassData(res.data.data)
                        }
                        else {
                            //TODO: Handle Error
                        }
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