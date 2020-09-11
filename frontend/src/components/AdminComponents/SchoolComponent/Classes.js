import React from "react";
import Grid from "@material-ui/core/Grid";
import {ClassRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import {useAuthHeader} from "react-auth-kit";
import {classApi} from "./api";
import {useAxiosNetworkError} from "../../../context/NetworkError";

const Classes = () => {

    const authHeader = useAuthHeader()
    const axiosNetworkError = useAxiosNetworkError()
    const [classData, setClassData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        const networkRequest = async () => {
            try {
                setIsLoading(true)
                const res = await classApi({headers: {Authorization: authHeader()}})
                setIsLoading(false)
                if (res.status === 200) {
                    console.log(res.data.data)
                    setClassData(() => res.data.data)
                }
            } catch (e) {
                axiosNetworkError(e)
                setIsLoading(false)
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
                isLoading={isLoading}
                editable={{
                    onRowAdd: async newData => {
                        console.log(newData)
                        try {
                            setIsLoading(true)
                            const res = await classApi.post('', newData,
                                {headers: {Authorization: authHeader()}})
                            setIsLoading(false)
                            if (res.status === 200) {
                                setClassData(() => res.data.data)
                            }
                        } catch (error) {
                            axiosNetworkError(error)
                            setIsLoading(false)
                        }
                    },
                    onRowUpdate: async newData => {
                        console.log(newData)
                        try {
                            setIsLoading(true)
                            const res = await classApi.put(`/${newData.id}`, newData,
                                {headers: {Authorization: authHeader()}})
                            setIsLoading(false)
                            if (res.status === 200) {
                                setClassData(() => res.data.data)
                            }
                        } catch (error) {
                            axiosNetworkError(error)
                            setIsLoading(false)
                        }
                    },
                    onRowDelete: async oldData => {
                        console.log(oldData)
                        try {
                            setIsLoading(true)
                            const res = await classApi.delete(`/${oldData.id}`,
                                {headers: {Authorization: authHeader()}})
                            setIsLoading(false)
                            if (res.status === 200) {
                                setClassData(() => res.data.data)
                            }
                        } catch (error) {
                            axiosNetworkError(error)
                            setIsLoading(false)
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