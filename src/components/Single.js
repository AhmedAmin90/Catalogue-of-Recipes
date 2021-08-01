import React , {useState,useEffect}from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Single.css'
function Single({foodData}) {
    const [meal , setMeal] = useState({
        id: foodData.match.params.id,
        name: '',
        ingredients: [],
        instructions: '',
        image: '',
        video: ''

    })

    useEffect(()=>{
        async function getDetails(){
            const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.id}`);
            const data =  await res.data.meals[0];
            let ingredientsArr = [];
            for (let item in data) {
                if (item.indexOf('Ingredient') !== -1 ) {
                    ingredientsArr.push(data[item])
                }
            }
            setMeal((pre)=> ({
                ...pre,
                name: data.strMeal,
                ingredients : ingredientsArr,
                instructions: data.strInstructions,
                image: data.strMealThumb,
                video: data.strYoutube,

            }))

        }

        getDetails();
    })
    return (
        <div className="Single">
            <NavLink to="/"> Back To Home </NavLink>
            <h1 className="Single-title">{meal.name}</h1>
            <img className="Single-img" src={meal.image} alt={meal.name} />
            <h1 className="Single-title">List of Ingredients: </h1>
            <ul className="Single-ingredient">
                {meal.ingredients.map(ing=> {
                    if (ing !== '' && ing !== null) {
                        return   <li key={`${ing}${Math.random()*10}`}> {ing} </li>
                    }
                    })}
            </ul>
        </div>
    )
}

export default Single
