import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component{
    state={
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'example@hotmail.com'
                },
                value: ''
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
                value: ''
            },
        },
        loading: false
    }
    orderHandler = (event)=>{
        event.preventDefault()
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, 
            customer:{
                name: this.state.name,
                address:{...this.state.adress},
                email: this.state.email
            },
            deliveryMethod: 'fasteset'
        }
        axios.post('/orders.json', order)
            .then(res=>{
                this.setState({loading:false})
                this.props.history.push('/')
            })
            .catch(e=>{
                this.setState({loading:false})
            })
    }

    inputChangedHandler = (event, inputId)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormEl = {
            ...updatedOrderForm[inputId]
        }

        updatedFormEl.value = event.target.value
        updatedOrderForm[inputId] = updatedFormEl
        this.setState({
            orderForm: updatedOrderForm
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
                <form>
                    {formElementsArray.map(formElement=>(
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event)=>this.inputChangedHandler(event, formElement.id)}
                        />
                    ))}
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>);
        if(this.state.loading){
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

export default ContactData