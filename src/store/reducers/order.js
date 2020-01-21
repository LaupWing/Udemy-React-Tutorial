import * as actionTypes from '../actions/actionTypes'

const intialState = {
    orders:[],
    loading: false,
    purchased: false
}

const reducer = (state = intialState, action)=>{
    switch(action.types){
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
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
                loading: false,
                purchased: true
            }
        }
        case actionTypes.PURCHASE_BURGER_START:{
            return{
                ...state,
                loading: true
            }
        }
        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCES:
            return{
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default reducer