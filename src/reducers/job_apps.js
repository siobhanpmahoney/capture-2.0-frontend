import {
  CREATE_COMPANY,
  SET_APP_ARRAY,
  SET_APP_INDEXED_DATA,
  SET_APP_ID_JOB_ID_HASH,
  SET_JOB_ID_APP_ID_HASH,
  SET_JOB_INDEXED_DATA,
  SET_MUSE_ID_JOB_ID_HASH,
  SET_JOB_ID_MUSE_ID_HASH,
  
  ADD_TO_APP_ARRAY,
  ADD_TO_APP_INDEXED_DATA,
  ADD_TO_APP_ID_JOB_ID_HASH,
  ADD_TO_JOB_ID_APP_ID_HASH,
  ADD_TO_JOB_INDEXED_DATA,
  ADD_TO_MUSE_ID_JOB_ID_HASH,
  ADD_TO_JOB_ID_MUSE_ID_HASH,

  DELETE_FROM_APP_ARRAY,
  DELETE_FROM_APP_INDEXED_DATA,
  DELETE_FROM_APP_ID_JOB_ID_HASH,
  DELETE_FROM_JOB_ID_APP_ID_HASH,
  DELETE_FROM_JOB_INDEXED_DATA,
  DELETE_FROM_MUSE_ID_JOB_ID_HASH,
  DELETE_FROM_JOB_ID_MUSE_ID_HASH
} from '../actions'


// job_apps state: app, job, and interview data

// > appArray: array of all apps (job included as reference, job_id), to be used on /saved_job_list page => ex: [{app_id: 1, date_saved: 5/19/19, job_id: 1}, {app_id: 2, date_saved: 5/19/19, job_id: 2}]

// > theMuseJobIdSavedStatusHash: hash mapping muse_id to app_id for lookups on search pages => ex: {muse_id:app_id}

// > appIdJobDataMap: lookup table mapping app_id to associated job data, to be used on /saved_job_details page => ex: {1: {job_id: 1, job_title: "job title"}, app_id: {...more job data} }



// appIds -> appId: { app object }
// jobIds => jobId: {job data }
// jobId => appId
// museId => jobId
// jobId -> museId
// appId => jobId + museId
// appArray -> [ jobIds ]
// Action for each piece of state?

export const job_apps = (state = {
  appArray: [],
  theMuseJobIdSavedStatusHash: {},
  appIdJobDataMap: {},
  appDataArray: [],
  appIndexedDataHash: {},
  appIdJobIdHash: {},
  jobIdAppIdHash: {},

  jobIndexedDataHash: {},
  museIdJobIdHash: {},
  jobIdMuseIdHash: {}
}, action) => {
  switch(action.type) {


    case SET_APP_ARRAY:
      return {
        ...state,
        "appDataArray": [...state["appDataArray"],...action.apps],
      };

    case SET_APP_INDEXED_DATA:
      return {
        ...state,
        appIndexedDataHash: Object.assign({}, action.app_data)
      }

    case SET_APP_ID_JOB_ID_HASH:
      return {
        ...state,
        appIdJobIdHash: Object.assign({}, action.app_ids_job_ids)
      }

    case SET_JOB_ID_APP_ID_HASH:
      return {
        ...state,
        jobIdAppIdHash: Object.assign({}, action.job_ids_app_ids)
      }

    case SET_JOB_INDEXED_DATA:
      return {
        ...state,
        jobIndexedDataHash: Object.assign({},
          action.job_data)
        }

    case SET_MUSE_ID_JOB_ID_HASH:
      return {
        ...state,
        museIdJobIdHash: Object.assign({}, action.muse_ids_job_ids)
      }

    case SET_JOB_ID_MUSE_ID_HASH:
      return {
        ...state,
        jobIdMuseIdHash: Object.assign({}, action.job_ids_muse_ids)
      }

    case ADD_TO_APP_ARRAY:
      return {
        ...state,
        "appDataArray": [...state["appDataArray"], action.app],
      };

    case ADD_TO_APP_INDEXED_DATA:
      return {
        ...state,
        appIndexedDataHash: Object.assign({}, state.appIndexedDataHash, action.appData)
      }

    case ADD_TO_APP_ID_JOB_ID_HASH:
      return {
        ...state,
        appIdJobIdHash: Object.assign({}, state.appIdJobIdHash, action.appIdJobId)
      }

    case ADD_TO_JOB_ID_APP_ID_HASH:
      return {
        ...state,
        jobIdAppIdHash: Object.assign({}, state.jobIdAppIdHash, action.jobIdAppId)
      }

    case ADD_TO_JOB_INDEXED_DATA:
      return {
        ...state,
        jobIndexedDataHash: Object.assign({}, state.jobIndexedDataHash,
          action.job_data)
        }


    case ADD_TO_MUSE_ID_JOB_ID_HASH:
      return {
        ...state,
        museIdJobIdHash: Object.assign({}, state.museIdJobIdHash, action.muse_id_job_id)
      }


    case ADD_TO_JOB_ID_MUSE_ID_HASH:
      return {
        ...state,
        jobIdMuseIdHash: Object.assign({}, state.jobIdMuseIdHash, action.job_id_muse_id)
      }

    // ======================
    //
    // ======================

    case DELETE_FROM_APP_ARRAY:
      let appDataArrayCopy = state.appDataArray.slice(0)
      let jobIdx = appDataArrayCopy.find((app, index, appDataArrayCopy) => {
        if (app.id == action.app.id) {
          return index
        }
      })

      return Object.assign({}, state, {"appDataArray": [...appDataArrayCopy.slice(0, jobIdx),... appDataArrayCopy.slice(jobIdx+1)]});


    case DELETE_FROM_APP_INDEXED_DATA:
      let appIndexedDataHashCopy = Object.assign({}, state.appIndexedDataHash)
      delete appIndexedDataHashCopy[action.id]
      return {
        ...state,
        appIndexedDataHash: Object.assign({}, appIndexedDataHashCopy)
      }

    case DELETE_FROM_APP_ID_JOB_ID_HASH:
      let appIdJobIdHashCopy = Object.assign({}, state.appIdJobIdHash)
      delete appIdJobIdHashCopy[action.appId]
      return {
        ...state,
        appIdJobIdHash: Object.assign({}, appIdJobIdHashCopy)
      }

    case DELETE_FROM_JOB_ID_APP_ID_HASH:
      let jobIdAppIdHashCopy = Object.assign({}, state.jobIdAppIdHash)
      delete jobIdAppIdHashCopy[action.jobId]
      return {
        ...state,
        jobIdAppIdHash: Object.assign({}, jobIdAppIdHashCopy)
      }

    case DELETE_FROM_JOB_INDEXED_DATA:
      let jobIndexedDataHashCopy = Object.assign({}, state.jobIndexedDataHash)
      delete jobIndexedDataHashCopy[action.jobId]
      return {
        ...state,
        jobIndexedDataHash: Object.assign({}, jobIndexedDataHashCopy)
      }

    case DELETE_FROM_MUSE_ID_JOB_ID_HASH:
      let muse_id = state.jobIdMuseIdHash[action.job_id]
      let museIdJobIdHashCopy = Object.assign({}, state.museIdJobIdHash)
      delete museIdJobIdHashCopy[muse_id]
      return {
        ...state,
        museIdJobIdHash: Object.assign({}, museIdJobIdHashCopy)
      }

    case DELETE_FROM_JOB_ID_MUSE_ID_HASH:
      let jobIdMuseIdHashCopy = Object.assign({}, state.jobIdMuseIdHash)
      delete jobIdMuseIdHashCopy[action.jobId]
      return {
        ...state,
        jobIdMuseIdHash: Object.assign({}, jobIdMuseIdHashCopy)
      }

        default:
        return state;
      }
    }
