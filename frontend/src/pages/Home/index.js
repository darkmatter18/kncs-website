import React from 'react';
import HomeTopBar from '../../components/HomeTopBar';
import {Redirect} from "react-router-dom";
import {ADMISSION_HOME} from "../../routes/route";

class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Redirect  to={ADMISSION_HOME}/>
            </React.Fragment>
        )
    }
}

export default Home;