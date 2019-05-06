import {combineReducers} from 'redux'
import {user} from './user'
import {auth} from './auth'

const rootReducer = combineReducers({
  user,
  auth
  // other reducers
});

export default rootReducer;
