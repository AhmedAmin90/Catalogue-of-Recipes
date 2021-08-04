import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../index';
import Card from '../components/Card';

test('renders correctly', () => {
  const tree = create(<Card name="test" img="test" />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('rendered Main', () => {
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = render(
      <Provider store={store}>
        <Router>
          <Card img="Test Url" name="Test Name" />
        </Router>
      </Provider>,
    );
  });

  it('The div has a background img with img prop', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('.Card');
    expect(appElement).toBeInTheDocument();
    expect(appElement).toHaveStyle('background-image: url(\'Test Url\')');
  });

  it('The div has a text with name prop', () => {
    const { getByText } = renderedComponent;
    const appElement = getByText('Test Name');
    expect(appElement).toBeInTheDocument();
  });

  it('Contains header h1 in the page:', () => {
    const appElement = screen.getByRole('heading');
    expect(appElement).toBeTruthy();
  });

  it('Contains div with card-shadow class', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('.Card-shadow');
    expect(appElement).not.toBeFalsy();
  });
});
