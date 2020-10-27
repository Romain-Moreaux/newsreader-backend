import { RESTDataSource } from 'apollo-datasource-rest'

export class NewYorkTimesAPI extends RESTDataSource {
  constructor() {
    super()
    this.apiKey = '79LRBIRpu85EJQhAXSTt1pwf9AHbHDxV'
  }
  articleReducer({ id, byline, url, published_date, title } = {}) {
    return {
      id: `nyt-${id}`,
      title,
      author: byline,
      url,
      time: published_date,
      source: 'New York Times',
    }
  }

  async getAllArticles() {
    const result = await this.get(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${this.apiKey}`
    )
    return result?.results?.map((article) => this.articleReducer(article))
  }
}
