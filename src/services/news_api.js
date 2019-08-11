import {NEWS_API_KEY} from './keys'
import {stripJunkWords} from './data_parsers'

const newsURL = (query) => {
  return `https://newsapi.org/v2/everything?q="${query}"&pageSize=100&domains=alleywatch.com,bloomberg.com,businessinsider.com,cnbc.com,dealabs.com,digiday.com,engadget.com,entrepreneur.com,inc.com,mashable.com,nytimes.com,recode.com,seekingalpha.com,techcrunch.com,techdirt.com,techradar.com,thenextweb.com,theverge.com,wsj.com,wired.com,forbes.com&language=en&sortBy=relevancy&apiKey=${NEWS_API_KEY}`
}

// const pressReleaseUrl = (searchParams) => {
//
// }

export const fetchNewsArticles = (companyName, description) => {
  let keywords = stripJunkWords(description)
  let query = companyName + 'AND' + keywords
  console.log(newsURL(companyName.split(" ").join("+")))
  return fetch(newsURL(companyName.split(" ").join("+")))
  .then(results => results.json())
}
