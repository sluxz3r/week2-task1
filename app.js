require('dotenv').config() // Initialize dotenv config

const express = require('express') // Import express
const bodyParser = require('body-parser') // Import body-parses
const app = express() // Create method
const port = process.env.SERVER_PORT // Default PORT

const mysql = require('mysql') // Initialize mysql
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME
}) // MySQL Config

app.listen(port, () => {
  console.log(`\n App listening on port : ${port} \n`)
}) // Create listening app

app.use(bodyParser.json()) // Body parse json
app.use(bodyParser.urlencoded({ extended: false })) // body type

// Place your endpoint below

// Get All Data
app.get('/', (req, res) => {
  const data = 'SELECT * FROM user'
  conn.query(data, (err, result) => {
    if (err) console.log(err)
    res.json(result)
  })
})

// Get data By Location
app.get('/location/:location', (req, res) => {
  const location = req.params.location
  const data = 'SELECT * FROM user WHERE location = ?'
  conn.query(data, location, (err, result) => {
    if (err) console.log(err)
    res.json(result)
  })
})

// Get data By Category
app.get('/category/:category', (req, res) => {
  const category = req.params.category
  const data = 'SELECT * FROM user WHERE category = ?'
  conn.query(data, category, (err, result) => {
    if (err) console.log(err + "\n Data tidak di temukan Bossque.")
    console.log("Monggo datanya Bosque \n")
    res.json(result)
  })
})

// POST data
app.post('/', (req, res) => {
  const data = {
    name: req.body.name,
    writer: req.body.writer,
    location: req.body.location,
    category: req.body.category
  }
  const insert = 'INSERT INTO user SET ?'

  conn.query(insert, data, (err, results) => {
    if (err) console.log(err)
    res.json("Data berhasil di tambah")
  })
})

// Mengupdate data dengan Patch
app.patch('/:userid', (req, res) => {
  const userid = req.params.userid
  const data = {
    name: req.body.name,
    writer: req.body.writer,
    location: req.body.location,
    category: req.body.category
  }
  const insert = 'UPDATE user SET ? WHERE id = ?'

  conn.query(insert, [data, userid], (err, results) => {
    if (err) console.log(err)
    res.json(results)
  })
})

// DELETE data berdasarkan ID
app.delete('/:userid', (req, res) => {
  const userid = req.params.userid
  const data = 'DELETE FROM user WHERE id = ?'
  conn.query(data, userid, (err) => {
    if (err) console.log(err)
    res.json("Data dengan ID : " + userid + " Berhasil dihapus")
  })
})
