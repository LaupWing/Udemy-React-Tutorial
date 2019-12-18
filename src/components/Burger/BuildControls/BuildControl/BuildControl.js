import React from 'react'
import classes from './BuildControl.module.css'
const buildControl = (props) =>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        {/* In the click there is a reference to the remove/add handler */}
        <button className={classes.Less} onClick={props.removed}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>)


export default buildControl