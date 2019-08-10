import React from 'react'
import {Redirect, withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../../wrappers/WithAuth'
import {fetchJobAppsAction2} from '../../actions'
import {extractJobDataForDisplay} from '../../services/data_parsers'
import {convertAttrStrForDisplay, convertDisplayToQueryParam} from '../../utils/pref_regex'
import JobSearchForm from './JobSearchForm'
import JobList from './JobList'

class SavedJobsPageContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      jobList: [],
      loadingState: true
    }
  }

  componentDidMount() {
    this.props.fetchJobAppsAction2()
    .then(res => {
      return this.props.appDataArray.map((app) => {
        return this.props.jobIndexedDataHash[app.job_id]
      })
    })
    .then(jobs => {
      return this.setState({
        jobList: jobs
      }, this.updateLoadingState)
    })
  }

  updateLoadingState = () => {
    debugger
    let newLoadingState = !this.state.loadingState
    this.setState({
      loadingState: newLoadingState
    })
  }


  render() {
    if (!!this.state.loadingState) {
      return (
        <div>loading</div>
      )
    } else {
    return (
      <div>
        <h2> saved jobs, yo </h2>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(SavedJobsPageContainer)))
