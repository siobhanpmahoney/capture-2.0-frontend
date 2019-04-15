const API_ROOT = 'http://localhost:3000/api/v1'

const token = localStorage.getItem('token')


const login_headers = () => {
  return {
    'Content-Type': 'application/json',
    'Accepts': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const login_user = (credentials) => {
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers: login_headers(),
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password
    })
  }).then(res => res.json())
}
