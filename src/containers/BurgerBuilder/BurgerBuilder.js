import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliry'
import Burger from  '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
        totalPrice: 4
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
    }

    removeIngredients = (type)=>{

    }
    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder