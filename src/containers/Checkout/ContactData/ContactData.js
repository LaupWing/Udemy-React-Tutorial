import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index' 


class ContactData extends Component{
    state={
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'example@hotmail.com'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options:[
                        {
                            value: 'fastest',
                            display: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            display: 'Cheapest'
                        },
                    ]
                },
                value: 'fastest',
                valid: true,
                validation: {}
            },
        },
        formIsValid: false
    }
    orderHandler = (event)=>{
        event.preventDefault()
        
        const formData = {}
        for(let formElId in this.state.orderForm){
            formData[formElId] =  this.state.orderForm[formElId].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price, 
            orderData: formData
        }
        this.props.onOrderBurger(order)
    }

    checkValidity(value, rules){
        let isValid = true
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.minLength && isValid
        }
        return isValid
    }

    inputChangedHandler = (event, inputId)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormEl = {
            ...updatedOrderForm[inputId]
        }

        updatedFormEl.value = event.target.value
        updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation)
        updatedFormEl.touched = true 
        updatedOrderForm[inputId] = updatedFormEl

        let formIsValid = true
        for(let inputId in updatedOrderForm){
            formIsValid = updatedOrderForm[inputId].valid && formIsValid
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render(){
        const formElementsArray = []
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement=>(
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event)=>this.inputChangedHandler(event, formElement.id)}
                        />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>);
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger: (orderData)=> dispatch(actions.purchaseBurger(orderData))
    }
}

const mapStateToProps = state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios))