import './App.css';
import axios from 'axios';

import Card from '../components/Card';
import Searchbar from '../components/Searchbar';

import CardList from './CardList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  const [meals, setMeals] = useState([])
  const [searchBar, setSearchBar] = useState('')
  
  const navigate = useNavigate()

  let mealsToShow = JSON.parse(JSON.stringify(meals))

  if (searchBar) {
    mealsToShow = meals.filter(meal => meal.strMeal.toLowerCase().includes(searchBar.toLowerCase()))
  }

  const getData = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=b')
      setMeals(response.data.meals)
    } catch (e) {
      console.log(e)
    }
  }

  const onChange = (event) => {
    let keyword = event.target.value
    setSearchBar(keyword)
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
      <CardList>
        {
          mealsToShow.map(meal => {
            return <Card key={meal.idMeal} meal={meal} onClick={() => navigateToDetail(meal.idMeal)} />
          })
        }
      </CardList>
    </div>
  );
}

export default App;
