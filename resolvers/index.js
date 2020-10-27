export const resolvers = {
  Query: {
    articleBySource: (_, { id, source }, context, info) => {
      console.log('args', id, source)
    },
  },
}
