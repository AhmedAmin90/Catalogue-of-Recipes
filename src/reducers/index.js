import { combineReducers } from 'redux';
import foodReducer from './food';

 const allReducers = combineReducers({
     foodReducer,
 })

 export default allReducers;