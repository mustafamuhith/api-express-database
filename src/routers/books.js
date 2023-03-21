const express = require('express')
const router = express.Router()
const db = require("../../db");

const books = require("../routers/books.js");


router.post('/', async (req, res) => {
    const {title, type, author, topic, publicationDate, pages} = req.body
    const str = `($1, $2, $3, $4, $5, $6)`
    const values = [title, type, author, topic, publicationDate, pages]

    const bookdata = await db.query('INSERT INTO books ( title, type, author, topic, "publicationDate", pages) VALUES' +
    str +
    "RETURNING *;", values)
    res.status(201).json({ book: bookdata.rows[0] })
  })

router.get('/', async (req, res) => {
     const bookdata = await db.query("SELECT * FROM books;")

    res.json({ books: bookdata.rows })
  })

  router.get('/:id', async (req, res) => {
    const id = req.params.id

    const bookdata = await db.query(`SELECT * FROM books WHERE id = ${req.params.id};`)
    res.status(200).json({ book: bookdata.rows[0] })
  })

  router.put('/:id', async (req, res) => {
    const {title, type, author, topic, publicationDate, pages} = req.body
    const values = [title, type, author, topic, publicationDate, pages]


    const bookdata = await db.query(`UPDATE books SET title = $1, type = $2, author = $3,topic = $4, "publicationDate" = $5, pages =  $6 WHERE id = ${req.params.id} RETURNING *;`, values)
    res.status(201).json({ book: bookdata.rows[0] })
  })

  router.delete('/:id', async (req, res) => {
    const id = req.params.id
   const values = [id]

    const bookdata = await db.query(`DELETE FROM books WHERE id = ${req.params.id} RETURNING *;`)
    res.status(201).json({ book: bookdata.rows[0] })
  })  
module.exports = router
