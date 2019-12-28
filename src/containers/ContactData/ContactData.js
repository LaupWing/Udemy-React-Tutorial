import React, { Component } from 'react'

class ContactData extends Component{
    state={
        email: '',
        name: '',
        adress:{
            street: '',
            postalCode: ''
        }
    }
    render(){
        return(
            <div>
                <h4>Enter your contact data</h4>
                <form>
                    <input type="text" placeholder="Your Name"></input>
                    <input type="email" placeholder="Your email"></input>
                    <input type="text" placeholder="Your Street"></input>
                    <input type="text" placeholder="Your Postalcode"></input>
                </form>
            </div>
        )
    }
}