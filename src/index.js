/* eslint-disable no-underscore-dangle,
no-await-in-loop , react/jsx-closing-tag-location ,  guard-for-in , no-restricted-syntax */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import Single from './components/Single';
import reportWebVitals from './reportWebVitals';
import allReducers from './reducers/index';
import * as actions from './actions/index';

const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

async function fetchData() {
  const allCategories = [];
  const allFoodObj = {};
  const allFoods = [];
  const resp = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await resp.data.categories;
  for (const cat of data) {
    allCategories.push(cat.strCategory);
  }

  allCategories.map((cat) => store.dispatch(actions.SHOW_CAT(cat)));

  for (const category of allCategories) {
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const { meals } = res.data;
    allFoodObj[category] = meals;
  }

  for (const foodCat in allFoodObj) {
    store.dispatch(actions.SELECT_CAT(foodCat, allFoodObj[foodCat]));
  }

  for (const food in allFoodObj) {
    for (const recipe of allFoodObj[food]) {
      allFoods.push(recipe);
    }
  }

  allFoods.map((oneRecipe) => store.dispatch(actions.SHOW_FOOD(oneRecipe)));
}

fetchData();

ReactDOM.render(

  (<Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <App />} />
        <Route exact path="/recipes/:id" render={(routeProps) => <Single foodData={routeProps} />} />
      </Switch>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root') || document.createElement('div'), // for testing
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
