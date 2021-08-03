import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../index';
import Single from '../components/Single';

test('renders correctly', () => {
  const tree = create(<Provider store={store}><Router><Single /></Router></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Test', () => {
  it('loading', async () => {
    const routeComponentPropsMock = {
      history: {},
      location: {},
      match: { params: { id: '52794' } },
    };

    await act(async () => render(
      <Provider store={store}>
        <Router>
          <Single foodData={routeComponentPropsMock} />
          ;
        </Router>
      </Provider>,
    ));
    expect(screen.getByText('List of Ingredients:')).toBeInTheDocument();
  });
});
