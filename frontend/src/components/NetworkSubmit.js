import React from "react";
import Button from "@material-ui/core/Button";
import {buttonType, netState} from "../constant";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Done, NavigateNext, Search} from "@material-ui/icons";

const NetworkSubmit = ({buttonStyle, handleSubmit, networkState}) => {
    if (networkState === netState.IDLE || networkState === netState.ERROR) {
        if (buttonStyle === buttonType.SAVE_NEXT){
            return (
                <Button variant={"outlined"} color={"primary"} onClick={handleSubmit} endIcon={<NavigateNext/>}>
                    Save & Next
                </Button>
            )
        } else if (buttonStyle === buttonType.SEARCH){
            return (
                <Button variant={"outlined"} color={"primary"} onClick={handleSubmit} startIcon={<Search/>}>
                    Search
                </Button>
            )
        } else if (buttonStyle === buttonType.SUBMIT){
            return (
                <Button variant={"outlined"} color={"primary"} onClick={handleSubmit} endIcon={<Done/>}>
                    submit
                </Button>
            )
        } else{
            return (
                <Button variant={"outlined"} color={"primary"} onClick={handleSubmit} endIcon={<NavigateNext/>}>
                    Save & Next
                </Button>
            )
        }
    } else if (networkState === netState.BUSY) {
        return (
            <Button disabled variant={"outlined"} color={"primary"} startIcon={<CircularProgress size={20}/>}>
                Submitting
            </Button>
        )
    }
}

export default NetworkSubmit