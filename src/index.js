/* eslint-disable react/jsx-indent */
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
  /* eslint-disable-next-line */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

async function fetchData() {
  const allCategories = [];
  const allFoodObj = {};
  const allFoods = [];
  const resp = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await resp.data.categories;

  for (let i = 0; i < data.length; i += 1) {
    allCategories.push(data[i].strCategory);
  }

  allCategories.map((cat) => store.dispatch(actions.SHOW_CAT(cat)));

  for (let i = 0; i < allCategories.length; i += 1) {
    const category = allCategories[i];
    /* eslint-disable-next-line */
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const { meals } = res.data;
    allFoodObj[category] = meals;
  }

  const allFoodObjArr = Object.keys(allFoodObj);

  for (let i = 0; i < allFoodObjArr.length; i += 1) {
    store.dispatch(actions.SELECT_CAT(allFoodObjArr[i], allFoodObj[allFoodObjArr[i]]));
  }

  for (let i = 0; i < allFoodObjArr.length; i += 1) {
    for (let x = 0; x < allFoodObj[allFoodObjArr[i]].length; x += 1) {
      allFoods.push(allFoodObj[allFoodObjArr[i]][x]);
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
