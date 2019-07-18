import {loginCurrentUser, fetchCurrentUser, fetchUserJobApps, fetchJobs, fetchApps, createCompany, createJob, createApp, deleteApp} from '../services/api_calls'
import ls from 'local-storage'


export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SET_APP_ARR = 'SET_APP_ARR'
export const SET_MUSE_ID_LOOKUP = 'SET_MUSE_ID_LOOKUP'
export const SET_APP_JOB_ID_LOOKUP = 'SET_APP_JOB_ID_LOOKUP'
export const CREATE_COMPANY = 'CREATE_COMPANY'
export const ADD_APP_DATA_TO_APP_ARRAY = 'ADD_APP_DATA_TO_APP_ARRAY'
export const ADD_MUSE_ID_TO_SAVED_STATUS_HASH = 'ADD_MUSE_ID_TO_SAVED_STATUS_HASH'
export const ADD_APP_ID_TO_JOB_DATA_MAP = 'ADD_APP_ID_TO_JOB_DATA_MAP'
export const DELETE_APP_DATA_FROM_APP_ARRAY = 'DELETE_APP_DATA_FROM_APP_ARRAY'
export const DELETE_MUSE_ID_FROM_SAVED_STATUS_HASH = 'DELETE_MUSE_ID_FROM_SAVED_STATUS_HASH'
export const DELETE_APP_ID_FROM_JOB_DATA_MAP = 'DELETE_APP_ID_FROM_JOB_DATA_MAP'

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

// make request for user data with jwt token as param ==> returns user data => store in redux
export function fetchCurrentUserAction(jwt) {
  return(dispatch) => {
    return fetchCurrentUser(jwt)
    .then(json => {
      console.log("in fetchCurrentUserAction", json)
      dispatch({
        type: SET_CURRENT_USER,
        payload: json
      })
      return json.user.id;
    })
  }
}

export function fetchJobAppsAction(user_id) {
  console.log("amigettingcalled?")
  return(dispatch) => {
    return fetchUserJobApps(user_id)
    .then(json => {
      console.log("in fetchJobAppsAction — API response", json)
      let theMuseJobIdSavedStatusHash = {}
      let appIdJobDataMap = {}

      json["apps"].forEach((a) => {
        let muse_id = ""
        json["jobs"].find((j) => {
          if (j.id == a.job_id) {
            appIdJobDataMap[a.id] = j
            muse_id = j.muse_id
          }
        })
        theMuseJobIdSavedStatusHash[muse_id] = a.id
      })

      dispatch({
        type: SET_APP_ARR,
        payload: json["apps"]
      })

      dispatch({
        type: SET_MUSE_ID_LOOKUP,
        payload: theMuseJobIdSavedStatusHash
      })

      dispatch({
        type: SET_APP_JOB_ID_LOOKUP,
        payload: appIdJobDataMap
      })

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
          createApp({user_id: userId, job_id: job_data.id})
            .then(response => {
              let museId = job_data.muse_id
              let museIdAppIdObject = {[museId]: response["id"]}
              let appIdJobDataObject = {[response["id"]]: job_data}

              console.log("job_data", job_data)
              console.log("appIdJobDataObject", appIdJobDataObject)
              console.log("museIdAppIdObject", museIdAppIdObject)


              // dispatch({
              //   type: ADD_APP_DATA_TO_APP_ARRAY,
              //   payload: job_data
              // })
              //
              // dispatch({
              //   type: ADD_MUSE_ID_TO_SAVED_STATUS_HASH,
              //   payload: museIdAppIdObject
              // })
              //
              // dispatch({
              //   type: ADD_APP_ID_TO_JOB_DATA_MAP,
              //   payload: appIdJobDataObject
              // })




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
      console.log(response)
      dispatch({
        type: DELETE_APP_DATA_FROM_APP_ARRAY,
        payload: response
      })

      dispatch({
        type: DELETE_MUSE_ID_FROM_SAVED_STATUS_HASH,
        payload: response
      })

      dispatch({
        type: DELETE_APP_ID_FROM_JOB_DATA_MAP,
        payload: response
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
