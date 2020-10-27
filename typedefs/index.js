import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
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
