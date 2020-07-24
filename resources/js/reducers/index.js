import { combineReducers } from 'redux';
import counterReducer from './counter';
import loggedReducer from './isLogged';
import shoppingBagReducer from './shoppingBag';

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  shoppingBag: shoppingBagReducer,
});
export default allReducers;
