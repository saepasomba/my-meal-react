import React from 'react'
import style from './Card.module.css'

export default function Card({ meal }) {
  return (
    <div className={style.mealCard}>
        <img src={meal.strMealThumb}></img>
        <p>{meal.strMeal}</p>
    </div>
  )
}
