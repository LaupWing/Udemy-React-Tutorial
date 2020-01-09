import * as actionTypes from '../actions/actionTypes'

const intialState = {
    orders:[],
    loading: false
}

const reducer = (state = intialState, action)=>{
    switch(action.types){
        case actionTypes.PURCHASE_BURGER_FAIL:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return{
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_SUCCES:{
            return{
                ...state,
                loading: false
            }
        }
        case actionTypes.PURCHASE_BURGER_START:{
            return{
                ...state,
                loading: false
            }
        }
        default:
            return state
    }
}

export default reducer