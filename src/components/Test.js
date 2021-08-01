// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Test() {

//     const [food , setFood ] = useState({id: 0 , name: '', description: '' , img: ''});

//     useEffect(()=> {
//         async function fetchData(){
//             const resp = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
//             const data = await resp.data.categories[0];
//             setFood((pre)=> ({
//                 ...pre,
//                 id: data.idCategory,
//                 name: data.strCategory, 
//                 description: data.strCategoryDescription,
//                 img: data.strCategoryThumb
//             }))
//         }
//         fetchData();
//     })

//     return (
//         <div>
//             <h1>This is a test : Food Name is: {food.name}  </h1>
//             <p>{food.description}</p>
//             <img src={food.img}/>
//         </div>
//     )
// }


// export default Test

