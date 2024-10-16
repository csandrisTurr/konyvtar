const express = require('express');
const app = express();
app.use(express.urlencoded());
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

function query(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values ?? [], function (err, res, fields) {
      if (err) reject(err);

      resolve(res, fields);
    });
  });
}

function q(res, q, values, callback) {
  query(q, values)
    .then((results, fields) => {
      if (callback) return callback(results, fields);

      res.send(results);
    })
    .catch((err) => {
      throw err;
    });
}

app.get('/books', (req, res) => {
  q(res, 'SELECT * FROM `books`');
});

app.post('/books', (req, res) => {
  const { title, release, ISBN } = req.body;

  q(res, 'INSERT INTO `books` (`title`, `release`, `ISBN`) VALUES (?, ?, ?)', [title, release, ISBN]);
});

app.put('/books/:id', (req, res) => {
  const { title, release, ISBN } = req.body;
  const id = req.params.id;

  if (!title || !release || !ISBN) {
    return res.status(400).send();
  }

  q(res, 'UPDATE TABLE `books` SET `title` = ?, `release` = ?, `ISBN` = ? WHERE `id` = ?', [title, release, ISBN, id]);
});

app.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  res.send('Hello World!');
  q(res, 'DELETE FROM `books` WHERE `id` = ?', [id]);
});

app.get('/authors', (req, res) => {
  res.send();
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
