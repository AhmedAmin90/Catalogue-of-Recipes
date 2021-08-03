import { render} from '@testing-library/react';
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
           <Layout foods={foods} selectedCategory={selectedCat} filteredFood={filteredFood}/>
        </Router>
      </Provider>,
    );
  });
  it('has a div with class loading', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('.Layout');
    expect(appElement).toBeInTheDocument();
  });

  it('has a div with ', () => {
      const { getByText } = renderedComponent;
      const appElement = getByText('Beef and Mustard Pie');
      expect(appElement).toBeInTheDocument();
  
  });

  it('has a div with ', () => {
    const { getByText } = renderedComponent;
    const appElement = getByText('Beef');
    expect(appElement).toBeInTheDocument();
});

});


describe('rendered Main', () => {
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = render(
      <Provider store={store}>
        <Router>
           <Layout />
        </Router>
      </Provider>,
    );
  });
  
  it('has a div with class loading', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('.Loading');
    expect(appElement).toBeInTheDocument();
  });

  it('has a div a waiting text ', () => {
      const { getByText } = renderedComponent;
      const appElement = getByText('Please Wait; Our delicious foods are Loading ...');
      expect(appElement).toBeInTheDocument();
  
  });

});

