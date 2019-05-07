import {loginCurrentUser, fetchCurrentUser} from '../services/api_calls'

export const SET_TOKEN = 'SET_TOKEN'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export function loginUserAction(login_credentials) {
  console.log("in login ACTION, login_credentials: ", login_credentials)
  return(dispatch) => {
    return loginCurrentUser(login_credentials)
    .then(json => {
      console.log("in loginUserAction — ")
      console.log(json)
      console.log('back in login action')
      console.log('was a jwt token returned?')
      console.log('token: ', json.jwt)
      return setTokenAction(json.jwt)
    })
  }
}

// setting jwt token in userState
export function setTokenAction(jwt) {
  return(dispatch) => {
    dispatch({
      type: SET_TOKEN,
      payload: jwt
    })
  }
}

// send request with token ==> returns user data => store in redux
export function fetchCurrentUserAction(jwt) {
  return(dispatch) => {
    return fetchCurrentUser(jwt)
    .then(json => dispatch({
      type: SET_CURRENT_USER,
      payload: json.user
    })
  )}
}
// 
// export function fetchPrice(currency) {
//   return(dispatch) => {
//     return fetchCoinPrice(currency)
//     .then(json => dispatch({
//       type: SET_PRICE,
//       coin: currency,
//       price: json.data.amount
//     }))
//   }
// }

// export function loginUserAction(user_data) {
//   return(dispatch) => {
//     dispatch({
//       type: LOGIN_USER,
//       payload: user_data
//     })
//   }
//
// }
