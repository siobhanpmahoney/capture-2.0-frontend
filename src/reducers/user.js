import { SET_CURRENT_USER } from '../actions'

export const user = (state = { id: null, username: null}, action) => {
  switch(action.type) {

    case SET_CURRENT_USER:
      // let user_state = Object.assign({}, state)
      // user_state = action.payload.user
      state = Object.assign({}, state, action.payload.user)
      return state

    default:
      return state;
  }
}
