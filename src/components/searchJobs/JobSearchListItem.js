import React from 'react'
import {withRouter, Link} from 'react-router-dom'

const JobSearchListItem = (props) => {
  debugger
  return (
    <div className="job-search-results-item-wrapper">
      <div className="job-card-main">
        <div className="job-list-item-company">
          {props.job.company.name}
        </div>

        <div className="job-list-item-title">
          {props.job.name}
        </div>

        <div className="job-list-item-location">
           {props.job.locations.map((loc) => loc.name).join(",")}
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

export default JobSearchListItem
