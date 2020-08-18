import React from "react"
import {makeStyles} from "@material-ui/styles";
import MiniInternalDrawer from "../../../components/MiniInternalDrawer";
import HeaderWithDrawer from "../../../components/Headers/HeaderWithDrawer";

const useStyles = makeStyles((theme) => ({

}))

const School = () => {

    return (
        <React.Fragment>
            <HeaderWithDrawer/>
            <main>
                <MiniInternalDrawer/>
            </main>
        </React.Fragment>
    )
}

export default School