import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../index';
import Layout from '../containers/Layout';

test('renders correctly', () => {
  const tree = create(<Provider store={store}><Router><Layout /></Router></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('rendered Layout', () => {
  let renderedComponent;
  beforeEach(() => {
    const selectedCat = [{
      Beef: [{
        strMeal: 'Beef and Mustard Pie',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
        idMeal: '52874',
      }],
    },
    ];

    const foods = [{
      id: '52874',
      name: 'Beef and Mustard Pie',
      image: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg',
    }];

    const filteredFood = 'Beef';

    renderedComponent = render(
      <Provider store={store}>
        <Router>
          <Layout foods={foods} selectedCategory={selectedCat} filteredFood={filteredFood} />
        </Router>
      </Provider>,
    );
  });
  it('has a div with class Layout', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('.Layout');
    expect(appElement).toBeInTheDocument();
  });

  it('without a div with class loading', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('.Loading');
    expect(appElement).toBeNull();
  });

  it('has a has a name of food with : ', () => {
    const { getByText } = renderedComponent;
    const appElement = getByText('Beef and Mustard Pie');
    expect(appElement).toBeInTheDocument();
  });

  it('has a has a name of food with : ', () => {
    const { getByText } = renderedComponent;
    const appElement = getByText('Beef and Mustard Pie');
    expect(appElement).not.toBeNull();
  });

  it('has a a name of category with Beef', () => {
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

  it('without a div with class Layout', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('.Layout');
    expect(appElement).toBeNull();
  });

  it('has a div a waiting text ', () => {
    const { getByText } = renderedComponent;
    const appElement = getByText('Please Wait; Our delicious foods are Loading ...');
    expect(appElement).toBeInTheDocument();
  });
});
