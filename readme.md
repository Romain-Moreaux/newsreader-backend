# Newsreader Backend

**This project as for purpose to show how to use GraphQL to manipulate data and queries to define structure of data returned by endpoints API.**

First of all GraphQL defines the schemas, the structure of your dataset using TypeDefs. Then let Apollo Server know how to interact with this schema thanks to the resolver, it explicitly indicates how to retrieve a particular type of data.  
Finally, Apollo uses a Data sources extended class that sets methods to making requests to external APIs and retrieves data.

The tests has been done with Jest to validate data sources and a custom black-box tests for typedefs and resolvers.

## GraphQL

### Schemas

```graphql
export const typeDefs = gql`
  type Query {
    allArticles: [Article!]!
    allArticlesBySource(source: String!): [Article!]!
    articleBySource(id: ID!, source: String!): Article
    multipleArticlesBySource(ids: [Int!]!, source: String!): [Article!]!
  }

  type Article {
    id: ID!
    title: String
    author: String
    url: String
    time: String
    source: String
  }
`
```

### Resolvers

```graphql
export const resolvers = {
  Query: {
    allArticles: (_, __, { dataSources }) =>
      Promise.all(
        Object.keys(dataSources).map((source) =>
          dataSources[source].getAllArticles()
        )
      ).then((result) => result.reduce((acc, data) => acc.concat(data)), []),
    allArticlesBySource: (_, { source }, { dataSources }) =>
      dataSources[source].getAllArticles(),
    articleBySource: (_, { id, source }, { dataSources }) =>
      dataSources[source].getArticle(id, source),
    multipleArticlesBySource: (_, { ids, source }, { dataSources }) =>
      dataSources[source].getArticlesByIds(ids),
  },
}
```

## Data sources API

_all classes are extended from Apollo RESTDataSource_

### class HackerNewsAPI

base url: `https://hacker-news.firebaseio.com/v0/`

| method           | param                                | description                     |
| ---------------- | ------------------------------------ | ------------------------------- |
| articleReducer   | {id, by, url, time, title}: `Object` | return a friendly formated data |
| getAllArticleIds | none                                 | retrieve all articles ID        |
| getArticle       | articleId: `Number`                  | get an article by ID            |
| getArticlesByIds | articleIds: `Array of Number`        | get several articles by ID      |
| getAllArticles   | none                                 | get all articles                |

### class NewYorkTimesAPI

base url: `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=YOUR-KEY-API`

| method         | param                                | description                     |
| -------------- | ------------------------------------ | ------------------------------- |
| articleReducer | {id, by, url, time, title}: `Object` | return a friendly formated data |
| getAllArticles | none                                 | get all articles                |
