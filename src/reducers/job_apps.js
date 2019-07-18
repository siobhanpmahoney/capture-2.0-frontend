import {
  SET_APP_ARR,
  SET_MUSE_ID_LOOKUP,
  SET_APP_JOB_ID_LOOKUP,
  CREATE_COMPANY,
  ADD_APP_DATA_TO_APP_ARRAY,
  ADD_MUSE_ID_TO_SAVED_STATUS_HASH,
  ADD_APP_ID_TO_JOB_DATA_MAP,
  DELETE_APP_DATA_FROM_APP_ARRAY,
  DELETE_MUSE_ID_FROM_SAVED_STATUS_HASH,
  DELETE_APP_ID_FROM_JOB_DATA_MAP
} from '../actions'


// job_apps state: app, job, and interview data

// > appArray: array of all apps (job included as reference, job_id), to be used on /saved_job_list page => ex: [{app_id: 1, date_saved: 5/19/19, job_id: 1}, {app_id: 2, date_saved: 5/19/19, job_id: 2}]

// > theMuseJobIdSavedStatusHash: hash mapping muse_id to app_id for lookups on search pages => ex: {muse_id:app_id}

// > appIdJobDataMap: lookup table mapping app_id to associated job data, to be used on /saved_job_details page => ex: {1: {job_id: 1, job_title: "job title"}, app_id: {...more job data} }

// Action for each piece of state?

export const job_apps = (state = { appArray: [], theMuseJobIdSavedStatusHash: {}, appIdJobDataMap: {}}, action) => {
  switch(action.type) {

    case SET_APP_ARR:
      return {
        ...state,
        "appArray": [...state["appArray"],...action.payload],
      };

    case SET_MUSE_ID_LOOKUP:
      let museIdLookupStarter = Object.assign({}, state["theMuseJobIdSavedStatusHash"])
      return {
        ...state,
        "theMuseJobIdSavedStatusHash": Object.assign({}, museIdLookupStarter, action.payload)
      }
      // state["theMuseJobIdSavedStatusHash"] = Object.assign({}, action.payload)
      // return state

    case SET_APP_JOB_ID_LOOKUP:
      let appIdJobDataStarter = Object.assign({}, state["appIdJobDataMap"])
      return {
        ...state,
        "appIdJobDataMap": Object.assign({}, appIdJobDataStarter, action.payload)
      }

    case ADD_APP_DATA_TO_APP_ARRAY: // adds to array
      return {
        ...state,
        "appArray": [...state["appArray"], action.payload]
      };

    case ADD_MUSE_ID_TO_SAVED_STATUS_HASH:
      return {
        ...state,
        "theMuseJobIdSavedStatusHash": Object.assign({}, state["theMuseJobIdSavedStatusHash"], action.payload)
      }

    case ADD_APP_ID_TO_JOB_DATA_MAP:
      return {
        ...state,
        "appIdJobDataMap": Object.assign({}, state["appIdJobDataMap"], action.payload)
      }

    case DELETE_APP_DATA_FROM_APP_ARRAY:
      let appArrayCopy = state.appArray.slice(0)
      let jobIndex = appArrayCopy.find((app, index, appArrayCopy) => {
        if (app.id == action.payload.id) {
          return index
        }
      })

      state = Object.assign({}, state, {"appArr": [...appArrayCopy.slice(0, jobIndex),... appArrayCopy]})

      return state;


    case DELETE_MUSE_ID_FROM_SAVED_STATUS_HASH:
      let theMuseJobIdCopy = Object.assign({}, state.theMuseJobIdSavedStatusHash)

      delete theMuseJobIdCopy[action.payload.job.muse_id]
      state = Object.assign({}, {"theMuseJobIdSavedStatusHash": theMuseJobIdCopy})
      return state

    default:
      return state;
  }
}
