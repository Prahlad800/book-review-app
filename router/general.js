const express = require('express');
const public_users = express.Router();
const books = require("./booksdb.js");
const axios = require("axios");

let users = [];

// get all books
public_users.get('/', function (req, res) {
  return res.json(books);
});

// get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.json(books[isbn]);
});

// get book by author
public_users.get('/author/:author', function (req, res) {

  const author = req.params.author;

  const result = Object.values(books).filter(
    (book) => book.author === author
  );

  return res.json(result);
});

// get book by title
public_users.get('/title/:title', function (req, res) {

  const title = req.params.title;

  const result = Object.values(books).filter(
    (book) => book.title === title
  );

  return res.json(result);
});

// get review
public_users.get('/review/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  return res.json(books[isbn].reviews);
});

// register user
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

/* ------------ TASK 10-13 (Async/Await with Axios) ------------ */

// get all books using async
public_users.get('/async/books', async function(req,res){

  const response = await axios.get("http://localhost:5000/")
  res.send(response.data)

})

// get by isbn using async
public_users.get('/async/isbn/:isbn', async function(req,res){

  const isbn = req.params.isbn

  const response = await axios.get(`http://localhost:5000/isbn/${isbn}`)

  res.send(response.data)

})

// get by author using async
public_users.get('/async/author/:author', async function(req,res){

  const author = req.params.author

  const response = await axios.get(`http://localhost:5000/author/${author}`)

  res.send(response.data)

})

// get by title using async
public_users.get('/async/title/:title', async function(req,res){

  const title = req.params.title

  const response = await axios.get(`http://localhost:5000/title/${title}`)

  res.send(response.data)

})

module.exports.general = public_users;
module.exports.users = users;