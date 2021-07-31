import React , {useState , useEffect} from 'react';
import { useSelector , useDispatch } from 'react-redux';
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
                <Card key={oneRecipe.id} name={oneRecipe.name} img={oneRecipe.image} />
            ))
        }
        else {
            for (let cat of selectedCategory ) {
                if (cat[category]) {
                    return cat[category].map(food=> (
                    <Card key={food.idMeal} name={food.strMeal} img={food.strMealThumb} />
                    ))
                }
              }
        }
    
    }

   

    return (
        <div className="Layout">
            <CategoryFilter handleFilter={handleFilterChange}/>
            {/* {renderFood} */}
            {selectedFoods(filteredFood)}
            
        </div>
    )
}

export default Layout
