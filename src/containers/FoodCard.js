import React , { useState, useEffect }from 'react';
import { useSelector  , useDispatch} from 'react-redux';
import { SHOW_FOOD } from '../actions';
import axios from 'axios';


function FoodCard() {
    const [cat , setCat ] = useState([]);

    const foods = useSelector(state => state.foodReducer);
   
    useEffect(()=> {
        async function fetchData(){
            const resp = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            const data = await resp.data.categories;
            let allCategories = []
            for (let cat of data) {
                allCategories.push(cat.strCategory)
            }
            setCat((pre)=> ({
                ...pre, 
                allCategories
            }))
        }
        fetchData();
    })

    const renderFood = foods.map(oneRecipe=> (
        <div>
        <h1>This is a test : Food Name is: {oneRecipe.name}  </h1>
        <img src={oneRecipe.image}/>
        </div>
    ))


    return (
        <div>
            {renderFood}
        </div>
    )
}

export default FoodCard
