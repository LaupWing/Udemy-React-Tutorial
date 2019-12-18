import React from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxiliry'
import Backdrop from '../Backdrop/Backdrop'
const modal = (props)=> (
    <Aux>
        <Backdrop clicked={props.modalClosed} show={props.show}/>
        <div
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }} 
            className={classes.Modal}
        >
            {props.children} 
            {/* Now we can determine which componets or jsx elements goes in the this modal */}
        </div>
    </Aux>
)

export default modal