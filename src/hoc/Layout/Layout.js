import React, {Component} from  'react'
import Aux from '../Auxiliry/Auxiliry'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    sideDrawerToggle = () =>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
        // This belowe is a nono because setState is asynchronous
        // this.setState({
        //     showSideDrawer: !this.state.showSideDrawer
        // })
    }
    sideDrawerOpen = ()=>{
        this.setState({
            showSideDrawer: true
        })
    }
    render(){
        return(
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuth} 
                    drawerToggleClicked={this.sideDrawerOpen}
                />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerToggle}
                    isAuth={this.props.isAuth}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
    
const mapStateToProps = state=>{
    return{
        isAuth: state.auth.token !== null 
    }
}

export default connect(mapStateToProps)(Layout)