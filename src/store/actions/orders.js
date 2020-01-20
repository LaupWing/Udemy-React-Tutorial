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

export const purchaseBurger = (orderData,token) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth='+token, orderData)
            .then(res=>{
                dispatch(purchaseBurgerSucces(res.data.name, orderData))
            })
            .catch(e=>{
                dispatch(purchaseBurgerFail(e))
            })
    }
}

export const purchaseInit =  () =>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSucces = (orders)=>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCES,
        orders
    }
}

export const fetchOrdersFail = (error)=>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrdersStart = ()=>{
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId)=>{
    return dispatch =>{
        dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"'
        axios.get('/orders.json'+queryParams)
            .then(res=>{
                const fetchedOrders= []
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    })
                }
                dispatch(fetchOrdersSucces(fetchedOrders))
            })
            .catch(err=>{
                dispatch(fetchOrdersFail(err))
            })
    }
}