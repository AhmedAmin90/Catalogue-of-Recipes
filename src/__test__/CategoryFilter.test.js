import React ,  {useState} from 'react';
import { create } from 'react-test-renderer';
import { render , fireEvent , screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../index';
import {
    BrowserRouter as Router,
  } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';


test('renders correctly', () => {
  const tree = create(
    <Provider store={store}>
    <Router>
       <CategoryFilter handleFilter={() => {}} value="All"/>
    </Router>
  </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('rendered Main', () => {
    let renderedComponent;
    beforeEach(() => {
      renderedComponent = render(
        <Provider store={store}>
          <Router>
             <CategoryFilter handleFilter={() => {}} value="All" />
          </Router>
        </Provider>,
      );
    });

    it('has a div with class CategoryFilter', () => {
        const { container } = renderedComponent;
        const appElement = container.querySelector('.CategoryFilter');
        expect(appElement).toBeInTheDocument();
        screen.getByText(/All/);
      });

});

describe('Test handle Change' , ()=> {
  const CategoryFilter= ()=> {
    const [value, setValue] = useState('')
    
    return (
      <select  name="category" id="fiter-category">
          <option role="tab" value={value}>{value}</option>
      </select>
    )
  }
  const setup = () => {
    const component = render(<CategoryFilter  />)
    const input = component.getByRole('tab')
    return {
      input,
      ...component,
    }
  }
  test('Test changing value', () => {
    const {input} = setup()
    fireEvent.change(input, {target: {value: 'Test Value'}})
    expect(input.value).toBe('Test Value')
  })

  test('Choose from Array' , () => {
    const categories = ['All' , 'Beef' , 'Chicked']
    const {input} = setup()
    fireEvent.change(input, {target: {value: categories[0]}})
    expect(input.value).toBe('All');
    fireEvent.change(input, {target: {value: categories[2]}})
    expect(input.value).toBe('Chicked')
  })
  
})


