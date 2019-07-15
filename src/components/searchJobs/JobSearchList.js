import React from 'react'
import JobSearchListItem from './JobSearchListItem'
import {createAppAction} from '../../actions'
import { bindActionCreators } from 'redux';
import {withRouter, Link} from 'react-router-dom'

import { connect } from 'react-redux';
import WithAuth from '../../wrappers/WithAuth'


const JobSearchList = (props) => {
  return (
    <div className="job-search-list">
      {props.jobSearchResults.map((j) => {
        return <JobSearchListItem job={j} key={j.muse_id} saved={!!props.theMuseJobIdSavedStatusHash[j.muse_id]} />
      })}

    </div>
  )
}

function mapStateToProps(state, props) {

  return {
    user: state.user,
    job_apps: state.job_apps,
    theMuseJobIdSavedStatusHash: state.job_apps && state.job_apps.theMuseJobIdSavedStatusHash
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createAppAction}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(JobSearchList)))
