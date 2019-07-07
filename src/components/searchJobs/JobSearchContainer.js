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
      currentPage: null,
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
      const defaultPreferences = this.userPreferenceParser()
      const filterState =  Object.assign({}, defaultPreferences)
      this.setState({
        loadingState:true,
        selectedFilters: filterState
      }, () => this.updateJobSearchState(1))
    }
  }

  userPreferenceParser = () => {
    let parsed = {
      category: this.props.user.pref_categories,
      level: this.props.user.pref_levels,
      location: this.props.user.pref_locations,
      // industries: this.props.user.pref_industries
    }
    return convertAttrStrForDisplay(parsed)  // parsed = {category: "Creative+%26+Design|Data+Science|Engineering",}

  }


  updateJobSearchState = (pageNo) => {
    const pref = Object.assign({}, this.state.selectedFilters)
    this.queryTheMuseJobsAPI(pref, pageNo, {})
    .then(response => this.setState({
      jobResultArr: response.jobResultArr,
      museIds: response.museIds,
      resultPageCount: response.pageCount,
      loadingState: false
    }))
  }

  queryTheMuseJobsAPI = (userPref, pageCount, museIdsToCheck) => {
    return searchJobRequest(userPref, pageCount)
    .then(response => {
      console.log(response.results)
      const res = this.createJobArrForState(response.results, museIdsToCheck)
      return {pageCount: response.page_count, jobResultArr: res.jobsForState, museIds: res.idsForState}
    })
  }

  createJobArrForState = (searchResults, museIdsToCheck) => {
    let museIds2 = Object.assign({}, museIdsToCheck)
    let job_data = []
    for (let j of searchResults) {
      if (!museIds2[j.id] && !this.state.museIds[j.id]) {
        museIds2[j.id] = true
        let data = job_data.slice(0)
        job_data = [...data, this.extractJobData(j)]
      }
    }
    return Object.assign({}, {jobsForState: job_data, idsForState: museIds2})
  }

  extractJobData = (j) => {
    return {
      name: j.name,
      landing_page: j.refs.landing_page,
      publication_date: new Intl.DateTimeFormat('en-US').format(new Date(j.publication_date)),
      muse_id: j.id,
      locations: j.locations.map((l) => l.name).join(" / "),
      levels: j.levels.map((l) => l.name).join( " / "),
      company_name: j.company.name,
      company_muse_id: j.company.id,
      categories: j.categories.map((m) => m.name).join( " / ")
    }
  }

  formListener = (event, criteria) => {
    let name = criteria
    let vals = event.map((e) => e.value)
    let filterState = Object.assign({}, this.state.selectedFilters)

    filterState[criteria] = vals

    this.setState({
      selectedFilters: filterState,
      jobResultArr: [],
      museIds: {},
      resultPageCount: 0,
    },() => this.updateJobSearchState(1))
  }




  // helper fn



  render() {
    if (!!this.state.loadingState) {
      return (
        <div>loading</div>
      )
    } else {
      return (

        <div className="job-search-container">
          <h1>Result Count: {this.state.jobResultArr.length}</h1>
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
