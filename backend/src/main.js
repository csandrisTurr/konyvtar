const express = require('express');
const app = express();
const port = 3000;

app.get('/books', (req, res) => {
  res.send('Hello World!');
});

app.post('/books', (req, res) => {
  res.send('Hello World!');
});

app.put('/books/:id', (req, res) => {
  res.send('Hello World!');
});

app.delete('/books/:id', (req, res) => {
  res.send('Hello World!');
});

app.get('/authors', (req, res) => {
  res.send('Hello World!');
});

app.post('/authors', (req, res) => {
  res.send('Hello World!');
});

app.put('/authors/:id', (req, res) => {
  res.send('Hello World!');
});

app.delete('/authors/:id', (req, res) => {
  res.send('Hello World!');
});

app.post('/books/:bookId/authors/:authorId', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
