import { SET_CURRENT_USER } from '../actions'

export const user = (state = { id: null, username: null}, action) => {
  switch(action.type) {

    case SET_CURRENT_USER:
      let user_state = Object.assign({}, state)
      console.log("")
      console.log("")
      console.log("")
      console.log("in SET_CURRENT_USER action — BEGIN")
      console.log("")
      console.log("")
      console.log("user_state", user_state)
      console.log("action.payload.json", action.payload)

      user_state = action.payload.user
      state = Object.assign({}, user_state)
      console.log("")
      console.log("")
      console.log("in SET_CURRENT_USER action — END")
      console.log("")
      console.log("")
      console.log("")
      return state
      // userState["id"] = action.payload.id
      // userState["username"] = action.payload.username
      // state = userState
      // return state;

    default:
      return state;
  }
}
