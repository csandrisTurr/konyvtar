const express = require('express');
const app = express();
const port = 3000;

let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '13a_konyvtar',
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    console.log('nem tudtam kapcsolodni az adatbazisra testver');
    require('process').exit(1);
  }
});

// globalis error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('valami nem jo szerintem');
});

app.get('/books', (req, res) => {
  connection.query(
    'SELECT 1 + 1 AS solution',
    function (error, results, fields) {
      if (error) throw error;
    }
  );

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
