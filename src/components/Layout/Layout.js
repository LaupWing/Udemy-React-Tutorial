import React, {Component} from  'react'
import Aux from '../../hoc/Auxiliry'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

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
                <Toolbar drawerToggleClicked={this.sideDrawerOpen}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerToggle}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
    


export default Layout