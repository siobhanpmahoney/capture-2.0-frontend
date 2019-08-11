import React from 'react'
import JobDetail from './jobs/JobDetail'

import {withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../wrappers/WithAuth'
import {fetchJobAppsAction2} from '../actions'
import {extractJobDataForDisplay, parseCompanyDataAPIResponse} from '../services/data_parsers'
import {convertAttrStrForDisplay, convertDisplayToQueryParam} from '../utils/pref_regex'
import {searchJobRequest, getJobMuseData, fetchCompanyData} from '../services/the_muse_api'

import CompanyDetailsContainer from './companies/CompanyDetailsContainer'



// should inherit props based on saved or not:
// 1. url (/saved/:id or /search/:muse_id
// 2. components  — if saved, additional components like Applicaton Data, Saved Notes,

// bring in:
  // 1. job description,
  // 2. company info,
  // 3. application data,
  // 4. notes,
  // 5. bookmarks
//

class JobItemPageContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      job: null,
      app: null,
      company: null
    }
  }

  componentDidMount() {
    if (this.props.type == "search") {
      let job = null
      getJobMuseData(this.props.muse_id)
      .then(json => extractJobDataForDisplay(json))
      // .then(jobData => this.setState({
      //   job: jobData
      // }))
      .then(jobData => {
        return job = jobData
      })
      .then(job => fetchCompanyData(job.company_muse_id))
      .then(companyData => {
        console.log(parseCompanyDataAPIResponse(companyData))
        this.setState({
          job: job,
          company: companyData
        })
      })
    } else if (this.props.type=="saved") {
      this.setState({
        job: this.props.jobIndexedDataHash[this.props.id],
        app: this.props.appIndexedDataHash[this.props.jobIdAppIdHash[this.props.id]]
      })
    }
  }

  render() {
    if (!this.state.job) {
      return <div className="loading">loading</div>
    } else {
      return (
        <div className="job-item-page-container">
          <JobDetail job={this.state.job} app={this.state.app}/>
          <CompanyDetailsContainer company={this.state.company} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(JobItemPageContainer)))
