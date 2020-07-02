import React from "react";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as banner from './banner.png'

const useStyle = makeStyles((theme)=> ({
    header: {
        height: '6.5rem',
        borderBottom: `1px solid #000000`,
        marginBottom: theme.spacing(6)
    },
    bannerImage: {
        maxWidth: '25rem',
        maxHeight: '6.25rem'
    }
}))

const Header = () => {
    const classes = useStyle()
    return (
        <header className={classes.header}>
            <Container>
                <img src={banner} alt={"College Banner"} className={classes.bannerImage}/>
            </Container>
        </header>
    )
}

export default Header