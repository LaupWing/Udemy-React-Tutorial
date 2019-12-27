import React,{Component} from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import {Route, Switch} from 'react-router-dom'

class App extends Component{
    render(){
        return(
            <div>
                <Layout>
                    <Switch>
                        {/* Use switch to only load one route */}
                        <Route path="/checkout" component={Checkout}/>   
                        <Route path="/" exact component={BurgerBuilder}/>
                    </Switch>
                </Layout>
            </div>
        )
    }
}
export default App;
