import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'


class Checkout extends Component{
    checkoutCancelledHandler = () =>{
        this.props.history.goBack()
    }
    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ings){
            const purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route 
                        path={this.props.match.path + '/contact-data'}
                        // Instead of using the  component to connect a component to the route we use a render method
                        // Why?
                        // In order to pass the ingredient list to this component 
                        // component={ContactData}
                        component={ContactData}
                    />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)