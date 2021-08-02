import { render, screen , fireEvent , cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../index';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Layout from '../containers/Layout';



describe('rendered Main', () => {
  let renderedComponent;
  beforeEach(() => {
    let selectedCat = [{
      Beef: [{
        strMeal:"Beef and Mustard Pie",
        strMealThumb:"https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
        idMeal:"52874"
      }]
    }
  ]

    let foods= [{
      id:"52874",
      name:"Beef and Mustard Pie",
      image:"https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg"
    }]

    let filteredFood = 'Beef';

    renderedComponent = render(
      <Provider store={store}>
        <Router>
           <Layout selectedCategory={selectedCat} foods={foods} test={true} filteredFood={filteredFood} />
        </Router>
      </Provider>,
    );
  });
  it('has a div with class loading', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('.Loading');
    expect(appElement).toBeInTheDocument();
  });

  // it('has a div with class Layout', () => {

  //     // const { getByRole } = renderedComponent;
  //     const { container } = renderedComponent;
  //     // const appElement = getByRole('button', { name: 'All categories' });
  //     const appElement = container.querySelector('.Layout')
  //     expect(appElement).toBeInTheDocument();
    

  // });

});