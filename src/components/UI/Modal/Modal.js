import React from 'react'
import classes from './Modal.module.css'

const modal = (props)=> (
    <div className={classes.Modal}>
        {props.children} 
        {/* Now we can determine which componets or jsx elements goes in the this modal */}
    </div>
)

export default modal