/* eslint-disable consistent-return , no-restricted-syntax */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from './Card';
import CategoryFilter from '../components/CategoryFilter';
import * as actions from '../actions/index';
import './Layout.css';

const Layout = ({ selectedCategory, foods, filteredFood }) => {
  const dispatch = useDispatch();

  const renderSelectedCategory = useSelector((state) => state.selectedReducer);
  const renderFoods = useSelector((state) => state.foodReducer);
  const renderFilteredFood = useSelector((state) => state.filterReducer);

  const handleFilterChange = (category) => {
    dispatch(actions.CHANGE_FILTER(category));
  };

  const selectedFoods = (category) => {
    if (category === 'All') {
      if (!foods) {
        return renderFoods.map((oneRecipe) => (
          <Link key={oneRecipe.id} to={`/recipes/${oneRecipe.id}`}>
            <Card
              key={oneRecipe.id}
              id={oneRecipe.id}
              name={oneRecipe.name}
              img={oneRecipe.image}
            />
          </Link>
        ));
      }
      return foods.map((oneRecipe) => (
        <Link key={oneRecipe.id} to={`/recipes/${oneRecipe.id}`}>
          <Card key={oneRecipe.id} id={oneRecipe.id} name={oneRecipe.name} img={oneRecipe.image} />
        </Link>
      ));
    }
    if (!selectedCategory) {
      for (const cat of renderSelectedCategory) {
        if (cat[category]) {
          return cat[category].map((food) => (
            <Link key={food.idMeal} to={`/recipes/${food.idMeal}`}>
              <Card
                key={food.idMeal}
                id={food.idMeal}
                name={food.strMeal}
                img={food.strMealThumb}
              />
            </Link>
          ));
        }
      }
    } else {
      for (const cat of selectedCategory) {
        if (cat[category]) {
          return cat[category].map((food) => (
            <Link key={food.idMeal} to={`/recipes/${food.idMeal}`}>
              <Card
                key={food.idMeal}
                id={food.idMeal}
                name={food.strMeal}
                img={food.strMealThumb}
              />
            </Link>
          ));
        }
      }
    }
  };

  const handleAllCategroy = () => {
    handleFilterChange('All');
  };
  const loading = () => {
    if (!selectedCategory || !foods || !filteredFood) {
      return renderSelectedCategory.length === 0
        ? (

          <div className="Loading">
            <h1>Please Wait; Our delicious foods are Loading ... </h1>
            <p>
              This built with
              <i className="fas fa-heart" />

              by Ahmed Amin

            </p>
            <ul className="social-icons">
              <li>

                <a href="https://twitter.com/AhmedAmin12383" target="_blank" rel="noreferrer">
                  <i className="fab fa-twitter" />
                </a>

              </li>
              <li>

                <a href="https://www.linkedin.com/in/web-developer/" target="_blank" rel="noreferrer">

                  <i className="fab fa-linkedin-in" />

                </a>

              </li>
              <li>

                <a href="https://github.com/AhmedAmin90" target="_blank" rel="noreferrer">

                  <i className="fab fa-github" />

                </a>
              </li>
              <li>

                <a href="https://angel.co/u/ahmed-amin-22" target="_blank" rel="noreferrer">

                  <i className="fab fa-angellist" />

                </a>
              </li>
              <li>

                <a href="https://www.facebook.com/ahmed.amin.7564" target="_blank" rel="noreferrer">

                  <i className="fab fa-facebook-f" />

                </a>
              </li>
            </ul>
          </div>
        )

        : (
          <div>
            <nav>
              <CategoryFilter handleFilter={handleFilterChange} value={renderFilteredFood} />
              <button type="button" className="Layout-all-categories" onClick={handleAllCategroy}>All categories</button>
            </nav>
            <div className="Layout">
              {selectedFoods(renderFilteredFood)}
            </div>
          </div>
        );
    }
    return (
      <div>
        <nav>
          <CategoryFilter handleFilter={handleFilterChange} value={filteredFood} />
          <button type="button" className="Layout-all-categories" onClick={handleAllCategroy}>All categories</button>
        </nav>
        <div className="Layout">
          {selectedFoods(filteredFood)}
        </div>
      </div>
    );
  };
  return (
    <div>{loading()}</div>

  );
};

Layout.defaultProps = {
  selectedCategory: null,
  filteredFood: null,
  foods: null,
};

Layout.propTypes = {
  selectedCategory: PropTypes.instanceOf(Array),
  filteredFood: PropTypes.string,
  foods: PropTypes.instanceOf(Array),
};

export default Layout;
