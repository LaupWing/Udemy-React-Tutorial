import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState ={
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 1.5,
    bacon: 0.5
}

// Here i have splitted the functions from the reducer
// I have only done it to this one because i find it unnecesseray
const addIngredient = (state, action) =>{
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients:updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState)
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
        case actionTypes.SET_INGREDIENTS:{
            return{
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building:  false
            }
        }
        case actionTypes.FETCH_INGREDIENT_FAILED:{
            return{
                ...state,
                error: true
            }
        }
        default:
            return state
    }
}

export default reducer