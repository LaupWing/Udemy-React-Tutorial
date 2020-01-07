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
import * as actionTypes from '../../store/actions'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 1.5,
    bacon: 0.5
}

class BurgerBuilder extends Component{
    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // axios.get('https://react-my-burger-8ef1b.firebaseio.com/ingredients.json')
        //     .then(response=>{
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(e=>{
        //         this.setState({error:true})
        //     })
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
        this.setState({purchasable: sum>0})

    }
    // State changes should be in the same component as where the state is defined
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount +1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddation = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddation
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
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
        // alert('You continued')
        // this.setState({
        //     loading: true
        // })
        const queryParams = []
        for(let i in this.state.ingredients){
            // encodeURIComponent is to convert a string to a covertable url string
            queryParams.push(encodeURIComponent(i) +  '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' +queryString
        })
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type]
        if(oldCount <=0){
            return
        }
        const updatedCount = oldCount -1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDecution = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDecution
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
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
        
        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner/> 
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary 
                price={this.state.totalPrice}
                ingredients={this.props.ings}
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
            />
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
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
        onIngredientAdded: (name)=>dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: name}),
        onIngredientRemoved: (name)=>dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: name})
    }
}
const mapStateToProps = state =>{
    return{
        ingS: state.ingredients
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))