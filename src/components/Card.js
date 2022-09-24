import React from 'react'
import style from './Card.module.css'

export default function Card({ meal, onClick }) {

  return (
    <div className={style.mealCard} onClick={onClick}>
        <img src={meal.strMealThumb}></img>
        <p>{meal.strMeal}</p>
    </div>
  )
}
