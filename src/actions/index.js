import {loginCurrentUser, fetchCurrentUser,fetchUserJobApps} from '../services/api_calls'
import ls from 'local-storage'


export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SET_APP_ARR = 'SET_APP_ARR'
export const SET_MUSE_ID_LOOKUP = 'SET_MUSE_ID_LOOKUP'
export const SET_APP_JOB_ID_LOOKUP = 'SET_APP_JOB_ID_LOOKUP'


// make request for user data with jwt token as param ==> returns user data => store in redux
export function fetchCurrentUserAction(jwt) {
  return(dispatch) => {
    return fetchCurrentUser(jwt)
    .then(json => dispatch({
      type: SET_CURRENT_USER,
      payload: json
    })
  )}
}

export function fetchJobAppsAction(user_id) {
  return(dispatch) => {
    return fetchUserJobApps(user_id)
    .then(json => {
      console.log("json", json)
      let theMuseAppHash = {}
      let appJobDataHash = {}

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
