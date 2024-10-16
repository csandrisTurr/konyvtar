const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const port = 3000;

let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '13a_konyvtar',
});

// megprobal csatlakozni adatbazishoz, ha nem tud akkor kiirja hogy mi a baj es kilep a programbol
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
  q(res, 'SELECT * FROM `books`');
});

app.post('/books', (req, res) => {
  const { title, release, ISBN } = req.body;

  if (!title || !release || !ISBN) return res.status(400).send();

  q(res, 'INSERT INTO `books` (`title`, `release`, `ISBN`) VALUES (?, ?, ?)', [title, release, ISBN]);
});

app.put('/books/:id', (req, res) => {
  const { title, release, ISBN } = req.body;
  const id = req.params.id;

  if (!title || !release || !ISBN) return res.status(400).send();

  q(res, 'UPDATE TABLE `books` SET `title` = ?, `release` = ?, `ISBN` = ? WHERE `id` = ?', [title, release, ISBN, id]);
});

app.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  q(res, 'DELETE FROM `books` WHERE `id` = ?', [id]);
});

app.get('/authors', (req, res) => {
  q(res, 'SELECT * FROM `authors`');
});

app.post('/authors', (req, res) => {
  const { name, birth } = req.body;

  if (!name || !birth) return res.status(400).send();

  q(res, 'INSERT INTO `authors` (`name`, `birth`) VALUES (?, ?)', [name, birth]);
});

app.put('/authors/:id', (req, res) => {
  const { name, birth } = req.body;
  const id = req.params.id;

  if (!name || !birth) return res.status(400).send();

  q(res, 'UPDATE TABLE `authors` SET `name` = ?, `birth` = ? WHERE `id` = ?', [name, birth, id]);
});

app.delete('/authors/:id', (req, res) => {
  const id = req.params.id;

  q(res, 'DELETE FROM `books` WHERE `id` = ?', [id]);
});

app.post('/books/:bookId/authors/:authorId', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/** Wrapper function, egy promiset csinal barmilyen sql lekerdezesbol.
 * Lenyege, hogy szebben lehessen irni sql lekerdezeseket.
 *
 * ehelyett:
 * ```
 * connection.query('SELECT * FROM `books` WHERE `id` = ?, [1], function (err, res, fields) {
 *   if (err) { valami ha van error; return };
 *   valami ha nincs error;
 * });
 * ```
 * ez:
 * ```
 * query('SELECT * FROM `books` WHERE ?', [1])
 *   .then((results, fields) => {
 *     valami ha nincs error
 *   })
 *   .catch((err) => {
 *     valami ha van error
 *   });
 * ```
 */
function query(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values ?? [], function (err, res, fields) {
      if (err) reject(err);

      resolve(res, fields);
    });
  });
}

/** Wrapper function arra, hogy szepen es egyszeruen lehessen lekerdezeseket irni.
 * Megszimplabb, mint a "query" function.
 *
 *
 * @param {Response} res lehet null, ha van callback
 * @param {string} q a SQL lekerdezes
 * @param {Array} values egy lista, ami a placeholdereket tartalmazza (? helyere behelyettesito dolgok)
 * @param {(results: Array, fields: Array) => void} callback function ami akkor fut le, ha lefut a lekerdezes
 *
 * ### Pelda:
 * ```
 * q(res, 'SELECT * FROM `books`');
 * q(res, 'SELECT * FROM `books` WHERE `id` = ?', [1]);
 * q(null, 'SELECT * FROM `books` WHERE `id` = ?', [1], (results, fields) => {
 *   console.log('sikeres lekerdezes');
 * });
 * ```
 */
function q(res, q, values, callback) {
  query(q, values)
    .then((results, fields) => {
      if (callback) return callback(results, fields);

      res.status(200).send(results);
    })
    .catch((err) => {
      throw err;
    });
}
