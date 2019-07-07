// {
//   level: "Internship|Entry+Level",
//   location: "Brooklyn%2C+NY|New+York%2C+NY|San+Francisco%2C+CA",
//   category: "Creative+%26+Design|Data+Science|Engineering|Project+%26+Product+Management"
// }

//convert usr pref attributes into query params for theMuseAPI
export const convertAttrStrForQuery = (attributeObj) => {
  return Object.keys(attributeObj).map((k) => {
    if (attributeObj[k] != null) {
      return _helperConvertAttrStrForQuery(k, attributeObj[k])
    }
  }).filter((i) => !!i).join("&")
}

const _helperConvertAttrStrForQuery = (queryKey, attributeString) => {
    let string = `${queryKey}=${attributeString}`
    return string.split("|").join(`&${queryKey}=`)
}



// convert user pref attributes into arrays with readable strings for UI

// ex: {category: "Creative+%26+Design|Data+Science|Engineering"} => {category: ["Creative & Design", "Data Science", "Engineering"]}
export const convertAttrStrForDisplay = (attributeObj) => {
  let transformedObj = {}
  Object.keys(attributeObj).map((k) => {
    if (!attributeObj[k]) {
        transformedObj[k] = []
    } else {
      transformedObj[k] = _helperConvertAttrStrForDisplay(attributeObj[k])
    }
  })
  return transformedObj
}

const _helperConvertAttrStrForDisplay = (str) => {
  return str
  .replace(/["+"]+/g," ")
  .replace(/\%26+/g, "&")
  .replace(/\%2C+/g, ",")
  .split("|")
}


// convert UI preferences into query params
export function convertDisplayToQueryParam (criteriaObj) {
  let queryStr = ""
   Object.keys(criteriaObj).forEach((criteria) => {
    if (Array.isArray(criteriaObj[criteria])) {
     let str = (criteriaObj[criteria].map((c) => _helperConvertDisplayToQueryParam(criteria, c)))
     queryStr =  queryStr + str.join("")
    }
  })
  return queryStr
}

const _helperConvertDisplayToQueryParam = (param, value) => {
  let regexed = value
  .replace(/[\s]+/g,"+")
    .replace(/[&]+/g, "%26")
    .replace(/[,]+/g, "%2C")
  return `&${param}=${regexed}`
}
