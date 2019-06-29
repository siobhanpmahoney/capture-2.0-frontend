import React from 'react'
import JobSearchListItem from './JobSearchListItem'



const JobSearchList = (props) => {
  console.log(props.jobSearchResults[0])
  return (
    <div className="job-search-list">
      <h1>Search Results</h1>
      {props.jobSearchResults.map((j) => {
        console.log("HERE IN JOB LIST")
        console.log(j.muse_id)
        return <JobSearchListItem job={j} key={j.muse_id} saved={!!props.theMuseAppHash[j.muse_id]} />
      })}

    </div>
  )
}

export default JobSearchList
