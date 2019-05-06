import { SET_TOKEN, SET_CURRENT_USER } from '../actions'

export const auth = (state = { jwt_token: null}, action) => {
  switch(action.type) {
    case SET_TOKEN:
      let tokenStateStart = Object.assign({}, state)
      tokenStateStart['jwt_token'] = action.payload.jwt_token
      state = tokenStateStart
      return state

    default:
      return state;
  }
}
