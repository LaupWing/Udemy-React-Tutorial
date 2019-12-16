import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredient'


const burger = (props)=>{
    let transformedIngredient = Object.keys(props.ingredients)
        .map(key=>{
            return [...Array(props.ingredients[key])].map((_,i)=>{ // this is javascript method which creates an array with empty spaces Array(3) creates an array with 3 empty spaces
                return <BurgerIngredient key={key+i} type={key}/>
            })
        })
        .reduce((arr,el)=>{
            return arr.concat(el) 
        }, []) // Flatten the array 
    if(transformedIngredient.length === 0){
        transformedIngredient = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger