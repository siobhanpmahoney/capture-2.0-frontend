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
      .then(json => {
        let newsArticles = []
        let pressReleases = []
        for (let result of json.articles) {
          if (result.source.name == "Businesswire.com" || result.source.name == "Prnewswire.com" || result.source.name == "Reuters") {
            pressReleases.push(result)
          } else {
            newsArticles.push(result)
          }
        }
        return this.setState({
          articles: newsArticles,
          pressReleases: pressReleases
        })
      })
    }
  }


  render() {
    if (this.state.articles == null || this.state.pressReleases == null) {
        return (
          <div className="company-details">
          </div>
        )
      } else {
      return (
        <div className="company-details">
          { this.state.articles.length > 0 &&
            <div className="news-articles-wrappers">
              <h3>Recent News</h3>
              {this.state.articles.map((article) => {
                return <div>{article.title}</div>
              })}
            </div>
          }


          <div className="press-releases-wrappers">
          </div>
        </div>
      )
    }
  }
}

export default CompanyDetails
