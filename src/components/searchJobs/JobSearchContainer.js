import React from 'react'
import {Redirect, withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../../wrappers/WithAuth'
import {fetchJobAppsAction, fetchJobAppsAction2} from '../../actions'
import {extractJobDataForDisplay} from '../../services/data_parsers'
import {convertAttrStrForDisplay, convertDisplayToQueryParam} from '../../utils/pref_regex'
import {searchJobRequest} from '../../services/the_muse_api'
import JobSearchForm from './JobSearchForm'
import JobSearchList from './JobSearchList'


class JobSearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchJobAppsAction2()
    this.state = {
      resultPageCount: 0,
      currentPage: null,
      loadingState: true,
      jobResultArr: [],
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
    if (!!this.props.user) {
      const defaultPreferences = this.userPreferenceParser()
      const filterState =  Object.assign({}, defaultPreferences)
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


  updateJobSearchState = (pageNo) => {
    const pref = Object.assign({}, this.state.selectedFilters)
    this.queryTheMuseJobsAPI(pref, pageNo, {})
    .then(response => this.setState({
      jobResultArr: response.jobResultArr,
      museIds: response.museIds,
      resultPageCount: response.pageCount,
      loadingState: false
    }))
  }

  queryTheMuseJobsAPI = (userPref, pageCount, museIdsToCheck) => {
    return searchJobRequest(userPref, pageCount)
    .then(response => {
      const res = this.createJobArrForState(response.results, museIdsToCheck)
      return {pageCount: response.page_count, jobResultArr: res.jobsForState, museIds: res.idsForState}
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

  formListener = (event, criteria) => {
    let name = criteria
    let vals = event.map((e) => e.value)
    let filterState = Object.assign({}, this.state.selectedFilters)

    filterState[criteria] = vals

    this.setState({
      selectedFilters: filterState,
      jobResultArr: [],
      museIds: {},
      resultPageCount: 0,
    },() => this.updateJobSearchState(1))
  }


  render() {
    if (!!this.state.loadingState) {
      return (
        <div>loading</div>
      )
    } else {
      const appDataArray = this.props.job_apps.appDataArray
      const appIndexedDataHash = this.props.job_apps.appIndexedDataHash
      const appIdJobIdHash = this.props.job_apps.appIdJobIdHash
      const jobIdAppIdHash = this.props.job_apps.jobIdAppIdHash
      const jobIndexedDataHash = this.props.job_apps.jobIndexedDataHash
const museIdJobIdHash = this.props.job_apps.museIdJobIdHash
const jobIdMuseIdHash = this.props.job_apps.jobIdMuseIdHash

      console.log("appDataArray", appDataArray)
      console.log("appIndexedDataHash", appIndexedDataHash)
      console.log("appIdJobIdHash", appIdJobIdHash)
      console.log("jobIdAppIdHash", jobIdAppIdHash)

      console.log("jobIndexedDataHash", jobIndexedDataHash,)
      console.log("museIdJobIdHash", museIdJobIdHash,)
      console.log("jobIdMuseIdHash", jobIdMuseIdHash)

      return (

        <div className="job-search-container">
          <h1>Result Count: {this.state.jobResultArr.length}</h1>
          <JobSearchForm selectedFilters={this.state.selectedFilters} formListener={this.formListener} />
          <JobSearchList jobSearchResults = {this.state.jobResultArr} theMuseJobIdSavedStatusHash = {this.props.job_apps.theMuseJobIdSavedStatusHash} />


        </div>
      )
    }
  }
}

function mapStateToProps(state, props) {

  return {
    user: state.user,
    job_apps: state.job_apps,
    theMuseJobIdSavedStatusHash: state.job_apps && state.job_apps.theMuseJobIdSavedStatusHash
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchJobAppsAction, fetchJobAppsAction2}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(JobSearchContainer)))
