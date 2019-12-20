import React, {Component} from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxiliry/Auxiliry'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show
    }
    componentDidUpdate(){
        console.log('Modal will update')
    }
    render(){
        return(
            <Aux>
                <Backdrop clicked={this.props.modalClosed} show={this.props.show}/>
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }} 
                    className={classes.Modal}
                >
                    {this.props.children} 
                    {/* Now we can determine which componets or jsx elements goes in the this modal */}
                </div>
            </Aux>
        )
    }
}

export default Modal