import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliry/Auxiliry'
import Burger from  '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component{
    state = {
        purchasing: false,
    }

    componentDidMount(){
        this.props.onInitIngredients()
    }

    // Rewatch 166
    updatePurchaseState(ingredients){
        // Basic converting object to array with object and key
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey]
            })
            .reduce((sum, el)=>{
                // Sum starts with 0 (see at the end) and el is the current value of the array object
                return sum + el 
            },0)
        // if sum is higher than 0 it is true
        // this.setState({purchasable: sum>0})
        return sum >0

    }
    purchaseHandler = ()=>{
        // we need to use this kind of function to get the this binding to this class
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = ()=>{
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render(){
        // 164 REWATCH
        const disabledInfo = {
            ...this.props.ings 
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary = null
        
        let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner/> 
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary 
                price={this.props.price}
                ingredients={this.props.ings}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
            />
        }
        return(
            <Aux>
                {/* Here is a improvement state possible. Because there is no need to update teh order summary when it it is not showing */}
                {burger}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>>
            </Aux>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (name)=>dispatch(actions.addIngredient(name)),
        onIngredientRemoved: (name)=>dispatch(actions.removeIngredient(name)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))