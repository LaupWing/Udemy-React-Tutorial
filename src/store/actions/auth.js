import * as actionTypes from './actionTypes'
import axios from 'axios'
import key from '../../config/key'

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
        const authData ={
            email,
            password,
            returnSecureToken: true
        }
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`, authData)
            .then(response=>{
                console.log(response)
                dispatch(authSucces(response.data))
            })
            .catch(err=>{
                console.log(err)
                dispatch(authFail(err))
            })
    }
}