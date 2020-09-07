import React from "react";
import Grid from "@material-ui/core/Grid";
import {ClassRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import {useAuthHeader} from "react-auth-jwt";
import {classApi} from "./api";
import {useAxiosNetworkError} from "../../../context/NetworkError";

const Classes = () => {

    const authHeader = useAuthHeader()
    const axiosNetworkError = useAxiosNetworkError()
    const [classData, setClassData] = React.useState([])

    React.useEffect(() => {
        const networkRequest = async () => {
            try {
                const res = await classApi({headers: {Authorization: authHeader()}})
                if (res.status === 200) {
                    console.log(res.data.data)
                    setClassData(() => res.data.data)
                }
            } catch (e) {
                axiosNetworkError(e)
            }
        }
        networkRequest()
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
                        try {
                            const res = await classApi.post('', newData,
                                {headers: {Authorization: authHeader()}})
                            if (res.status === 200) {
                                setClassData(() => res.data.data)
                            }
                        } catch (error) {
                            axiosNetworkError(error)
                        }
                    },
                    onRowUpdate: async newData => {
                        console.log(newData)
                        try {
                            const res = await classApi.put(`/${newData.id}`, newData,
                                {headers: {Authorization: authHeader()}})
                            if (res.status === 200) {
                                setClassData(() => res.data.data)
                            }
                        } catch (error) {
                            axiosNetworkError(error)
                        }
                    },
                    onRowDelete: async oldData => {
                        console.log(oldData)
                        try {
                            const res = await classApi.delete(`/${oldData.id}`,
                                {headers: {Authorization: authHeader()}})
                            if (res.status === 200) {
                                setClassData(() => res.data.data)
                            }
                        } catch (error) {
                            axiosNetworkError(error)
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