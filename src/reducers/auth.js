import { SET_TOKEN } from '../actions'

export const auth = (state = { jwt_token: null}, action) => {
  switch(action.type) {
    case SET_TOKEN:
      let tokenStateStart = Object.assign({}, state)
      tokenStateStart['jwt_token'] = action.payload
      console.log("in auth reducer")
      console.log("action.payload: ", action.payload)
      state = tokenStateStart
      return state

    default:
      return state;
  }
}