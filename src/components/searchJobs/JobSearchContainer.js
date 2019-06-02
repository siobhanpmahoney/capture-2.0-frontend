import React from 'react'
import {Redirect, withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../../wrappers/WithAuth'
import {fetchJobAppsAction} from '../../actions'
import {convertAttrStrForDisplay} from '../../utils/pref_regex'
import {searchJobRequest} from '../../services/theMuseApi'

// hold state —> search pref., etc.

class JobSearchContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      allJobResultsArr: [],
      jobFilterDetailsObj: {}
    }
  }

  componentDidMount() {
    this.getJobSearchResult()
  }

  getJobSearchResult = () => {
    let resultsCount
    const userPref = this.convertsAttrToObj()
    searchJobRequest(userPref, 1)
    .then(response => {
      resultsCount = response.page_count
      return response
    })
    .then(res => {
      let i = 1
      // capture response from API call in TEMP_VARS:
      let addingToJobListState = []
      let addingToDetailState = {}

      while (i < resultsCount) {
        searchJobRequest(userPref, i)
        .then(jobs => {
          for (let j of jobs.results) {

      // saving to TEMP_VARS
            addingToJobListState.push(j)
            addingToDetailState[j.id] = {
              savedStatus: !!this.props.job_apps.theMuseAppHash[j.id],
              datePosted: Date.parse(j.publication_date)
            }

          }
        })
        i++
      }

      // TO DO: add TEMP_VARS to state and return state
      // this.setState({
      //
      // })
      console.log("state at end", this.state)
      return
    })
   }




// helper fn
  convertsAttrToObj = () => {
    const {pref_locations, pref_categories, pref_levels} = this.props.user
    return convertAttrStrForDisplay({location: pref_locations, category: pref_categories, level: pref_levels})
  }



  render() {
    console.log(this.state)
    console.log("getting hash from redux state?", this.props.theMuseAppHash)
    return (
      <div className="job-search-container">
        Job Search Container
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    job_apps: state.job_apps,
    theMuseAppHash: state.job_apps && state.job_apps.theMuseAppHash
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchJobAppsAction}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(JobSearchContainer)))
