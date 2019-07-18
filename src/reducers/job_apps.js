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
  DELETE_APP_ID_FROM_JOB_DATA_MAP,

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
ADD_TO_JOB_ID_MUSE_ID_HASH
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
        appIdJobDataMap: Object.assign({}, state["appIdJobDataMap"], action.payload)
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
































    case DELETE_APP_DATA_FROM_APP_ARRAY:


      let appArrayCopy = state.appArray.slice(0)
      let jobIndex = appArrayCopy.find((app, index, appArrayCopy) => {
        if (app.id == action.payload.id) {
          return index
        }
      })

      return Object.assign({}, state, {"appArr": [...appArrayCopy.slice(0, jobIndex),... appArrayCopy]});


    case DELETE_MUSE_ID_FROM_SAVED_STATUS_HASH:

      let theMuseJobIdCopy = Object.assign({}, state.theMuseJobIdSavedStatusHash)

      delete theMuseJobIdCopy[action.payload.job.muse_id]
      return Object.assign({}, state, {"theMuseJobIdSavedStatusHash": theMuseJobIdCopy})

    default:
      return state;
  }
}
