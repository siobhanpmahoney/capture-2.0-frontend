import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {createAppAction} from '../../actions'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../../wrappers/WithAuth'

const JobSearchListItem = (props) => {
  return (
    <div className="job-search-results-item-wrapper">
      <button onClick={() => props.createAppAction(props.job, props.user.id)}>SAVE ME</button>
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
    theMuseAppHash: state.job_apps && state.job_apps.theMuseAppHash
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createAppAction}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(JobSearchListItem)))

// export default JobSearchListItem
