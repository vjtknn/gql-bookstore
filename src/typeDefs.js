const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date
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
    publishDate: Date
    publisher: String
    status: Status
  }

  type Author {
    id: ID!
    first_name: String!
    last_name: String!
    dateOfBirth: Date
  }

  type Query {
    books: [Book]
    book(id: ID): Book
  }

  input AuthorInput {
    id: ID
  }

  input BookInput {
    id: ID
    title: String
    pages: Int
    publishDate: Date
    publisher: String
    status: Status
    author: AuthorInput
  }

  type Mutation {
    addBook(book: BookInput): [Book]
    removeBook(id: ID): [Book]
  }

  type Subscription {
    movieAdded: Movie
  }
`;

module.exports = {
  typeDefs
};
