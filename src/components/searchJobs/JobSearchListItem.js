import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {createAppAction, deleteAppAction} from '../../actions'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../../wrappers/WithAuth'

const JobSearchListItem = (props) => {
  const toggleBookMark = () => {
    if (!props.saved) {
      return (
        <i className="material-icons" onClick={() => props.createAppAction(props.job, props.user.id)}>
          bookmark_border
        </i>
      )
    } else {
      return (
        <i className="material-icons" onClick={() => props.deleteAppAction(props.appId)}>
          bookmark
        </i>
      )
    }
  }


  return (
    <div className="job-search-results-item-wrapper">
      <div className="toggle-save">
        {toggleBookMark()}
      </div>

      <div className="job-card-main">
        <div className="job-list-item-company">
          {props.job.company_name}
        </div>

        <div className="job-list-item-title">
          {props.job.name}
        </div>

        <div className="job-list-item-location">
          {props.job.locations}
        </div>

      </div>

      <div className="job-card-panel">
        <div className="job-list-item-bookmark"></div>

        <div className="job-list-item-date">
          {props.job.publication_date}
        </div>

      </div>

    </div>
  )
}

function mapStateToProps(state, props) {

  return {
    user: state.user,
    job_apps: state.job_apps,
    // theMuseJobIdSavedStatusHash: state.job_apps && state.job_apps.theMuseJobIdSavedStatusHash
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createAppAction, deleteAppAction}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(JobSearchListItem)))

// export default JobSearchListItem
