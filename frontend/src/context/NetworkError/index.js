import React, {useContext} from "react";
import PropTypes from 'prop-types';
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";

const ErrorContext = React.createContext(null);

const ErrorProvider = ({children}) => {
    const [error, setError] = React.useState(null)

    const onCloseEvent = () => {
        setError(null)
    }

    return (
        <React.Fragment>
            <ErrorContext.Provider value={{error, setError}}>
                {children}
                {error && (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        open={!!error}
                        autoHideDuration={6000}
                        onClose={onCloseEvent}
                        action={
                            <React.Fragment>
                                <Button color="secondary" size="small" onClick={()=> window.location.reload()}>
                                    Reload
                                </Button>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={onCloseEvent}>
                                    <Close fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                        message={error}
                    >
                    </Snackbar>
                )}
            </ErrorContext.Provider>
        </React.Fragment>
    )
}

ErrorProvider.propTypes = {
    children: PropTypes.node.isRequired
}

const useError = () => {
    const c = useContext(ErrorContext)
    return (errorMessage) => {
        c.setError(errorMessage)
    }
}

const useAxiosNetworkError = () => {
    const c = useContext(ErrorContext)
    return (axiosCatch) => {
        if (axiosCatch.response) {
            c.setError(`${axiosCatch.response.status} - ${axiosCatch.response.statusText}`)
        } else if (axiosCatch.request) {
            c.setError(axiosCatch.request)
        } else {
            c.setError(axiosCatch.message)
        }
    }
}

export {ErrorProvider, useError, useAxiosNetworkError}