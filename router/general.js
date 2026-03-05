const express = require("express");
const books = require("./booksdb.js");

const public_users = express.Router();

let users = [];

public_users.get("/", function (req, res) {
  return res.json(books);
});

// get book by ISBN
public_users.get("/isbn/:isbn", function (req, res) {

  const isbn = req.params.isbn;

  return res.json(books[isbn]);

});

// get book by author
public_users.get("/author/:author", function (req, res) {

  const author = req.params.author;

  const result = Object.values(books).filter(
    (book) => book.author === author
  );

  return res.json(result);

});

// get book by title
public_users.get("/title/:title", function (req, res) {

  const title = req.params.title;

  const result = Object.values(books).filter(
    (book) => book.title === title
  );

  return res.json(result);

});

// get review
public_users.get("/review/:isbn", function (req, res) {

  const isbn = req.params.isbn;

  return res.json(books[isbn].reviews);

});

// register
public_users.post("/register", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or password missing" });
  }

  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });

  return res.json({ message: "User registered successfully" });

});

module.exports.general = public_users;
module.exports.users = users;