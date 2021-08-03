import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../index';
import Card from '../containers/Card';

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

  it('has a div with class loading', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('.Card');
    expect(appElement).toBeInTheDocument();
    expect(appElement).toHaveStyle('background-image: url(\'Test Url\')');
  });
});
