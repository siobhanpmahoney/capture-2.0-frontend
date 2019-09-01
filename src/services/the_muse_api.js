import {MUSE_KEY} from './keys.js'
import {convertDisplayToQueryParam} from '../utils/pref_regex'

const MUSE_API = `https://www.themuse.com/api/public/jobs`


// param obj as arg
export const searchJobRequest = (param_obj, pageNo) => {
  let url = `${MUSE_API}?api_key=${MUSE_KEY}&page=${pageNo}${convertDisplayToQueryParam(param_obj)}`
  return fetch(url).then(res => res.json())
}

// get single job results

export const getJobMuseData = (muse_id) => {
  let url = `${MUSE_API}/${muse_id}`
  return fetch(url).then(res => res.json())
}


// get company info

export const fetchCompanyData = (company_muse_id) => {
  let url = `https://www.themuse.com/api/public/companies/${company_muse_id}`
  return fetch(url).then(res => res.json())
}


// db => UI (state) => query param
