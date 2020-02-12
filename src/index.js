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
    book(id: ID): Book
  }
`;

const resolvers = {
  Query: {
    books: () => {
      return books;
    },
    // (obj, args, ctx, info)
    book: (obj, { id }, ctx, info) => {
      console.log("id:", id);
      const foundBook = books.find(book => book.id === id);
      return foundBook;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`🚀 Server is ready at ${url}`));
