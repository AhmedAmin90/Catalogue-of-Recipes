import Single from "../components/Single";
import { render , screen} from '@testing-library/react';
import { create } from 'react-test-renderer';
import React , {useState , useEffect} from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../index';
import {
    BrowserRouter as Router, Route
  } from 'react-router-dom';


  describe('rendered Main', () => {
    let renderedComponent;
    // const meal = { id: 1,
    //     name: 'Test Food',
    //     ingredients: ['Test one' , 'Test two'],
    //     image: 'Test url'
    // }
    const routeComponentPropsMock = {
        // add jest.fn() as needed to any of the objects
        history: {} ,
        location: {} ,
        match: {params: {id: "52997"}},
      }
    
    beforeEach(() => {
      renderedComponent = render(
        <Provider store={store}>
          <Router>
           act((){<Single foodData={routeComponentPropsMock} />});
          </Router>
        </Provider>,
      );
    });

    it('has a div with class Single', () => {
        const { container } = renderedComponent;
        const appElement = container.querySelector('.Single');
        // const appElement = getByRole('button', { name: 'All categories' });
        expect(appElement).toBeInTheDocument();
        // const heading = screen.getByText('Lets Do Some Math !');
        // expect(heading).toBeInTheDocument;
      });

});

// describe('Test handle Change' , ()=> {
// const Single = () =>{
//     const [meal , setMeal] = useState({
//         id: 1,
//         name: '',
//         ingredients: [],
//         image: '',

//     })


//     useEffect(()=>{
//         setMeal((pre) => ({
//             id: 1,
//             name: 'Test Food',
//             ingredients: ['Test one' , 'Test two'],
//             image: 'Test url'
//         }))
//     })

//     return (
//         <div className="Single">
      
//             <div className="Single-container">
//                 <h1 className="Single-title">{meal.name}</h1>
//                 <img className="Single-img" src={meal.image} alt={meal.name} />
//                 <h1 className="Single-title">List of Ingredients: </h1>
//                 <ul className="Single-ingredient">
//                 </ul>
//             </div>
//         </div>
//     )
// }

// const setup = () => {
//     const component = render(<Provider store={store}>
//         <Router>
//         <Single/>
//         </Router>
//       </Provider>,)
//       const element = component.querySelector('.Single');
//     return {
//         element,
//       ...component,
//     }
//   }

//   test('Test changing value', () => {
//     const {element} = setup()
//     expect(element).toBeInTheDocument();
//   })

// })