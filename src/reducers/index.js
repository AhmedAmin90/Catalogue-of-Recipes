import { combineReducers } from 'redux';
import foodReducer from './food';
import catReducer from './category';
import filterReducer from './filter';
import selectedReducer from './selectedCategory';

const allReducers = combineReducers({
  foodReducer,
  catReducer,
  filterReducer,
  selectedReducer,
});

export default allReducers;
