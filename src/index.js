const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

mongoose.connect("mongodb://localhost/gql-bookstore", {
  useNewUrlParser: true
});

const db = mongoose.connection;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

db.on("error", console.error.bind(console, "Connection error"));
db.on("open", function() {
  console.log("Connected to db");
  server
    .listen({ port: process.env.PORT || 4000 })
    .then(({ url }) => console.log(`🚀 Server is ready at ${url}`));
});
