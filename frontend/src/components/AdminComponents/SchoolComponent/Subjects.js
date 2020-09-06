import React from "react";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import {SubjectRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {useAuthHeader} from "react-auth-jwt";
import {schoolApi} from "./api";
import {useAxiosNetworkError} from "../../../context/NetworkError";

const Subjects = () => {

    const authHeader = useAuthHeader()
    const axiosNetworkError = useAxiosNetworkError()
    const [subjectData, setSubjectData] = React.useState([])

    React.useEffect(() => {
        const networkRequest = async () => {
            try {
                const res = await schoolApi({headers: {Authorization: authHeader()}})
                if (res.status === 200) {
                    console.log(res.data.data)
                    setSubjectData(() => res.data.data)
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
                    {title: "Subjects", field: "subject", type: "string"},
                ]}
                data={subjectData}
                isLoading={subjectData.length === 0}
                options={{
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 30]
                }}
                editable={{
                    onRowAdd: async newData => {
                        console.log(newData)
                        try {
                            const res = await schoolApi.post('', newData,
                                {headers: {Authorization: authHeader()}})
                            if (res.status === 200) {
                                setSubjectData(() => res.data.data)
                            }
                        } catch (error) {
                            axiosNetworkError(error)
                        }
                    },
                    onRowUpdate: async newData => {
                        console.log(newData)
                        try {
                            const res = await schoolApi.put(`/${newData.id}`, newData,
                                {headers: {Authorization: authHeader()}})
                            if (res.status === 200) {
                                setSubjectData(() => res.data.data)
                            }
                        } catch (error) {
                            axiosNetworkError(error)
                        }
                    },
                    onRowDelete: async oldData => {
                        console.log(oldData)
                        try {
                            const res = await schoolApi.delete(`/${oldData.id}`,
                                {headers: {Authorization: authHeader()}})
                            if (res.status === 200) {
                                setSubjectData(() => res.data.data)
                            }
                        } catch (error) {
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