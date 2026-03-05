const express = require("express");
const jwt = require("jsonwebtoken");

const books = require("./booksdb.js");
const { users } = require("./general.js");

const regd_users = express.Router();

// login
regd_users.post("/login", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(403).json({ message: "Invalid Login" });
  }

  const accessToken = jwt.sign({ username }, "access", { expiresIn: "1h" });

  req.session.authorization = {
    accessToken,
  };

  return res.json({ message: "User logged in successfully" });

});

// add review
regd_users.put("/auth/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user.username;

  books[isbn].reviews[username] = review;

  return res.json({ message: "Review added/updated" });

});

// delete review
regd_users.delete("/auth/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;
  const username = req.user.username;

  delete books[isbn].reviews[username];

  return res.json({ message: "Review deleted" });

});

module.exports.authenticated = regd_users;