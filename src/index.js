import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import allReducers from '../src/reducers/index';
import * as actions from '../src/actions/index';
import axios from 'axios';


let allCategories = [];
let allFoodObj = {};
let allFoods = [];



const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

async function fetchData(){
  const resp = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await resp.data.categories;
  for (let cat of data) {
    allCategories.push(cat.strCategory)
  }
  console.log(allCategories)
  allCategories.map(cat=> store.dispatch(actions.SHOW_CAT(cat)))

  for (let category of allCategories) {
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const meals = res.data.meals
    allFoodObj[category] = meals
  }

  for (let foodCat in allFoodObj){
    store.dispatch(actions.SELECT_CAT(foodCat , allFoodObj[foodCat]))
  }
  
  for (let food in allFoodObj) {
    for (let recipe of allFoodObj[food]) {
        allFoods.push(recipe)
      }
  } 

  allFoods.map(oneRecipe=> store.dispatch(actions.SHOW_FOOD(oneRecipe)))

}

fetchData()


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
