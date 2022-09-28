import style from './MealDetail.css'
import loading from './loading.gif';

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MealDetail() {

  const [meal, setMeal] = useState()
  const [ingredients, setIngredients] = useState([])

  const { mealID } = useParams()

  const getData = async() => {
    let response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    let data = response.data.meals[0]
    setMeal(data)

    let tempIngredients = []
    for (let i = 0; i <= 20; i++) {
      if (data[`strIngredient${i}`]) {
        tempIngredients.push([data[`strIngredient${i}`], data[`strMeasure${i}`]])
      }
    }
    setIngredients(tempIngredients)
  }

  useEffect(() => {
    getData()
    window.scrollTo(0,0)
  }, [])

  if (meal) {
    return (
      <div className='container detail-container' >
        <div className='content-left'>
          <img src={meal.strMealThumb} />
        </div>
        <div className='content-right'>
          <h1>{meal.strMeal}</h1>
          <p className='subheader'>{`${meal.strArea} - ${meal.strCategory}`}</p>
          <section>
            <h2>Ingredients</h2>
            <ul>
              {
                ingredients.map((ingredient, i) => {
                  return (
                    <li key={i}>
                      <span><p>{ingredient[0]}</p></span>
                      <span><p>{ingredient[1]}</p></span>
                    </li>
                  )
                })
              }
            </ul>
          </section>
          <section>
            <h2>How to make this?</h2>
            <p>
              {meal.strInstructions}
            </p>
          </section>
        </div>
      </div>
    )
  } else {
    return (
      <div className='loading'>
        <img src={loading}></img>
      </div>
    )
  }
}
