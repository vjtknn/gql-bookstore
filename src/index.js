const { ApolloServer, gql } = require("apollo-server");
const { books } = require("./data");

const typeDefs = gql`
  enum Status {
    READ
    WATCH_LIST
    NOT_INTERESTED
    UNKNOWN
  }

  type Book {
    id: ID!
    title: String!
    author: Author
    pages: Int
    publishDate: String
    publisher: String
    status: Status
  }

  type Author {
    id: ID!
    first_name: String!
    last_name: String!
    dateOfBirth: String
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
