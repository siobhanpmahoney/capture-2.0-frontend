import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router'

import WithAuth from '../wrappers/WithAuth'
import {fetchJobAppsAction,fetchJobAppsAction2} from '../actions'
import {convertAttrStrForDisplay} from '../utils/pref_regex'
import {searchJobRequest} from '../services/the_muse_api'

import JobList from './jobs/JobList'

class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      jobSearchResults: [],
      resPageCount: 0,
    }
  }

  componentDidMount() {
    const params = this.convertsAttrToObj()
    this.fetchesJobSearchResults(params, 1)
  }


// converting user preference attributes to object
  convertsAttrToObj = () => {
    const {pref_locations, pref_categories, pref_levels} = this.props.user
    return convertAttrStrForDisplay({location: pref_locations, category: pref_categories, level: pref_levels})
  }

  fetchesJobSearchResults = (params, pageNumber) => {
    searchJobRequest(params, pageNumber)
    .then(response => {
      let res = this.formatsJobResultsObj(response.results)
      let museLookUp = {}
      res.forEach((r) => museLookUp[r.muse_id] = true )
      return this.setState({
        jobSearchResults: [...this.state.jobSearchResults,...res],
        resPageCount: response.page_count,
        museLookUp: Object.assign({}, this.state.museLookUp, museLookUp)
      })
    })
  }

  // add results pages to state?
  // check if state < 20 items
  // check if page number is > 1
  // repeat fetch and check against saved jobs and add to state until state.length === 20

  formatsJobResultsObj = (response) => {
    return response.map((r) => {
      if (!this.props.job_apps.museIdJobIdHash[r.id]) {
        return {
          name: r.name,
          landing_page: r.refs.landing_page,
          publication_date: new Intl.DateTimeFormat('en-US').format(new Date(r.publication_date)),
          muse_id: r.id,
          locations: r.locations.map((l) => l.name).join(" / "),
          levels: r.levels.map((l) => l.name).join( " / "),
          company_name: r.company.name,
          company_muse_id: r.company.id,
          categories: r.categories.map((m) => m.name).join( " / ")
        }
      } else {
        return
      }
    }).filter((i) => !!i) // note: does NOT include contents: r.contents,
  }


  render() {
    if(!this.props.job_apps) {
      return <div> Loading...</div>
    }
    else {
      return (
        <div>
          <div className="section-browse-jobs">
            <h3 className="section-header browse-jobs-section-header">Browse Jobs</h3>
            <JobList jobSearchResults = {this.state.jobSearchResults} />
          </div>

        </div>
      )
    }
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    job_apps: state.job_apps
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchJobAppsAction2}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(Home)))
