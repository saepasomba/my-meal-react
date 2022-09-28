import './App.css';
import axios from 'axios';

import Card from '../components/Card';
import Searchbar from '../components/Searchbar';

import CardList from './CardList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryList from './CategoryList';
import loading from './loading.gif';

function App() {

  const [meals, setMeals] = useState([])
  const [searchBar, setSearchBar] = useState('')
  const [categories, setCategories] = useState([])
  const [categorySelected, setCategorySelected] = useState('All')
  
  const navigate = useNavigate()

  let mealsToShow = JSON.parse(JSON.stringify(meals))

  if (searchBar) {
    mealsToShow = meals.filter(meal => meal.strMeal.toLowerCase().includes(searchBar.toLowerCase()))
  }

  if (categorySelected.length > 0 && categorySelected !== 'All') {
    mealsToShow = mealsToShow.filter(meal => meal.strCategory === categorySelected)
  }

  const getData = async () => {
    try {
      let finalData = []
      let categorySet = new Set()

      const asciiA = 'a'.charCodeAt()
      const asciiZ = 'z'.charCodeAt()

      for (let i = asciiA; i <= asciiZ; i++) {
        let alphabet = String.fromCharCode(i);
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alphabet}`)
        const data = response.data.meals;
        if (data) {
          finalData = finalData.concat(data)
          setMeals(finalData)

          data.forEach(meal => {
            categorySet.add(meal.strCategory)
          })
          let cleanCategory = Array.from(categorySet)
          setCategories(cleanCategory)
        }
      }
      
    } catch (e) {
      console.log(e)
    }
  }

  const onChange = (event) => {
    let keyword = event.target.value
    setSearchBar(keyword)
  }

  const categoryPressed = (category) => {
    if (category === 'All') {
      setCategorySelected('All')
    } else {
      setCategorySelected(category)
    }
  }

  const navigateToDetail = (mealID) => {
    navigate(`detail/${mealID}`)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <Searchbar onChange={onChange} />
      {
        meals.length > 0 ? 
        <>
          <CategoryList categories={categories} onClick={categoryPressed} isActive={categorySelected}/>
          <CardList>
            {
              mealsToShow.map(meal => {
                return <Card key={meal.idMeal} meal={meal} onClick={() => navigateToDetail(meal.idMeal)} />
              })
            }
          </CardList>
        </>
        : <div className='loading'>
            <img src={loading}></img>
          </div>
      }
      
    </div>
  );
}

export default App;
