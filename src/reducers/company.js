import {CREATE_COMPANY} from '../actions'

export const companies = (state = {companies: []}, action) => {
  switch(action.type) {

    case CREATE_COMPANY:
      state["companies"] = [...state["companies"], action.payload]
      return state


    default:
      return state;
  }
}
