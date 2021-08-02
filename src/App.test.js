import { render, screen , fireEvent , cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { store } from './index';
import { useSelector } from 'react-redux';
import App from './App';

describe('rendered Main', () => {
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });
  it('has a div with class loading', () => {
    const { container } = renderedComponent;
    const appElement = container.querySelector('.Loading');
    expect(appElement).toBeInTheDocument();
  });

  it('has a div with class Layout', () => {
    const selectedCategory = ['test' , 'test Two'];
    if (selectedCategory.lenght > 0) {
      const { container } = renderedComponent;
      const appElement = container.querySelector('.Layout');
      expect(appElement).toBeInTheDocument();
    }
    
  });

});