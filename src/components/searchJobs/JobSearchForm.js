import React from 'react'
import Select from 'react-select'
import {searchOptions} from './searchOptions'

const JobSearchForm = (props) => {

  const options = searchOptions()

  const mappedDefaults = () => {
    let mapped = {}
    Object.keys(props.selectedFilters).map((criteria) => {
      mapped[criteria] = []
      return props.selectedFilters[criteria].map((op) => {
        let obj = {}
        obj["value"] = op
        obj["label"] = op
        return mapped[criteria].push(obj)
      })

    })
    return mapped
  }

  return (
    <div className="job-search-form-container">
      <h3>form container</h3>

    {Object.keys(options).map((criteria) => {
      return (
        <Select
          defaultValue={mappedDefaults()[criteria]}
          isMulti
          isSearchable
          name={criteria}
          options={options[criteria]}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={e => props.formListener(e, criteria)}
          />
      )
    })}


    </div>
  )
}

export default JobSearchForm
