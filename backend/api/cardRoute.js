const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const Card = require('./card')

router.get('/getCards', async(req, res)=> {
    try{
        const cards = await Card.find()
        res.json(cards)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})
  

module.exports = router