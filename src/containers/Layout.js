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

    const handleAllCategroy = ()=>{
        handleFilterChange('All');
    }
         const test =()=>{
            while (selectedCategory.length === 0) {
                return (
                    <div className="Loading">
                    <h1>Please Wait; Our delicious foods are Loading ... </h1>
                    <p>This built with <i className="fas fa-heart"></i> by Ahmed Amin </p>
                    <ul className="social-icons">
                        <li> <a href="https://twitter.com/AhmedAmin12383" target="_blank"><i className="fab fa-twitter"></i></a> </li>
                        <li> <a href="https://www.linkedin.com/in/web-developer/" target="_blank"> <i className="fab fa-linkedin-in"></i> </a> </li>
                        <li> <a href="https://github.com/AhmedAmin90" target="_blank"> <i className="fab fa-github"></i> </a></li>
                        <li> <a href="https://angel.co/u/ahmed-amin-22" target="_blank"> <i className="fab fa-angellist"></i> </a></li>
                        <li> <a href="https://www.facebook.com/ahmed.amin.7564" target="_blank"> <i className="fab fa-facebook-f"></i> </a></li>
                    </ul>
                  </div>
                )
            }
            
            return (<div>
                <nav>
                    <CategoryFilter handleFilter={handleFilterChange}/>
                    <button className="Layout-all-categories" onClick={handleAllCategroy}>All categories</button>
                </nav>
                <div className="Layout">
                    {selectedFoods(filteredFood)}
                </div>
            </div> )
            
         } 
    return (
        <div>{test()}</div>
 
    )
}

export default Layout
