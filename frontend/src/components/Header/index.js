import React from "react";
import clsx from "clsx";
import {AppBar, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as banner from '../../assets/banner_new.jpg'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from '@material-ui/icons/MoreVert';
import {SCHOOL_NAME} from "../../constant";

const useStyle = makeStyles((theme) => ({
    header: {
        marginBottom: theme.spacing(6)
    },
    bannerImage: {
        maxWidth: '4rem',
        maxHeight: '4rem',
        marginRight: theme.spacing(4)
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    hearerText: {
        fontFamily: 'Raleway, sans-serif',
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

}))

const Header = ({links = []}) => {
    const classes = useStyle()
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const mobileMenuId = 'primary-header-menu-mobile';

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const renderDesktop = () => {
        return (
            <Grid container spacing={5} alignItems={"center"} className={classes.sectionDesktop}>
                {links.map((v, i)=>{
                    return (
                        <Grid item key={i}>
                            {v}
                        </Grid>
                    )
                })}
            </Grid>
        )
    }

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {links.map((v, i)=>{
                return (
                    <MenuItem key={i}>
                        {v}
                    </MenuItem>
                )
            })}
        </Menu>
    );


    return (
        <header className={classes.header}>
            <AppBar color={"primary"} position="fixed">
                <Toolbar className={classes.toolbar}>
                    <img src={banner} alt={"College Banner"} className={clsx(classes.bannerImage, classes.sectionDesktop)}/>
                    <Typography display={"inline"} variant="h5" color="inherit" noWrap
                                className={classes.hearerText}>
                        <b>{SCHOOL_NAME}</b>
                    </Typography>
                    <nav>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                        {renderDesktop()}
                        {renderMobileMenu}
                    </nav>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </header>
    )
}

export default Header