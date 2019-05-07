const API_ROOT = 'http://localhost:3000/api/v1'

// const token = localStorage.getItem('token')
//
//
const login_headers = () => {
  return {
    'Content-Type': 'application/json',
    'Accepts': 'application/json'
  }
}


export const loginCurrentUser = (credentials) => {
  console.log("in API service fn")
  const user = {user: credentials}
  console.log("user", user)
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers: login_headers(),
    body: JSON.stringify({
      user: credentials
      // username: credentials.username,
      // password: credentials.password
    })
  }).then(res => res.json())
}

// passing JWT token to /profile, returns user data
export const fetchCurrentUser = (jwt) => {
  console.log("jwt: ", jwt)
  return fetch(`${API_ROOT}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  .then(response => response.json())
}


//
// export const login_user = (credentials) => {
//   return fetch(`${API_ROOT}/login`, {
//     method: 'POST',
//     headers: login_headers(),
//     body: JSON.stringify({
//       username: credentials.username,
//       password: credentials.password
//     })
//   }).then(res => res.json())
// }
