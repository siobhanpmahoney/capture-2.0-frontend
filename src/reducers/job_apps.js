import {SET_APP_ARR, SET_MUSE_ID_LOOKUP, SET_APP_JOB_ID_LOOKUP} from '../actions'


// job_apps state: app, job, and interview data

// > appArr: array of all apps (job included as reference, job_id), to be used on /saved_job_list page
//   => ex: [{app_id: 1, date_saved: 5/19/19, job_id: 1}, {app_id: 2, date_saved: 5/19/19, job_id: 2}]
//
// > theMuseAppHash: hash mapping muse_id to app_id for lookups on search pages
//   => ex: {muse_id:app_id}
//
// > appJobDataHash: lookup table mapping app_id to associated job data, to be used on /saved_job_details page
//   => ex: {1: {job_id: 1, job_title: "job title"}, app_id: {...more job data} }

// Action for each piece of state?

export const job_apps = (state = { appArr: [], theMuseAppHash: {}, appJobDataHash: {}}, action) => {
  switch(action.type) {

    case SET_APP_ARR:
      console.log("in set app arr")
      state["appArr"] = [...state["appArr"],...action.payload]
      console.log("set app arr", state)
      return state

    case SET_MUSE_ID_LOOKUP:
      state["theMuseAppHash"] = Object.assign({}, action.payload)
      return state

    case SET_APP_JOB_ID_LOOKUP:
      state["appJobDataHash"] = Object.assign({}, action.payload)
      return state

    default:
      return state;
  }
}
