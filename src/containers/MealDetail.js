import style from './MealDetail.css'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MealDetail() {

  const [meal, setMeal] = useState([])

  const { mealID } = useParams()

  const getData = async() => {
    let response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    let data = response.data.meals[0]
    console.log(data)
    setMeal(data)
  }

  useEffect(() => {
    getData()
    window.scrollTo(0,0)
  }, [])

  return (
    <div className='container detail-container' >
      <div className='content-left'>
        <img src={meal.strMealThumb} />
      </div>
      <div className='content-right'>
        <h1>{meal.strMeal}</h1>
        <p className='subheader'>{`${meal.strArea} - ${meal.strCategory}`}</p>
        <section>
          <h2>How to make this?</h2>
          <p>
            {meal.strInstructions}
          </p>
        </section>
      </div>
    </div>
  )
}
