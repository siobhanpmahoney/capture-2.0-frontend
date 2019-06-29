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

class JobSearchContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      resultsPageCount: 0,
      loadingState: true,
      allJobResultsArr: [],
      jobFilterDetailsObj: {}
    }
  }

  componentDidMount() {
    this.getJobSearchResult()
  }

  getJobSearchResult = () => {
    const userPref = this.convertsAttrToObj()
    searchJobRequest(userPref, 1)
    .then(response => {
      console.log("step 1: get results page count")
      console.log("response — ", response)
      console.log(response.page_count)
      return response.page_count
    })
    .then(count => {
      this.setState({
        resultsPageCount: count
      }, () => this.addToStateHelper(userPref))
    })
  }

  addToStateHelper = (userPref) => {
    let i = 1
    console.log("step 2: make API call for each page of results")
    console.log("page count: ", this.state.resultsPageCount)
    // capture response from API call in TEMP_VARS:


    while (i < this.state.resultsPageCount+1) {
      let addingToJobListState = []
      let addingToDetailState = {}
      searchJobRequest(userPref, i)

      // jobs = response from API request to page i
      .then(jobs => {
        console.log(`step 2.2: getting results from page ${i}`)
        console.log("jobs: ", jobs)
        for (let j of jobs.results) {
          console.log("step 3: adding each job to list to render")
          console.log("job getting added: ", j)
          // saving to TEMP_VARS
          addingToJobListState.push(j)
          console.log("step 3.1: adding job to display state")
          console.log(`display state after ${j.name} (id: ${j.id}) gets added`)

          console.log(`step 3.2: adding filtering criteria for ${j.name} (id: ${j.id}) to displayState`)
          addingToDetailState[j.id] = {
            savedStatus: !!this.props.job_apps.theMuseAppHash[j.id],
            datePosted: Date.parse(j.publication_date)
          }

          console.log(`${j.name} (id: ${j.id}) as saved in filter state: `, addingToDetailState[j.id])
          console.log(`entire filter state after adding ${j.name} (id: ${j.id}): `)

        }
        return i
      })
      .then(res => {
        let listStateCopy = this.state.allJobResultsArr.slice(0)
        let filterCopy = Object.assign({}, this.state.jobFilterDetailsObj)
        console.log(addingToJobListState)
        console.log(addingToDetailState)

        this.setState({
          allJobResultsArr: [...listStateCopy,...addingToJobListState],
          jobFilterDetailsObj: Object.assign({}, filterCopy, addingToDetailState)
        }, () => console.log("Step 5000: HERE updated state"))
        addingToJobListState = []
        addingToDetailState = {}
      })


        i++


    }

      // if (i > this.state.resultsPageCount) {
        this.setState({
          loadingState: false
        })
      // }








    // TO DO: add TEMP_VARS to state and return state
    // this.setState({
    //
    // })
  }




  // helper fn


  convertsAttrToObj = () => {
    const {pref_locations, pref_categories, pref_levels} = this.props.user
    return convertAttrStrForDisplay({location: pref_locations, category: pref_categories, level: pref_levels})
  }



  render() {
    if (!!this.state.loadingState) {
      return (
        <div>loading</div>
      )
    } else {
      let jobs = this.state.allJobResultsArr
      
      return (
        <div className="job-search-container">
          <JobSearchList jobSearchResults = {jobs} theMuseAppHash = {this.props.job_apps.theMuseAppHash} />
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
