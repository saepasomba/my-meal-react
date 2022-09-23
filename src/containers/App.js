import './App.css';
import axios from 'axios';

import Nav from '../components/Nav'
import Card from '../components/Card';
import Searchbar from '../components/Searchbar';

import CardList from './CardList';
import { useEffect, useState } from 'react';

function App() {

  const [meals, setMeals] = useState([])
  const [searchBar, setSearchBar] = useState('')

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

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <Nav />
      <Searchbar onChange={onChange} />
      <CardList>
        {
          mealsToShow.map(meal => {
            return <Card key={meal.idMeal} meal={meal} />
          })
        }
      </CardList>
    </div>
  );
}

export default App;
