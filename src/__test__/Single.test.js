import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import store from '../index';
import Single from '../components/Single';

// maels: [{
//   id: 1,
//   name: 'Test Food',
//   ingredients : ['test one' , 'test two'],
//   image: 'url',
//   }]

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    id: '52794',
    name: 'Test Food',
    ingredients: ['test one', 'test two'],
    image: 'url',
  }),
}));

describe('Test', () => {
  it('loading', async () => {
    const routeComponentPropsMock = {
      // add jest.fn() as needed to any of the objects
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
    expect(screen.getByText('Test Food')).toBeInTheDocument();
  });
});
