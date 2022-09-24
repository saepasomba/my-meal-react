import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MealDetail() {

  const [meal, setMeal] = useState([])

  const { mealID } = useParams()

  const getData = async() => {
    let response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    let data = response.data.meals[0]
    setMeal(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='container' >
      <img src={meal.strMealThumb} />
    </div>
  )
}
