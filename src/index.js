const { ApolloServer, gql } = require("apollo-server");
const { books } = require("./data");

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    pages: Int
    publishDate: String
    publisher: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`🚀 Server is ready at ${url}`));
