import {combineReducers} from 'redux'
import {user} from './user'

const rootReducer = combineReducers({
  user,
  // other reducers
});

export default rootReducer;
