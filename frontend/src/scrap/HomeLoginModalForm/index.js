import React from 'react';
import { TextField, Button, CircularProgress, withStyles } from '@material-ui/core';
import api from '../../api';

import { API_ROUTE_LOGIN } from "../../constant";

const theme = (theme) => ({
    progress: {
        top: '50%',
        left: '50%'
    },
    buttonDisabled: {
        backgroundColor: theme.palette.action.disabled
    }
})


class HomeLoginModalForm extends React.Component {
    state = {
        email: '',
        password: '',

        submitting: false,
        submitted: false,
        submitFailed: false,
    }

    handleChange = name => e => {
        e.preventDefault();
        this.setState({ ...this.state, [name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitting: true });
        this.submitRequest();
    }

    submitRequest = async () => {
        await api.post(API_ROUTE_LOGIN, {
            email: this.state.email,
            password: this.state.password
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                if (response.data.status === 'Y') {
                    this.setState({ submitted: true })
                }
            }
        }).catch((e) => {
            this.setState({ submitting: false, submitFailed: true })
        });
    }

    render() {
        const { email, password, submitting } = this.state;
        const { classes } = this.props;
        return (
            <React.Fragment>
                <form style={{ paddingTop: '1rem', paddingBottom: '2rem' }} onSubmit={this.handleSubmit}>
                    <TextField
                        required
                        fullWidth
                        type="email"
                        id="login-email"
                        label="E-Mail"
                        margin="dense"
                        name="login-email"
                        value={email}
                        onChange={this.handleChange('email')}
                    />
                    <TextField
                        required
                        fullWidth
                        type="password"
                        id="login-password"
                        label="Password"
                        margin="dense"
                        name="login-email"
                        value={password}
                        onChange={this.handleChange('password')}
                    />

                    <Button
                        type="submit"
                        style={{ float: 'right' }}
                        className={submitting ? classes.buttonDisabled : ''}
                        disabled={submitting}
                    >
                        {submitting ? <CircularProgress size={24} className={classes.progress} /> : 'Submit'}

                    </Button>
                </form>
            </React.Fragment>
        )
    }
}

export default withStyles(theme)(HomeLoginModalForm);