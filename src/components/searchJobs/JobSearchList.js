import React from 'react'
import JobSearchListItem from './JobSearchListItem'



const JobSearchList = (props) => {
  console.log(props.jobSearchResults)
  return (
    <div className="job-search-list">
      {props.jobSearchResults.map((j) => {
        return <JobSearchListItem job={j} key={j.muse_id} />
      })}
    </div>
  )
}

export default JobSearchList
