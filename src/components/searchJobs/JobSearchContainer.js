import React from 'react'
import {Redirect, withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../../wrappers/WithAuth'
import {fetchJobAppsAction} from '../../actions'
import {convertAttrStrForDisplay, convertDisplayToQueryParam} from '../../utils/pref_regex'
import {searchJobRequest} from '../../services/theMuseApi'


import JobSearchForm from './JobSearchForm'
import JobSearchList from './JobSearchList'



// hold state —> search pref., etc.

// to do
// I. SEARCH FORM

// I.2.  define fn — sort selection function (#JobSearchContainer)
// I.3.  define fn — apply filter and sort selections (#Container)
// I.5.  paginate search results

// II. BOOKMARK FEATURE
// II.1.  Create fn — toggle save/unsave item
// II.2.  Add bookmark icon
// II.3   Style bookmark icon based on status


// REFACTOR
//  create util fn — parsing theMuse API response


class JobSearchContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      resultPageCount: 0,
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
      // const parsedPref = this.userPreferenceParser()
      // const defaultPreferences = convertAttrStrForDisplay(parsedPref)
      const defaultPreferences = this.userPreferenceParser()
      const filterState =  Object.assign({}, defaultPreferences)
      this.setState({
        loadingState:true,
        selectedFilters: filterState
      }, this.getResultPageCount)
    }
  }

  userPreferenceParser = () => {

    let parsed = {
      category: this.props.user.pref_categories,
      level: this.props.user.pref_levels,
      location: this.props.user.pref_locations,
      // industries: this.props.user.pref_industries
    }
    console.log(parsed)
    return convertAttrStrForDisplay(parsed)

  }

  // convertsAttrToObj = () => {
  //   const preferences = Object.assign({}, this.state.selectedFilters)
  //   console.log("preferences", preferences)
  //   return convertAttrStrForDisplay(preferences)
  // }

  // convertsAttrToObj = () => {
  //   const {pref_locations, pref_categories, pref_levels} = this.props.user
  //   return convertAttrStrForDisplay({location: pref_locations, category: pref_categories, level: pref_levels})
  // }

  getResultPageCount = () => {
    const userPref = Object.assign({}, this.state.selectedFilters)
    console.log("userPref", userPref)
    searchJobRequest(userPref, 1)
    .then(response => {
      return response.page_count
    })
    .then(count => {
      console.log(count)
      this.setState({
        resultPageCount: count
      }, () => this.addJobResultsToState(userPref))
    })
  }

  addJobResultsToState = (userPref) => {
    let i = 1
    // capture response from API call in TEMP_VARS:
    let count = this.state.resultPageCount

    let ceiling = count > 20 ? 20 : (count + 1)
    console.log("ceiling", ceiling)
    while (i < ceiling) {
      let addingToJobListState = []
      let museIdCheck = {}

      searchJobRequest(userPref, i)
      // jobs = response from API request to page i
      .then(jobs => {
        for (let j of jobs.results) {
          if (!museIdCheck[j.id]) {
            museIdCheck[j.id] = j.id
            addingToJobListState.push({
              name: j.name,
              landing_page: j.refs.landing_page,
              publication_date: new Intl.DateTimeFormat('en-US').format(new Date(j.publication_date)),
              muse_id: j.id,
              locations: j.locations.map((l) => l.name).join(" / "),
              levels: j.levels.map((l) => l.name).join( " / "),
              company_name: j.company.name,
              company_muse_id: j.company.id,
              categories: j.categories.map((m) => m.name).join( " / ")
            })
          }

        }
        return i
      })
      .then(res => {
        let listStateCopy = this.state.jobResultArr.slice(0)
        let museIdsCopy = Object.assign({}, this.state.museIds)
        this.setState({
          jobResultArr: [...listStateCopy,...addingToJobListState],
          museIds: Object.assign({}, museIdsCopy, museIdCheck)
        })
        addingToJobListState = []
        museIdCheck = {}
      })
      i++
    }
    this.setState({
      loadingState: false
    })
  }

  formListener = (event, criteria) => {
    let name = criteria
    let vals = event.map((e) => e.value)
    let filterState = Object.assign({}, this.state.selectedFilters)

    filterState[criteria] = vals

    this.setState({
      selectedFilters: filterState
    }, this.getResultPageCount)
  }




  // helper fn



  render() {
    if (!!this.state.loadingState) {
      return (
        <div>loading</div>
      )
    } else {
          console.log(this.state.selectedFilters)
      return (

        <div className="job-search-container">
          <JobSearchForm selectedFilters={this.state.selectedFilters} formListener={this.formListener} />
          <JobSearchList jobSearchResults = {this.state.jobResultArr} theMuseAppHash = {this.props.job_apps.theMuseAppHash} />
        </div>
      )
    }
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
