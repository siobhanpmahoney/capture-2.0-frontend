import {MUSE_KEY} from './keys.js'
import {convertDisplayToQueryParam} from '../utils/pref_regex'

const MUSE_API = `https://www.themuse.com/api/public/jobs?api_key=${MUSE_KEY}`


// param obj as arg
export const searchJobRequest = (param_obj, pageNo) => {
  console.log("STEP 4.2.2.1 BEGIN: In searchJobRequest utils fn — checking params: ", param_obj, pageNo)
  console.log("STEP 4.2.2.1: converting search params into query syntax", convertDisplayToQueryParam(param_obj))
  let url = `${MUSE_API}&page=${pageNo}${convertDisplayToQueryParam(param_obj)}`
  console.log("STEP 4.2.2.1 END: check url with search params", url)
  return fetch(url).then(res => res.json())
}


// db => UI (state) => query param
