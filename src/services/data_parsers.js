// takes raw response from the muse /company/:id endpoint and parses it for saving to DB and UI display
export const parseCompanyDataAPIResponse = (api_response_data) => {
  return {
    name: api_response_data.name,
    description: api_response_data.description,
    size: api_response_data.size.name,
    locations: api_response_data.locations.map((l) => l.name.replace(/,/g, '%2C').replace(/[\s]+/g,"+")).join("|"),
    industries: api_response_data.industries.map((i) => i.name.replace(/[\s]+/g,"+").replace(/[&]+/g, "%26").replace(/[,]+/g, "%2C")).join("|"),
    twitter: api_response_data.twitter ? api_response_data.twitter : null,
    image: api_response_data.refs.f1_image,
    logo_image: api_response_data.refs.logo_image,
    muse_landing_page: api_response_data.refs.landing_page,
    muse_id: api_response_data.id
  }
}

export const extractJobDataForDisplay = (j) => {
  return {
    name: j.name,
    landing_page: j.refs.landing_page,
    publication_date: new Intl.DateTimeFormat('en-US').format(new Date(j.publication_date)),
    muse_id: j.id,
    locations: j.locations.map((l) => l.name).join(" | "),
    levels: j.levels.map((l) => l.name).join( " | "),
    company_name: j.company.name,
    company_muse_id: j.company.id,
    categories: j.categories.map((m) => m.name).join( " | "),
    contents: j.contents
  }
}



export const stripJunkWords = (phrase) => {
  return phrase.split(" ").filter((word) => {
    return word.replace(/^(according|aboard|about|is|above|absent|across|cross|after|against|again|gain|along|alongst|alongside|amid|amidst|mid|midst|among|amongst|apropos|of|apud|around|as|at|atop|ontop|bar|before|behind|ahind|below|ablow|allow|beneath|beside|besides|between|atween|beyond|ayond|but|by|circa|come|dehors|despite|spite|down|during|except|for|from|in|inside|into|less|like|minus|more|near|nearer|nearest|anear|notwithstanding|of|off|on|onto|opposite|out|outen|outside|over|pace|past|per|plus|post|save|sauf|short|since|than|through|thru|throughout|thruout|till|to|toward|towards|under|underneath|unlike|until|unto|up|upon|upside|versus|vs|via|with|within|without|worth|ago|apart|aside|away|hence|notwithstanding|on|short|through|you|yours|your|itself|its|it|they|their|the|which|what|that|something|a|an|the|either|or|and|then|as|much|after|although|as|because|before|if|that|since|so|though|unless|until|when|whenever|where|whereas|wherever|above|across|after|at|around|before|behind|below|beside|between|by|down|during|for|from|in|inside|onto|of|off|on|out|through|to|under|up|with|a|an|and|be|was)$/gi, "")
  }).map((x) => {
    return x.replace(/\W+/g, "")
  })
  .join('OR');
}
