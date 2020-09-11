import React from "react";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import {SubjectRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {useAuthHeader} from "react-auth-kit";
import {schoolApi} from "./api";
import {useAxiosNetworkError} from "../../../context/NetworkError";

const Subjects = () => {

    const authHeader = useAuthHeader()
    const axiosNetworkError = useAxiosNetworkError()
    const [subjectData, setSubjectData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        const networkRequest = async () => {
            try {
                setIsLoading(true)
                const res = await schoolApi({headers: {Authorization: authHeader()}})
                setIsLoading(false)
                if (res.status === 200) {
                    setSubjectData(() => res.data.data)
                }
                if (res.status === 204) {
                    console.log("Empty Subjects")
                    setSubjectData(() => [])
                }
            } catch (e) {
                setIsLoading(false)
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
                    {title: "Subjects", field: "subject_name", type: "string"},
                ]}
                data={subjectData}
                isLoading={isLoading}
                options={{
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30]
                }}
                editable={{
                    onRowAdd: async newData => {
                        console.log(newData)
                        try {
                            setIsLoading(true)
                            const res = await schoolApi.post('', newData,
                                {headers: {Authorization: authHeader()}})
                            setIsLoading(false)
                            if (res.status === 200) {
                                setSubjectData(() => res.data.data)
                            }
                        } catch (error) {
                            setIsLoading(false)
                            axiosNetworkError(error)
                        }
                    },
                    onRowUpdate: async newData => {
                        console.log(newData)
                        try {
                            setIsLoading(true)
                            const res = await schoolApi.put(`/${newData.id}`, newData,
                                {headers: {Authorization: authHeader()}})
                            setIsLoading(false)
                            if (res.status === 200) {
                                setSubjectData(() => res.data.data)
                            }
                        } catch (error) {
                            setIsLoading(false)
                            axiosNetworkError(error)
                        }
                    },
                    onRowDelete: async oldData => {
                        console.log(oldData)
                        try {
                            setIsLoading(true)
                            const res = await schoolApi.delete(`/${oldData.id}`,
                                {headers: {Authorization: authHeader()}})
                            setIsLoading(false)
                            if (res.status === 200) {
                                setSubjectData(() => res.data.data)
                            }
                        } catch (error) {
                            setIsLoading(false)
                            axiosNetworkError(error)
                        }
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