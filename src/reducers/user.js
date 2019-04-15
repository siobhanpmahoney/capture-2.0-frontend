import { LOGIN_USER } from '../actions'

export const user = (state = { id: null, username: null}, action) => {
  switch(action.type) {
    case LOGIN_USER:
      let userState = Object.assign({}, state)
      userState["id"] = action.payload.id
      userState["username"] = action.payload.username
      state = userState
      return state;

    default:
      return state;
  }
}
