import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliry/Auxiliry'

const withErrorHandler = (WrappedComponent, axios)=>{
    return class extends Component{
        state={
            error: null
        }
        constructor(){
            super()
            this.req = axios.interceptors.request.use(req=>{
                this.setState({error: null})
                return req
            })
            this.res = axios.interceptors.response.use(res=>res, error=>{
                this.setState({error: error})
            })
        }
        errorConfirmedHandler = ()=>{
            this.setState({error: null})
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.req)
            axios.interceptors.response.eject(this.res)
        }
        render(){
            return(
            <Aux>
                <Modal 
                    modalClosed={this.errorConfirmedHandler}
                    show={this.state.error}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </Aux>
        )
        }
    } 
}

export default withErrorHandler