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
