export const LOGIN_USER = 'LOGIN_USER'

export function loginUserAction(user_data) {
  return(dispatch) => {
    dispatch({
      type: LOGIN_USER,
      payload: user_data
    })
  }

}
