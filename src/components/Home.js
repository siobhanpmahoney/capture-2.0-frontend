import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router'

import WithAuth from '../wrappers/WithAuth'
import {fetchJobAppsAction} from '../actions'
import {convertAttrStrForDisplay} from '../utils/pref_regex'
import {searchJobRequest} from '../services/theMuseApi'

import JobSearchList from './searchJobs/JobSearchList'

class Home extends React.Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    // if(this.props.user.id) {
    //   this.props.fetchJobAppsAction(this.props.user.id)
    //   .then(res => console.log("in home props", this.props.job_apps))
    // }

  }


// converting user preference attributes to object
  convertsAttrToObj = () => {
    const {pref_locations, pref_categories, pref_levels} = this.props.user
    console.log(convertAttrStrForDisplay({location: pref_locations, category: pref_categories, level: pref_levels}))
    return convertAttrStrForDisplay({location: pref_locations, category: pref_categories, level: pref_levels})
  }

  fetchesJobSearchResults = () => {
    return searchJobRequest(this.convertsAttrToObj())
  }


  render() {
    if(!this.props.job_apps) {
      return <div> Loading...</div>
    }
    else {
      this.fetchesJobSearchResults()
      const searchPref = this.convertsAttrToObj()
      return (
        <div>
          Home
          url: {this.fetchesJobSearchResults()}

          <JobSearchList searchPref={searchPref} />
        </div>
      )
    }
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    job_apps: state.job_apps
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchJobAppsAction}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(Home)))
