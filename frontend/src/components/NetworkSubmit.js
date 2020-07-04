import React from "react";
import Button from "@material-ui/core/Button";
import {netState} from "../constant";
import CircularProgress from "@material-ui/core/CircularProgress";

const NetworkSubmit = ({handleSubmit, networkState}) => {
    if (networkState === netState.IDLE || networkState === netState.ERROR) {
        return (
            <Button variant={"outlined"} color={"primary"} onClick={handleSubmit}>
                submit
            </Button>
        )
    } else if (networkState === netState.BUSY) {
        return (
            <Button disabled variant={"outlined"} color={"primary"} startIcon={<CircularProgress size={20}/>}>
                Submitting
            </Button>
        )
    }
}

export default NetworkSubmit