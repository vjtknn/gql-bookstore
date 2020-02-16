const uuid = require("uuid");

const authors = [
  {
    id: "isaac",
    first_name: "Isaac",
    last_name: "Asimov",
    dateOfBirth: new Date("02-01-1920")
  },
  {
    id: "danS",
    first_name: "Dan",
    last_name: "Simmons",
    dateOfBirth: new Date("09-21-1920")
  }
];

const books = [
  {
    id: uuid.v4(),
    title: "Fundation",
    author: {
      id: "isaac"
    },
    pages: 255,
    publishDate: new Date("03/21/1951"),
    publisher: "Gnome press"
  },
  {
    id: uuid.v4(),
    title: "Fundation and Empire",
    author: {
      id: "isaac"
    },
    pages: 247,
    publishDate: new Date("02-21-1952"),
    publisher: "Gnome press"
  },
  {
    id: uuid.v1(),
    title: "Hyperion",
    author: {
      id: "danS"
    },
    publishDate: new Date("01-20-1989"),
    publisher: "Amber"
  }
];

module.exports = {
  authors,
  books
};
