import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {useHistory} from "react-router-dom";
import {ADMISSION_EXISTING, ADMISSION_NEW} from "../RouterComponent/routes";
import {Person, PersonAdd} from "@material-ui/icons";


const AdmissionNewExistingSwitch = ({routeId}) => {
    const history = useHistory()
    const actions = ['New', 'Existing']
    const [nav, setNav] = useState(routeId)

    const navChange = (e, newValue) => {
        console.log(newValue)
        setNav(newValue)
        if(newValue === 1){
            history.push(ADMISSION_EXISTING)
        }
        else {
            history.push(ADMISSION_NEW)
        }
    }

    return (
        <React.Fragment>
            <Container>
                <BottomNavigation value={nav} onChange={navChange} showLabels style={{maxWidth: '12rem'}}>
                    <BottomNavigationAction label={actions[0]} icon={<PersonAdd/>}/>
                    <BottomNavigationAction label={actions[1]} icon={<Person/>}/>
                </BottomNavigation>
            </Container>
        </React.Fragment>
    )
}

export default AdmissionNewExistingSwitch