import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Done, NavigateNext, Search} from "@material-ui/icons";
import PropTypes from "prop-types"
import {networkButtonTypes, networkStates} from "../../constant";

const NetworkButton = ({buttonStyle, handleSubmit, networkState, type}) => {
    if (networkState === networkStates.IDLE || networkState === networkStates.ERROR) {
        if (buttonStyle === networkButtonTypes.SAVE_NEXT){
            return (
                <Button variant={"outlined"} type={type} color={"primary"} onClick={handleSubmit} endIcon={<NavigateNext/>}>
                    Save & Next
                </Button>
            )
        } else if (buttonStyle === networkButtonTypes.SEARCH){
            return (
                <Button variant={"outlined"} type={type} color={"primary"} onClick={handleSubmit} startIcon={<Search/>}>
                    Search
                </Button>
            )
        } else if (buttonStyle === networkButtonTypes.SUBMIT){
            return (
                <Button variant={"outlined"} type={type} color={"primary"} onClick={handleSubmit} endIcon={<Done/>}>
                    submit
                </Button>
            )
        } else{
            return (
                <Button variant={"outlined"} type={type} color={"primary"} onClick={handleSubmit} endIcon={<NavigateNext/>}>
                    Save & Next
                </Button>
            )
        }
    } else if (networkState === networkStates.BUSY) {
        return (
            <Button disabled variant={"outlined"} type={type} color={"primary"} startIcon={<CircularProgress size={20}/>}>
                Submitting
            </Button>
        )
    }
}

NetworkButton.propTypes = {
    buttonStyle: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    networkState: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["submit", "reset", "button"])
}

export default NetworkButton
