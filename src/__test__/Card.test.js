import { render} from '@testing-library/react';
import { create } from 'react-test-renderer';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../index';
import {
    BrowserRouter as Router,
  } from 'react-router-dom';
import Card from '../containers/Card';

test('renders correctly', () => {
  const tree = create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('rendered Main', () => {
    let renderedComponent;
    beforeEach(() => {
      renderedComponent = render(
        <Provider store={store}>
          <Router>
             <Card img='Test Url' name='Test Name' />
          </Router>
        </Provider>,
      );
    });

    it('has a div with class loading', () => {
        const { container } = renderedComponent;
        const appElement = container.querySelector('.Card');
        expect(appElement).toBeInTheDocument();
        expect(appElement).toHaveStyle(`background-image: url('Test Url')`)
      });
});