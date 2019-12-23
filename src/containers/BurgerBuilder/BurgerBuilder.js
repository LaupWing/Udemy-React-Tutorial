import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliry/Auxiliry'
import Burger from  '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 1.5,
    bacon: 0.5
}

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
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
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, // recacluclate the price on the server because the user can change it on the client side
            customer:{
                name: 'Laup Wing',
                address:{
                    street: 'Hello',
                    zipCode: '1650JA',
                    country: 'Holland'
                },
                email: 'pinda@hotmail.com'
            },
            deliveryMethod: 'fasteset'
        }
        axios.post('/orders.json', order)
            .then(res=>{
                this.setState({loading:false, purchasing: false})
            })
            .catch(e=>{
                this.setState({loading:false, purchasing: false})
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
            ...this.state.ingredients 
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary = <OrderSummary 
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
        />
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        return(
            <Aux>
                {/* Here is a improvement state possible. Because there is no need to update teh order summary when it it is not showing */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)