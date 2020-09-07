import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Done, NavigateNext, Search} from "@material-ui/icons";
import PropTypes from "prop-types"
import {networkButtonTypes, networkStates} from "../../constant";

const NetworkButton = ({buttonStyle, handleSubmit, networkState, type, disabled}) => {

    if (networkState === networkStates.IDLE || networkState === networkStates.ERROR) {
        if (buttonStyle === networkButtonTypes.SAVE_NEXT){
            return (
                <Button disabled={disabled} type={type} onClick={handleSubmit} color={"primary"} variant={"outlined"} endIcon={<NavigateNext/>}>
                    Save & Next
                </Button>
            )
        } else if (buttonStyle === networkButtonTypes.SEARCH){
            return (
                <Button disabled={disabled} type={type} onClick={handleSubmit} color={"primary"} variant={"outlined"} startIcon={<Search/>}>
                    Search
                </Button>
            )
        } else if (buttonStyle === networkButtonTypes.SUBMIT){
            return (
                <Button disabled={disabled} type={type} onClick={handleSubmit} color={"primary"} variant={"outlined"} endIcon={<Done/>}>
                    submit
                </Button>
            )
        } else{
            return (
                <Button disabled={disabled} type={type} onClick={handleSubmit} variant={"outlined"} color={"primary"} endIcon={<NavigateNext/>}>
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
    type: PropTypes.oneOf(["submit", "reset", "button"]),
    disabled: PropTypes.bool
}

export default NetworkButton
