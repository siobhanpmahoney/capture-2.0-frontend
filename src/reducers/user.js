import { SET_CURRENT_USER } from '../actions'

export const user = (state = { id: null, username: null}, action) => {
  switch(action.type) {

    case SET_CURRENT_USER:
      let user_state = Object.assign({}, state)
      user_state = action.payload.user
      state = Object.assign({}, user_state)
      return state

    default:
      return state;
  }
}
