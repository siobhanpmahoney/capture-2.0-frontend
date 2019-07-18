import ls from 'local-storage'
import {fetchCompanyData} from './the_muse_api'
import {parseCompanyDataAPIResponse} from './data_parsers'

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

const AUTHORIZED_HEADERS = () => {
  const jwt = ls.get('jwt_token')
  return {
    'Content-Type': 'application/json',
    'Accepts': 'application/json',
    'Authorization': `Bearer ${jwt}`
  }
}


export const loginCurrentUser = (credentials) => {
  console.log(credentials)
  const user = {user: credentials}
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
  return fetch(`${API_ROOT}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  .then(response => response.json())
}

export const fetchUserJobApps = (user_id) => {
  const url = `${API_ROOT}/users/${user_id}`
  const jwt = ls.get('jwt_token')
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  .then(response => response.json())
}

export const fetchJobs = () => {
  const url = `${API_ROOT}/jobs`
  const jwt = ls.get('jwt_token')
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  .then(response => response.json())
}

export const fetchApps = () => {
  const url = `${API_ROOT}/apps`
  const jwt = ls.get('jwt_token')
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  .then(response => response.json())
}


const getCompanyData = (company_id) => {
  return fetchCompanyData(company_id)
  .then(json => parseCompanyDataAPIResponse(json))
  .then(data => {
    return data
  })
}

export const createCompany = (company_id) => {
  return getCompanyData(company_id)
  .then(data => {
    return fetch(`${API_ROOT}/companies`, {
      method: 'POST',
      headers: AUTHORIZED_HEADERS(),
      body: JSON.stringify({company: data})
  })
  .then(response => response.json())
})
}

export const createJob = (job_params) => {
  console.log(job_params)
  const jobs_url = `${API_ROOT}/jobs`
  return fetch(jobs_url, {
    method: 'POST',
    headers: AUTHORIZED_HEADERS(),
    body: JSON.stringify({job: job_params})
  })
  .then(response => response.json())
}

// job_id, user_id
export const createApp = (app_params) => {
  const apps_url = `${API_ROOT}/apps`
  return fetch(apps_url, {
    method: 'POST',
    headers: AUTHORIZED_HEADERS(),
    body: JSON.stringify({app: app_params})
  })
  .then(response => response.json())
}

export const deleteApp = (appId) => {
  const apps_url = `${API_ROOT}/apps/${appId}`
  return fetch(apps_url, {
    method: 'DELETE',
    headers: AUTHORIZED_HEADERS(),
    body: JSON.stringify({id: appId})
  })
  .then(response => response.json())
}
