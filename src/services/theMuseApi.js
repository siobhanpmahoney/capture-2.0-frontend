import {MUSE_KEY} from './keys.js'
import {convertDisplayToQueryParam} from '../utils/pref_regex'

const MUSE_API = `https://www.themuse.com/api/public/jobs?api_key=${MUSE_KEY}`


// param obj as arg
export const searchJobRequest = (param_obj) => {
  console.log(param_obj)
  let params = convertDisplayToQueryParam(param_obj)
  console.log("params", params)
  let url = `${MUSE_API}&page=1${params}`
  console.log(url)
}


// db => UI (state) => query param
