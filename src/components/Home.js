import React from 'react'
import {Redirect, withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../wrappers/WithAuth'
import {fetchJobAppsAction,fetchJobAppsAction2} from '../actions'
import {convertAttrStrForDisplay} from '../utils/pref_regex'
import {searchJobRequest} from '../services/the_muse_api'

import JobList from './jobs/JobList'

class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      jobList: [],
      resPageCount: 0,
    }
  }

  componentDidMount() {
    const params = this.convertsAttrToObj()
    this.fetchesjobList(params, 1)
  }


// converting user preference attributes to object
  convertsAttrToObj = () => {
    const {pref_locations, pref_categories, pref_levels} = this.props.user
    return convertAttrStrForDisplay({location: pref_locations, category: pref_categories, level: pref_levels})
  }

  fetchesjobList = (params, pageNumber) => {
    searchJobRequest(params, pageNumber)
    .then(response => {
      let res = this.formatsJobResultsObj(response.results)
      let museLookUp = {}
      res.forEach((r) => museLookUp[r.muse_id] = true )
      return this.setState({
        jobList: [...this.state.jobList,...res],
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
            <JobList jobList = {this.state.jobList} />
          </div>

        </div>
      )
    }
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    job_apps: state.job_apps,
    appDataArray: state.job_apps && state.job_apps.appDataArray,
    appIndexedDataHash: state.job_apps && state.job_apps.appIndexedDataHash,
    appIdJobIdHash: state.job_apps && state.job_apps.appIdJobIdHash,
    jobIdAppIdHash: state.job_apps && state.job_apps.jobIdAppIdHash,

    jobIndexedDataHash: state.job_apps && state.job_apps.jobIndexedDataHash,
    museIdJobIdHash: state.job_apps && state.job_apps.museIdJobIdHash,
    jobIdMuseIdHash: state.job_apps && state.job_apps.jobIdMuseIdHash
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchJobAppsAction2}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(Home)))
