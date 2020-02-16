const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const { Book } = require("./models");
const { PubSub } = require("apollo-server");

const { books, authors } = require("./data");

const pubsub = new PubSub();
const BOOK_ADDED = "BOOK_ADDED";

const resolvers = {
  Query: {
    books: async () => {
      try {
        const allBooks = await Book.find();
        return allBooks;
      } catch (error) {
        console.log("Error ", error);
        return [];
      }
    },
    // (obj, args, ctx, info)
    book: async (obj, { id }, ctx, info) => {
      try {
        const foundBook = await Book.findById(id);
        return foundBook;
      } catch (error) {
        console.log("Error: ", error);
        return {};
      }
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
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.knd === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  }),

  Book: {
    author: (obj, arg, ctx, info) => {
      const filteredAuthor = authors.find(
        author => obj.author.id === author.id
      );
      return filteredAuthor;
    }
  },

  Mutation: {
    addBook: async (obj, { book }, ctx, info) => {
      try {
        const newBook = await Book.create({ ...book });
        pubsub.publish(BOOK_ADDED, { bookAdded: newBook });
        const allBooks = await Book.find();
        return [allBooks];
      } catch (error) {
        console.log("Error ", error);
      }
    },
    removeBook: async (obj, { id }, ctx, info) => {
      try {
        await Book.findByIdAndRemove(id);
        const books = Book.find();
        return books;
      } catch (error) {}
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => {
        pubsub.asyncIterator({ BOOK_ADDED });
      }
    }
  }
};

module.exports = {
  resolvers
};
