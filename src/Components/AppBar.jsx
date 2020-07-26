import React from 'react';
import { Link, fade, makeStyles, Menu, AppBar, MenuItem, Toolbar, IconButton, Badge, List, ListItem, Divider, ListItemText, ListItemIcon, useTheme } from '@material-ui/core';
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search'; 
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
// import Home from '@material-ui/icons/HomeRounded';
import Info from '@material-ui/icons/InfoRounded';
import MenuBook from '@material-ui/icons/MenuBookRounded';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import useScrollTrigger from '@material-ui/core/useScrollTrigger'; 
import { Link as RouterLink, useHistory } from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail'; 
import { ReactComponent as Q } from '../static/logo/q+.svg' 
import AssignmentIcon from '@material-ui/icons/Assignment';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import SaveIcon from '@material-ui/icons/Save';
import { boxColor } from '../config/config';

const drawerWidth = 240; 
const useStyles = makeStyles((theme) => ({ 

    appBar: { 
        background:  boxColor,
          zIndex: theme.zIndex.drawer + 1,

    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        padding: 0
    },
    title: {
        display: 'block',
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: " 'Oxygen',-apple-system, BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans- serif,Apple Color Emoji,Segoe UI Emoji, Segoe UI Symbol"

    },


    button: {
        borderRadius: '50%',
        padding: 9,
        background: boxColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
    },
    menu: {
        background: 'radial-gradient(at 100% 0%, #B71C1C 0%, #D32F2F 31%, #EF5350 69%, #F9A825 100%) 0% 0% no-repeat padding-box padding-box transparent',
        right: 16,
        left: 'auto !important'
    },



    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            //   width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
    },

}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const history = useHistory()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(!open);
    };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



    const handleProfileMenuOpen = (event) => {
        if (props.auth === true) {
            setAnchorEl(event.currentTarget);
        }
        if (props.auth === false) {
            history.push('/login')
        }
        if (props.auth === null) {
            setLoading(true)
        }

    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };


    const logout = () => {
        props.out()
    }


    return (
        <div className={classes.grow}>

            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        disableRipple
                        onClick={() => { history.push('/') }}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                    >
                        <SvgIcon style={{ height: 50, width: 50 }}>
                            <svg viewBox="0 0 485.075 485.076">
                                <defs>
                                    <clipPath id="clip-path">
                                        <rect id="Rectangle_760" data-name="Rectangle 760" width="343" height="343" rx="47" transform="translate(717 577.795) rotate(-45)" fill="#008c9e" />
                                    </clipPath>
                                    <radialGradient id="radial-gradient" cx="0.75" cy="0.017" r="1.105" gradientTransform="matrix(-0.18, 0.984, -2.541, -0.466, 0.928, -0.714)" gradientUnits="objectBoundingBox">
                                        <stop offset="0" stopColor="#64b4d2" />
                                        <stop offset="0.328" stopColor="#8167f2" />
                                        <stop offset="0.696" stopColor="#8a51e4" />
                                        <stop offset="1" stopColor="#8d3ddc" />
                                    </radialGradient>
                                </defs>
                                <g id="Group_8040" data-name="Group 8040" transform="translate(10807 15148)">
                                    <g id="Group_8036" data-name="Group 8036" transform="translate(395 -384)">
                                        <g id="Group_8031" data-name="Group 8031" transform="translate(-6 2)">
                                            <g id="Group_8030" data-name="Group 8030" transform="translate(-11913 -15062)">
                                                <g id="Mask_Group_7642" data-name="Mask Group 7642" transform="translate(0 -39.256)" clipPath="url(#clip-path)">
                                                    <g id="Group_7900" data-name="Group 7900" transform="translate(288.6 806.8)" opacity="0">
                                                        <path id="Path_1940" data-name="Path 1940" d="M-22262.424-15210.229s-67.6-320-150.3-320-133.031,72.727-225.453,72.727-130.91,230.3-130.91,230.3l20.689,543.6h458.8Z" transform="translate(23190.4 14994.2)" fill="url(#radial-gradient)" />
                                                    </g>
                                                    <path id="Path_2779" data-name="Path 2779" d="M182,0A182,182,0,1,1,0,182,182,182,0,0,1,182,0Z" transform="translate(853 484.256)" fill="rgba(129,103,242,0.7)" />
                                                    <path id="Path_2780" data-name="Path 2780" d="M185.433,0C287.845,0,370.866,83.021,370.866,185.433S287.845,370.866,185.433,370.866,0,287.845,0,185.433,83.021,0,185.433,0Z" transform="translate(650.134 349.39)" fill="rgba(141,61,220,0.64)" />
                                                    <path id="Path_2778" data-name="Path 2778" d="M182,0A182,182,0,1,1,0,182,182,182,0,0,1,182,0Z" transform="translate(884 229.256)" fill="rgba(100,180,210,0.56)" />
                                                    <g id="Group_7901" data-name="Group 7901" transform="translate(23357 16552.258)">
                                                        <path id="Subtraction_9" data-name="Subtraction 9" d="M21662,15806a137.03,137.03,0,0,1-27.408-2.763,135.252,135.252,0,0,1-48.629-20.463,136.4,136.4,0,0,1-49.273-59.836,135.137,135.137,0,0,1-7.924-25.529,137.295,137.295,0,0,1,0-54.817,135.269,135.269,0,0,1,20.463-48.632,136.4,136.4,0,0,1,59.834-49.274,135.29,135.29,0,0,1,25.529-7.925,137.29,137.29,0,0,1,54.816,0,135.26,135.26,0,0,1,48.631,20.464,136.38,136.38,0,0,1,49.275,59.839,135.2,135.2,0,0,1,7.928,25.528,137.39,137.39,0,0,1,0,54.817,135.334,135.334,0,0,1-20.467,48.631,136.395,136.395,0,0,1-59.838,49.272,135.363,135.363,0,0,1-25.529,7.925A137.03,137.03,0,0,1,21662,15806Zm0-210a74,74,0,1,0,74,74A74.083,74.083,0,0,0,21662,15596Z" transform="translate(-44059 -31644)" fill="#fff" />
                                                        <path id="Path_1943" data-name="Path 1943" d="M-20566-14968.8h59.068s2.264,36.972,27.594,52.419c11.2,6.83,26.787,15.257,41.1,16.072,17.449,1,32.637-6.7,32.637-6.7l-61.008,59.8s-45.273-12.615-70.121-43.018S-20566-14968.8-20566-14968.8Z" transform="translate(-1855.4 -948.203)" fill="#fff" />
                                                    </g>
                                                </g>
                                                <g id="Rectangle_777" data-name="Rectangle 777" transform="translate(717 538.537) rotate(-45)" fill="none" stroke="#fff" strokeWidth="3">
                                                    <rect width="343" height="343" rx="47" stroke="none" />
                                                    <rect x="1.5" y="1.5" width="340" height="340" rx="45.5" fill="none" />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </SvgIcon>
                    </IconButton>
                    <Link to='/' underline='none' component={RouterLink} className={classes.title} variant="h6" noWrap>
                        RIOCTY BOX
          </Link>
                    <div className={classes.grow} />


                    <div className={classes.sectionDesktop}>

                        {/* 
                            <IconButton color="inherit">
                                <div className={classes.button}>

                                    <Badge badgeContent={11} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </div>
                            </IconButton> */}


                        {props.auth === true &&
                            <IconButton onClick={logout} style={{ padding: 0 }} color="inherit">
                                <div className={classes.button}>
                                    <PowerSettingsNewIcon />
                                </div>
                            </IconButton>}

                        {/* <IconButton disabled={props.auth===null} onClick={handleProfileMenuOpen} color="inherit" >
                                <div className={classes.button}>
                                    <AccountCircle />
                                </div>
                            </IconButton> */}
                    </div>


                    {/* <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                        </div> */}
                </Toolbar>
            </AppBar>


            {props.auth === true &&
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <Toolbar />

                <List>

                    <ListItem button onClick={()=>{history.push('/q-book')}}>
                        <ListItemIcon >  <SvgIcon style={{color: 'rgba(0, 0, 0, 0.54)'}}>
                            <Q />
                        </SvgIcon></ListItemIcon>
                        <ListItemText primary={'Q-Book'} />
                    </ListItem>
                    <ListItem button onClick={()=>{history.push('/q-bank')}}>
                        <ListItemIcon><FormatListBulletedIcon /> </ListItemIcon>
                        <ListItemText primary={'Q-Bank'} />
                    </ListItem>
                    <ListItem button onClick={()=>{history.push('/weekly-test')}}>
                        <ListItemIcon><AssignmentIcon /> </ListItemIcon>
                        <ListItemText primary={'Weekly Test'} />
                    </ListItem>
                    <ListItem button onClick={()=>{history.push('/monthly-test')}}>
                        <ListItemIcon><MenuBook /> </ListItemIcon>
                        <ListItemText primary={'Monthly Test'} />
                    </ListItem>
                </List>
                <Divider />
                <List>

                    <ListItem button onClick={()=>{history.push('/saved')}}>
                        <ListItemIcon><SaveIcon/> </ListItemIcon>
                        <ListItemText primary={'Saved Item'} />
                    </ListItem>
                    <ListItem button onClick={()=>{history.push('/alert')}}>
                        <ListItemIcon><NotificationImportantIcon/> </ListItemIcon>
                        <ListItemText primary={'Alert'} />
                    </ListItem>
                </List>
                <Divider />
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {console.log(theme.direction)}
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
            </Drawer>
}
        </div>
    );
}
