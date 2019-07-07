import {loginCurrentUser, fetchCurrentUser,fetchUserJobApps, createCompany, createJob, createApp} from '../services/api_calls'
import ls from 'local-storage'


export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SET_APP_ARR = 'SET_APP_ARR'
export const SET_MUSE_ID_LOOKUP = 'SET_MUSE_ID_LOOKUP'
export const SET_APP_JOB_ID_LOOKUP = 'SET_APP_JOB_ID_LOOKUP'
export const CREATE_COMPANY = 'CREATE_COMPANY'
export const CREATE_JOB_APP = 'CREATE_JOB_APP'

// make request for user data with jwt token as param ==> returns user data => store in redux
export function fetchCurrentUserAction(jwt) {
  return(dispatch) => {
    return fetchCurrentUser(jwt)
    .then(json => {
      console.log(json)
      dispatch({
        type: SET_CURRENT_USER,
        payload: json
      })
      return json.user.id;
    })
  }
}

export function fetchJobAppsAction(user_id) {
  return(dispatch) => {
    return fetchUserJobApps(user_id)
    .then(json => {
      let theMuseAppHash = {}
      let appJobDataHash = {}
      console.log(json)
      json["apps"].forEach((a) => {
        let muse_id = ""
        json["jobs"].find((j) => {
          if (j.id == a.job_id) {
            appJobDataHash[a.id] = j
            muse_id = j.muse_id
          }
        })
        theMuseAppHash[muse_id] = a.id
      })

      dispatch({
        type: SET_APP_ARR,
        payload: json["apps"]
      })

      dispatch({
        type: SET_MUSE_ID_LOOKUP,
        payload: theMuseAppHash
      })

      dispatch({
        type: SET_APP_JOB_ID_LOOKUP,
        payload: appJobDataHash
      })

    })
  }
}


// create new company with job's company
// create new job
// create new application
export function createAppAction(jobData, userId) {
  return(dispatch) => {
    console.log(jobData)
    return createCompany(jobData["company_muse_id"])
    .then(res => {
      console.log(res)
      const company_data = res
      console.log("company created on backend", company_data)
      console.log("id to pass in", company_data.id)
      let job = Object.assign({}, jobData, {company_id: company_data.id})
      return createJob(job)
        .then(job_data => {
          console.log(job_data)
          console.log({user_id: userId, job_id: job_data.id})
          createApp({user_id: userId, job_id: job_data.id})
            .then(response => {
              dispatch({
                type: CREATE_JOB_APP,
                payload: job_data
              })

              dispatch({
                type: CREATE_COMPANY,
                payload: company_data
              })
            })
        })
     })
  }
}


export function createCompanyAction(data) {
  // console.log(data.company_muse_id)
  return(dispatch) => {
     return createCompany(data.company_muse_id)
    .then(res => console.log(res.company))
    // .then(company_json => {
    //   console.log("company_json")
    //   dispatch({
    //     type: CREATE_COMPANY,
    //     payload: company_json
    //   })
    // })
  }
}
