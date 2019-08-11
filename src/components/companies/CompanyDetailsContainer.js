import React from 'react'
import {fetchNewsArticles} from '../../services/news_api'

class CompanyDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: null,
      pressReleases: null
    }
  }

  componentDidMount() {
    if (!!this.props.company) {
      fetchNewsArticles(this.props.company.name, this.props.company.description)
      .then(json => console.log(json))
    }
  }


  render() {
    return (
      <div className="company-details">
      </div>
    )
  }
}

export default CompanyDetails
