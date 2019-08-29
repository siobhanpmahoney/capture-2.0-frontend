import React from 'react'
import {Redirect, withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../../wrappers/WithAuth'
import {fetchJobAppsAction2} from '../../actions'
// import {extractJobDataForDisplay} from '../../services/data_parsers'
// import {convertAttrStrForDisplay, convertDisplayToQueryParam} from '../../utils/pref_regex'

const JobDetail = (props) => {
  return (
    <div className="job-detail-component">
      <div className="job-title">
        {props.job.name}
      </div>

      <div className="job-company-name">
        {props.job.company_name}
      </div>
    </div>
  )
}



function mapStateToProps(state, props) {
  return {
    user: state.user,
    // appArray: state.job_apps && state.job_apps.appArray,
    // theMuseJobIdSavedStatusHash: state.job_apps && state.job_apps.theMuseJobIdSavedStatusHash,
    // appIdJobDataMap: state.job_apps && state.job_apps.appIdJobDataMap,


    // appDataArray: state.job_apps && state.job_apps.appDataArray,
    // appIndexedDataHash: state.job_apps && state.job_apps.appIndexedDataHash,
    // appIdJobIdHash: state.job_apps && state.job_apps.appIdJobIdHash,
    // jobIdAppIdHash: state.job_apps && state.job_apps.jobIdAppIdHash,
    //
    // jobIndexedDataHash: state.job_apps && state.job_apps.jobIndexedDataHash,
    // museIdJobIdHash: state.job_apps && state.job_apps.museIdJobIdHash,
    // jobIdMuseIdHash: state.job_apps && state.job_apps.jobIdMuseIdHash
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(JobDetail)))
