/* eslint-disable consistent-return, array-callback-return , no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Single.css';

const Single = ({ foodData }) => {
  const selectedId = foodData.match.params.id;

  const [meal, setMeal] = useState({
    id: selectedId,
    name: '',
    ingredients: [],
    image: '',

  });
  const [axiosRes, setAxiosRes] = useState('');

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    setAxiosRes(axiosRes);
    async function getDetails() {
      try {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedId}`, {
          cancelToken: source.token,
        });
        const data = await res.data.meals[0];
        const ingredientsArr = [];
        for (const item in data) {
          if (item.indexOf('Ingredient') !== -1) {
            ingredientsArr.push(data[item]);
          }
        }
        setMeal((pre) => ({
          ...pre,
          name: data.strMeal,
          ingredients: ingredientsArr,
          image: data.strMealThumb,
        }));
      } catch (err) {
        return err;
      }
    }

    getDetails();
    return () => {
      source.cancel('axios request cancelled');
    };
  }, []);

  const ingredientList = meal.ingredients.map((ing) => {
    if (ing !== '' && ing !== null) {
      return (
        <li key={`${ing}${Math.random() * 10}`}>

          {ing}

        </li>
      );
    }
  });
  return (
    <div className="Single">
      <nav>
        <NavLink to="/"> Back To Home </NavLink>
      </nav>

      <div className="Single-container">
        <h1 className="Single-title">{meal.name}</h1>
        <img className="Single-img" src={meal.image} alt={meal.name} />
        <h1 className="Single-title">List of Ingredients: </h1>
        <ul className="Single-ingredient">
          {ingredientList}
        </ul>
      </div>
    </div>
  );
};

Single.defaultProps = {
  foodData: {
    history: {},
    location: {},
    match: { params: { id: '1' } },
  },
};

Single.propTypes = {
  foodData: PropTypes.instanceOf(Object),
};

export default Single;
