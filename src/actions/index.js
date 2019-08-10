import {loginCurrentUser, fetchCurrentUser, fetchUserJobApps, fetchJobs, fetchApps, createCompany, createJob, createApp, deleteApp} from '../services/api_calls'
import ls from 'local-storage'


export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const CREATE_COMPANY = 'CREATE_COMPANY'

export const SET_APP_ARRAY = 'SET_APP_ARRAY'
export const SET_APP_INDEXED_DATA = 'SET_APP_INDEXED_DATA'
export const SET_APP_ID_JOB_ID_HASH = 'SET_APP_ID_JOB_ID_HASH'
export const SET_JOB_ID_APP_ID_HASH = 'SET_JOB_ID_APP_ID_HASH'

export const SET_JOB_INDEXED_DATA = 'SET_JOB_INDEXED_DATA'
export const SET_MUSE_ID_JOB_ID_HASH = 'SET_MUSE_ID_JOB_ID_HASH'
export const SET_JOB_ID_MUSE_ID_HASH = 'SET_JOB_ID_MUSE_ID_HASH'

export const ADD_TO_APP_ARRAY = 'ADD_TO_APP_ARRAY'
export const ADD_TO_APP_INDEXED_DATA = 'ADD_TO_APP_INDEXED_DATA'
export const ADD_TO_APP_ID_JOB_ID_HASH = 'ADD_TO_APP_ID_JOB_ID_HASH'
export const ADD_TO_JOB_ID_APP_ID_HASH = 'ADD_TO_JOB_ID_APP_ID_HASH'
export const ADD_TO_JOB_INDEXED_DATA = 'ADD_TO_JOB_INDEXED_DATA'
export const ADD_TO_MUSE_ID_JOB_ID_HASH = 'ADD_TO_MUSE_ID_JOB_ID_HASH'
export const ADD_TO_JOB_ID_MUSE_ID_HASH = 'ADD_TO_JOB_ID_MUSE_ID_HASH'

export const DELETE_FROM_APP_ARRAY = 'DELETE_FROM_APP_ARRAY'
export const DELETE_FROM_APP_INDEXED_DATA = 'DELETE_FROM_APP_INDEXED_DATA'
export const DELETE_FROM_APP_ID_JOB_ID_HASH = 'DELETE_FROM_APP_ID_JOB_ID_HASH'
export const DELETE_FROM_JOB_ID_APP_ID_HASH = 'DELETE_FROM_JOB_ID_APP_ID_HASH'
export const DELETE_FROM_JOB_INDEXED_DATA = 'DELETE_FROM_JOB_INDEXED_DATA'
export const DELETE_FROM_MUSE_ID_JOB_ID_HASH = 'DELETE_FROM_MUSE_ID_JOB_ID_HASH'
export const DELETE_FROM_JOB_ID_MUSE_ID_HASH = 'DELETE_FROM_JOB_ID_MUSE_ID_HASH'

// make request for user data with jwt token as param ==> returns user data => store in redux
export function fetchCurrentUserAction(jwt) {
  return(dispatch) => {
    return fetchCurrentUser(jwt)
    .then(json => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: json
      })
      return json.user.id;
    })
  }
}

export function fetchJobAppsAction2() {
  let appArray = []
  let appIndexedData = {}
  let appIdJobId = {}
  let jobIdAppIdHash = {}

  let jobIndexedData = {}
  let museIdJobIdHash = {}
  let jobIdMuseIdHash = {}

  return(dispatch) => {
    return fetchApps()
    .then(response => {
      appArray = response
      return fetchJobs()
      .then(res => {

        appArray.forEach((app) => {
          appIndexedData[app.id] = app
          appIdJobId[app.id] = app.job_id
          jobIdAppIdHash[app.job_id] = app.id
        })

        res.forEach((job) => {
          jobIndexedData[job.id] = job
          jobIdMuseIdHash[job.id] = job.muse_id
          museIdJobIdHash[job.muse_id] = job.id
        })

        dispatch({
          type: SET_APP_ARRAY,
          apps: appArray
        })

        dispatch({
          type: SET_APP_INDEXED_DATA,
          app_data: appIndexedData
        })

        dispatch({
          type: SET_APP_ID_JOB_ID_HASH,
          app_ids_job_ids: appIdJobId
        })

        dispatch({
          type: SET_JOB_ID_APP_ID_HASH,
          job_ids_app_ids: jobIdAppIdHash
        })

        dispatch({
          type: SET_JOB_INDEXED_DATA,
          job_data: jobIndexedData
        })

        dispatch({
          type: SET_MUSE_ID_JOB_ID_HASH,
          muse_ids_job_ids: museIdJobIdHash
        })

        dispatch({
          type: SET_JOB_ID_MUSE_ID_HASH,
          job_ids_muse_ids: jobIdMuseIdHash
        })
      })
    })
  }
}


// create new company with job's company
// create new job
// create new application
export function createAppAction(jobData, userId) {
  return(dispatch) => {
    return createCompany(jobData["company_muse_id"])
    .then(res => {
      const company_data = res
      let job = Object.assign({}, jobData, {company_id: company_data.id})
      return createJob(job)
        .then(job_data => {
          console.log("job_data: ", job_data)
          createApp({user_id: userId, job_id: job_data.id})
            .then(response => {
              let museId = job_data.muse_id
              let museIdAppIdObject = {[museId]: response["id"]}
              let appIdJobDataObject = {[response["id"]]: job_data}

              dispatch({
                type: ADD_TO_APP_ARRAY,
                app: response
              })

              dispatch({
                type: ADD_TO_APP_INDEXED_DATA,
                appData: {[response["id"]]: response}
              })

              dispatch({
                type: ADD_TO_APP_ID_JOB_ID_HASH,
                appIdJobId: {[response["id"]]: response["job_id"]}
              })

              dispatch({
                type: ADD_TO_JOB_ID_APP_ID_HASH,
                jobIdAppId: {[response["job_id"]]: response["id"]}
              })

              dispatch({
                type: ADD_TO_JOB_INDEXED_DATA,
                job_data: {[response["job_id"]]: job_data}
              })

              dispatch({
                type: ADD_TO_MUSE_ID_JOB_ID_HASH,
                muse_id_job_id: {[job_data["muse_id"]]: job_data["id"]}
              })

              dispatch({
                type: ADD_TO_JOB_ID_MUSE_ID_HASH,
                job_id_muse_id: {[job_data["id"]]: job_data["muse_id"]}
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

export function deleteAppAction(appData, userId) {
  return (dispatch) => {
    return deleteApp(appData)
    .then(response => {

      dispatch({
        type: DELETE_FROM_APP_ARRAY,
        app: response
      })

      dispatch({
        type: DELETE_FROM_APP_INDEXED_DATA,
        id: response["id"]
        // appData: {[response["id"]]: response}
      })

      dispatch({
        type: DELETE_FROM_APP_ID_JOB_ID_HASH,
        appId: response["id"]
        // appIdJobId: {[response["id"]]: response["job_id"]}
      })

      dispatch({
        type: DELETE_FROM_JOB_ID_APP_ID_HASH,
        jobID: response["job_id"]
      })

      dispatch({
        type: DELETE_FROM_JOB_INDEXED_DATA,
        jobId: response["job_id"]
      })

      dispatch({
        type: DELETE_FROM_MUSE_ID_JOB_ID_HASH,
        job_id: response["job_id"]
      })

      dispatch({
        type: DELETE_FROM_JOB_ID_MUSE_ID_HASH,
        jobId: response["job_id"]
      })
    })
  }
}


export function createCompanyAction(data) {
  return(dispatch) => {
     return createCompany(data.company_muse_id)
    .then(res => console.log(res.company))

  }
}
