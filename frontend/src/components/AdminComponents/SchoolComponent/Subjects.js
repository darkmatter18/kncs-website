import React from "react";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import {SubjectRounded} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {ADMIN_SCHOOL_CLASS} from "../../../constant";
import {useAuthHeader} from "react-auth-jwt";
import {Api} from "../../../api";

const Subjects = () => {

    const authHeader = useAuthHeader()
    const [subjectData, setSubjectData] = React.useState([])

    React.useEffect(()=> {
        Api.get(ADMIN_SCHOOL_CLASS,{
            headers: {
                Authorization: authHeader()
            }
        }).then((res)=>{
            if (res.data.status) {
                console.log(res.data.data)
                setSubjectData(() => res.data.data)
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
                    {title: "Subjects", field: "subject", type: "string"},
                ]}
                data={subjectData}
                isLoading={subjectData.length === 0}
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