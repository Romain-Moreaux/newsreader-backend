# Newsreader Backend

**This project as for purpose to show how to use GraphQL to manipulate data and queries to define structure of data returned by endpoints API.**

First of all GraphQL defines the schemas, the structure of your dataset using TypeDefs. Then let Apollo Server know how to interact with this schema thanks to the resolver, it explicitly indicates how to retrieve a particular type of data.
Finally, Apollo uses a Data sources extended class that sets methods to making requests to external APIs and retrieves data.

The tests has been done with Jest to validate data sources and a custom black-box tests for typedefs and resolvers.

## GraphQL
