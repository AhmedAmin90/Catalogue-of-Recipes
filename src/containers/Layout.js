import React , {useState , useEffect} from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import CategoryFilter from '../components/CategoryFilter';
import * as actions from '../actions/index';
import './Layout.css'


function Layout() {
    const dispatch = useDispatch();
    const selectedCategory = useSelector(state => state.selectedReducer)
    const foods = useSelector(state => state.foodReducer);
    const filteredFood = useSelector(state => state.filterReducer);
    const handleFilterChange = (category) => {
        dispatch(actions.CHANGE_FILTER(category));
      };

    const selectedFoods =  (category) => {
        if (category === 'All') {
            return foods.map(oneRecipe=> (
                <Link key={oneRecipe.id} to={`/recipes/${oneRecipe.id}`}>
                     <Card key={oneRecipe.id} id={oneRecipe.id} name={oneRecipe.name} img={oneRecipe.image} />
                </Link>
            ))
        }
        else {
            for (let cat of selectedCategory ) {
                if (cat[category]) {
                    return cat[category].map(food=> (
                    <Link key={food.idMeal} to={`/recipes/${food.idMeal}`}>
                        <Card key={food.idMeal} id={food.idMeal} name={food.strMeal} img={food.strMealThumb} />
                    </Link>
                    ))
                }
              }
        }
    
    }

    return (
        <div>
            <nav>
                <CategoryFilter handleFilter={handleFilterChange}/>
            </nav>
            <div className="Layout">
                {selectedFoods(filteredFood)}
            </div>
        </div>
    )
}

export default Layout
