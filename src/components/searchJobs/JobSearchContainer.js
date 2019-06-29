import React from 'react'
import {Redirect, withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WithAuth from '../../wrappers/WithAuth'
import {fetchJobAppsAction} from '../../actions'
import {convertAttrStrForDisplay} from '../../utils/pref_regex'
import {searchJobRequest} from '../../services/theMuseApi'

import JobSearchList from './JobSearchList'



// hold state —> search pref., etc.

// to do
// I. SEARCH FORM
// I.1.  define fn — to capture selection and save in state (#JobSearchContainer)
// I.2.  define fn — sort selection function (#JobSearchContainer)
// I.3.  define fn — apply filter and sort selections (#Container)
// I.4.  look into UI lib for form inputs? ((#JobSearchForm)
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
      selectedFilters: {
        categories: "",
        locations: "",
        industries: ""
      }
    }
  }

  componentDidMount() {
    console.log("user props", this.props.user)
    this.setState({
      loadingState:true
    }, this.getResultPageCount)
  }

  // formListener = (event) => {
  //   let name = event.target.name
  //   let val = event.target.value
  //   let filters = Object.assign({}, this.state.selectedFilters)
  //   filters[name] = [...this.state.selectedFilters[name], value]
  //   this.setState({
  //     selectedFilters: filters
  //   })
  // }


  getResultPageCount = () => {
    const userPref = this.convertsAttrToObj()
    searchJobRequest(userPref, 1)
    .then(response => {
      return response.page_count
    })
    .then(count => {
      this.setState({
        resultPageCount: count
      }, () => this.addJobResultsToState(userPref))
    })
  }

  addJobResultsToState = (userPref) => {
    let i = 1
    // capture response from API call in TEMP_VARS:
    while (i < this.state.resultPageCount+1) {
      let addingToJobListState = []
      searchJobRequest(userPref, i)
      // jobs = response from API request to page i
      .then(jobs => {
        for (let j of jobs.results) {
          // saving to TEMP_VARS
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
        return i
      })
      .then(res => {
        let listStateCopy = this.state.jobResultArr.slice(0)

        this.setState({
          jobResultArr: [...listStateCopy,...addingToJobListState]
        })
        addingToJobListState = []
      })
      i++
    }
    this.setState({
      loadingState: false
    })
  }




  // helper fn
  convertsAttrToObj = () => {
    const {pref_locations, pref_categories, pref_levels} = this.props.user
    console.log("pref_locations:", pref_locations, "pref_categories:", pref_categories, "pref_levels:", pref_levels)
    return convertAttrStrForDisplay({location: pref_locations, category: pref_categories, level: pref_levels})
  }


  render() {
    if (!!this.state.loadingState) {
      return (
        <div>loading</div>
      )
    } else {
      return (
        <div className="job-search-container">
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
