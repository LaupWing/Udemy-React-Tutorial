import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const purchaseBurgerSucces = (id, orderData)=>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCES,
        orderId: id,
        orderData
    }
}

export const purchaseBurgerStart = () =>{
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerFail = (error)=>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

export const purchaseBurger = (orderData) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
            .then(res=>{
                dispatch(purchaseBurgerSucces(res.data.name, orderData))
            })
            .catch(e=>{
                dispatch(purchaseBurgerFail(e))
            })
    }
}