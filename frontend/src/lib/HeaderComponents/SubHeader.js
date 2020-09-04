import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme)=> ({
    subheader: {
        marginBottom: theme.spacing(3)
    },
    bar: {
        borderBottom: `2px solid #000000`,
        maxWidth: theme.spacing(8),
        marginBottom: theme.spacing(6)
    }
}))

const SubHeader = () => {
    const classes = useStyle()
    return (
        <React.Fragment>
            <Container>
                <Typography variant={"h4"} className={classes.subheader}>
                    KNCS Admission Portal
                </Typography>
                <div className={classes.bar}/>
            </Container>
        </React.Fragment>
    )
}

export default SubHeader