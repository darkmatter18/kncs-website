import React from "react"
import Header from "./BasicHeader";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const HeaderWithDrawer = ({rightLinks, drawerElements}) => {
    const [menuAnchor, setMenuAnchor] = React.useState(false)


    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMenuAnchor(() => open)
    }

    return (
        <React.Fragment>
            <Header leftMenuClickListener={toggleDrawer(true)} rightLinks={rightLinks}/>
            <SwipeableDrawer
                anchor={"left"}
                open={menuAnchor}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {drawerElements}
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default HeaderWithDrawer