import {combineReducers} from 'redux'
import {user} from './user'
import {job_apps} from './job_apps'

const rootReducer = combineReducers({
  user,
  job_apps
  // other reducers
});

export default rootReducer;
