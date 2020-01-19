import React from 'react'
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import Logo from '../../Logo/Logo'
const toolbar = (props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>
)

export default toolbar