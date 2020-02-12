const { ApolloServer, gql } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const { books } = require("./data");

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
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "date",
    parseValue(value) {
      // value from client
      return new Date(value);
    },
    serialize(value) {
      // value from server send to client
      return value.getDate();
    },
    parseLiteral(ast) {
      if (ast.Kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  })
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`🚀 Server is ready at ${url}`));
