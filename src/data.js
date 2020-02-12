const uuid = require("uuid");

const isaacAsimov = {
  id: uuid.v4(),
  first_name: "Isaac",
  last_name: "Asimov",
  dateOfBirth: new Date("02-01-1920")
};

const books = [
  {
    id: uuid.v4(),
    title: "Fundation",
    author: {
      ...isaacAsimov
    },
    pages: 255,
    publishDate: new Date("21-03-1951"),
    publisher: "Gnome press"
  },
  {
    id: uuid.v4(),
    title: "Fundation and Empire",
    author: {
      ...isaacAsimov
    },
    pages: 247,
    publishDate: new Date("21-03-1952"),
    publisher: "Gnome press"
  }
];

module.exports = {
  books
};
