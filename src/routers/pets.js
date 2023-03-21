const express = require('express')
const router = express.Router()
const db = require("../../db");

const pets = require("../routers/pets.js");

router.post('/', async (req, res) => {
    const {name, age, type, breed, microchip} = req.body
    const str = ` ('${name}, ${age}, ${type}, ${breed}, ${microchip}')`
    const values = [name, age, type, breed, microchip]

    const petdata = db.query('INSERT INTO pets (name, age, type, breed, microchip) VALUES' +
    str + 
    'RETURNING *;', values)
    res.status(201).json({ pets: petdata.rows[0] })
})

router.get('/', async (req, res) => {
     const petdata = await db.query("SELECT * FROM pets;")

    res.json({ pets: petdata.rows })
  })



  module.exports = router