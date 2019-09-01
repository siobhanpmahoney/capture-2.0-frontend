import React from 'react'
import {Redirect, withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../../wrappers/WithAuth'
import {fetchJobAppsAction2} from '../../actions'
import {extractJobDataForDisplay} from '../../services/data_parsers'
import {convertAttrStrForDisplay, convertDisplayToQueryParam, convertAttrStrForQuery} from '../../utils/pref_regex'
import {searchJobRequest} from '../../services/the_muse_api'
import JobSearchForm from './JobSearchForm'
import JobList from './JobList'


class SearchJobsPageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchJobAppsAction2()
    this.state = {
      resultPageCount: 0,
      currentPage: null,
      loadingState: true,
      jobList: [],
      museIds: {},
      selectedFilters: {
        category: null,
        location: null,
        // industries: [],
        level: null
      }
    }
  }

  componentDidMount() {

    let search = this.props.location.search
    let params = new URLSearchParams(search)

    if (!!this.props.user) {
      // const defaultPreferences = this.userPreferenceParser()
      // const filterState =  Object.assign({}, defaultPreferences)
      let filterState = {}
      for (let k of params.keys()) {
        filterState[k] = params.getAll(k)
      }
      console.log(filterState)
      this.setState({
        loadingState:true,
        selectedFilters: filterState
      }, () => this.updateJobSearchState(1))
    }
  }

  userPreferenceParser = () => {
    let parsed = {
      category: this.props.user.pref_categories,
      level: this.props.user.pref_levels,
      location: this.props.user.pref_locations,
      // industries: this.props.user.pref_industries
    }
    return convertAttrStrForDisplay(parsed)  // parsed = {category: "Creative+%26+Design|Data+Science|Engineering",}

  }


// listens to changes made in search form => passes criteria to this.updateJobSearchState() to make call to theMuse API with updated criteria
  formListener = (event, criteria) => {
    let name = criteria
    let vals = !!event ? event.map((e) => e.value) : []

    let filterState = Object.assign({}, this.state.selectedFilters)
    filterState[criteria] = vals

    this.setState({
      selectedFilters: filterState,
      jobList: [],
      museIds: {},
      resultPageCount: 0,
    },() => this.updateJobSearchState(1))
  }


// updates jobList state based on search results
  updateJobSearchState = (pageNo) => {
    let queryString = convertDisplayToQueryParam(this.state.selectedFilters)
    this.props.history.replace(`/jobs/search?${queryString.slice(1)}`)
    const pref = Object.assign({}, this.state.selectedFilters)
    this.queryTheMuseJobsAPI(pref, pageNo, {})
    .then(response => this.setState({
      jobList: response.jobList,
      museIds: response.museIds,
      resultPageCount: response.pageCount,
      loadingState: false
    }))
  }

  addSearchParamsToRouter = () => {
    if (!!this.state.loadingState) {

    }
  }

// helper fn that calls servicefn making call to the MuseAPI
  queryTheMuseJobsAPI = (userPref, pageCount, museIdsToCheck) => {
    return searchJobRequest(userPref, pageCount)
    .then(response => {
      const res = this.createJobArrForState(response.results, museIdsToCheck)
      return {pageCount: response.page_count, jobList: res.jobsForState, museIds: res.idsForState}
    })
  }

  createJobArrForState = (searchResults, museIdsToCheck) => {
    let museIds2 = Object.assign({}, museIdsToCheck)
    let job_data = []
    for (let j of searchResults) {
      if (!museIds2[j.id] && !this.state.museIds[j.id]) {
        museIds2[j.id] = true
        let data = job_data.slice(0)
        job_data = [...data, extractJobDataForDisplay(j)]
      }
    }
    return Object.assign({}, {jobsForState: job_data, idsForState: museIds2})
  }




  render() {
    if (!!this.state.loadingState) {
      return (
        <div>loading</div>
      )
    } else {
      return (

        <div className="job-search-container">
          <h1>Result Count: {this.state.jobList.length}</h1>
          <JobSearchForm selectedFilters={this.state.selectedFilters} formListener={this.formListener} />
          <JobList jobList = {this.state.jobList} museIdJobIdHash={this.props.museIdJobIdHash} />


        </div>
      )
    }
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    // appArray: state.job_apps && state.job_apps.appArray,
    // theMuseJobIdSavedStatusHash: state.job_apps && state.job_apps.theMuseJobIdSavedStatusHash,
    // appIdJobDataMap: state.job_apps && state.job_apps.appIdJobDataMap,


    appDataArray: state.job_apps && state.job_apps.appDataArray,
    appIndexedDataHash: state.job_apps && state.job_apps.appIndexedDataHash,
    appIdJobIdHash: state.job_apps && state.job_apps.appIdJobIdHash,
    jobIdAppIdHash: state.job_apps && state.job_apps.jobIdAppIdHash,

    jobIndexedDataHash: state.job_apps && state.job_apps.jobIndexedDataHash,
    museIdJobIdHash: state.job_apps && state.job_apps.museIdJobIdHash,
    jobIdMuseIdHash: state.job_apps && state.job_apps.jobIdMuseIdHash
  }
  // return {
  //   user: state.user,
  //   job_apps: state.job_apps,
  //   theMuseJobIdSavedStatusHash: state.job_apps && state.job_apps.theMuseJobIdSavedStatusHash
  // }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchJobAppsAction2}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(SearchJobsPageContainer)))
