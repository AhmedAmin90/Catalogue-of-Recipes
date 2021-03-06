import React, { useEffect, useState } from 'react';
import { create } from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../index';
import CategoryFilter from '../containers/CategoryFilter';

test('renders correctly', () => {
  const tree = create(
    <Provider store={store}>
      <Router>
        <CategoryFilter handleFilter={() => {}} value="All" />
      </Router>
    </Provider>,
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

  it('has a a label with Filter by category', () => {
    expect(screen.getByText(/Filter By Category/)).toBeTruthy();
  });
});

describe('rendered Main', () => {
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = render(
      <Provider store={store}>
        <Router>
          <CategoryFilter handleFilter={() => {}} value="" />
        </Router>
      </Provider>,
    );
  });

  it('has a div with class CategoryFilter', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('.CategoryFilter');
    expect(appElement).toBeInTheDocument();
  });

  it('has a a select with id filter-category without value', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('#fiter-category');
    expect(appElement).toBeTruthy();
    expect(appElement.innerHTML).not.toBe('All');
  });
});

describe('Test handle Change', () => {
  const CategoryFilter = () => {
    const [value, setValue] = useState('');
    useEffect(() => {
      setValue(value);
    });
    return (
      <select name="category" id="fiter-category">
        <option role="tab" value={value}>{value}</option>
      </select>
    );
  };
  const setup = () => {
    const component = render(<CategoryFilter />);
    const input = component.getByRole('tab');
    return {
      input,
      ...component,
    };
  };
  test('Test changing value', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Test Value' } });
    expect(input.value).toBe('Test Value');
  });

  test('Choose from Array', () => {
    const categories = ['All', 'Beef', 'Chicked'];
    const { input } = setup();
    fireEvent.change(input, { target: { value: categories[0] } });
    expect(input.value).toBe('All');
    fireEvent.change(input, { target: { value: categories[2] } });
    expect(input.value).toBe('Chicked');
  });
});
