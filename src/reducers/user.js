import { SET_CURRENT_USER } from '../actions'

export const user = (state = { id: null, username: null}, action) => {
  switch(action.type) {

    case SET_CURRENT_USER:
      let user_state = Object.assign({}, state)
      user_state["username"] = action.payload.username
      user_state["id"] = action.paylaod.id
      state = user_state
      console.log("in SET_CURRENT_USER")
      return state
      // userState["id"] = action.payload.id
      // userState["username"] = action.payload.username
      // state = userState
      // return state;

    default:
      return state;
  }
}
