import React from 'react'
import Select from 'react-select'
import {searchOptions} from './searchOptions'

const JobSearchForm = () => {

  // define select options
  // const option_values = {
  //   levels: ["Internship", "Entry Level", "Mid Level", "Senior Level"],
  //   categories: ["Account Management", "Business & Strategy", "Creative & Design", "Customer Service", "Data Science", "Editorial", "Education", "Engineering", "Finance", "Fundraising & Development", "Healthcare & Medicine", "HR & Recruiting", "Legal", "Marketing & PR", "Operations", "Project & Product Management", "Retail", "Sales", "Social Media & Community"],
  //   locations: ["Phoenix, AZ", "Berkeley, CA",  "Cupertino, CA", "Los Angeles, CA", "Mountain View, CA", "Oakland, CA", "San Diego, CA", "San Francisco, CA", "San Jose, CA", "San Mateo, CA", "Santa Ana, CA", "Santa Barbara, CA", "Santa Clara, CA", "Santa Cruz, CA", "Santa Monica, CA", "Washington, DC", "Dover, DE", "Atlanta, GA", "Athens, GA", "Savannah, GA", "Minneapolis, MN", "Saint Paul, MN", "Charlotte, NC", "Durham, NC", "Greensboro, NC", "Raleigh, NC", "Las Vegas, NV", "Brooklyn, NY", "New York, NY", "Saratoga Springs, NY", "White Plains, NY", "Portland, OR", "Philadelphia, PA", "Pittsburgh, PA", "Charleston, SC", "Columbia, SC", "Greenville, SC", "Greenwood, SC", "Nashville, TN", "Austin, TX", "Dallas, TX", "Houston, TX", "San Antonio, TX", "London, United Kingdom", "Arlington, VA", "Richmond, VA", "Burlington, VT", "Olympia, WA", "Seattle, WA", "Tacoma, WA", "Vancouver, WA"]
  // }


  const options = searchOptions()

  return (
    <div className="job-search-form-container">
      <h3>form container</h3>

    {Object.keys(options).map((criteria) => {
      return (
        <Select
          isMulti
          isSearchable
          name={criteria}
          options={options[criteria]}
          className="basic-multi-select"
          classNamePrefix="select"
          />
      )
    })}


    </div>
  )
}

export default JobSearchForm
