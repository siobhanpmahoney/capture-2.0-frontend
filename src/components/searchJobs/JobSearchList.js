import React from 'react'
import JobSearchListItem from './JobSearchListItem'
import {createAppAction} from '../../actions'
import { bindActionCreators } from 'redux';
import {withRouter, Link} from 'react-router-dom'

import { connect } from 'react-redux';
import WithAuth from '../../wrappers/WithAuth'


const JobSearchList = (props) => {
  if (!!props.museIdJobIdHash) {
    return (
      <div className="job-search-list">
        {props.jobSearchResults.map((j) => {
          let app = !!props.museIdJobIdHash[j.muse_id] ? props.appIndexedDataHash[props.jobIdAppIdHash[props.museIdJobIdHash[j.muse_id]]] : null
          let appId = (!!app && app.id) ? app.id : null
          return <JobSearchListItem job={j} app = {app} key={j.muse_id} saved={!!props.museIdJobIdHash[j.muse_id]} appId = {appId}/>
        })}

      </div>
    )
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
  return bindActionCreators({createAppAction}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(JobSearchList)))
