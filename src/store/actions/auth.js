import * as actionTypes from './actionTypes'

export const authStart = ()=>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSucces = (authData)=>{
    return{
        type: actionTypes.AUTH_SUCCES,
        authData
    }
}

export const authFail = (error)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (email,password)=>{
    return dispatch =>{
        dispatch(authStart())
    }
}