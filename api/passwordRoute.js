const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const Password = require('./password')
  
// GET
router.get('/getAllPasswords', async(req, res)=> {
    try{
        const passowrds = await Password.find()
        res.json(passowrds)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/getAllArchivePasswords', async(req, res)=> {
    try{
        const passowrds = await Password.find({"archive": true, "category" : {$in: ['web-app', 'email', 'other']}})
        res.json(passowrds)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/getAllBankingPasswords', async(req, res)=> {
    try{
        const passowrds = await Password.find({"archive": false, "category" : "banking"})
        res.json(passowrds)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/getAllBankingArchivePasswords', async(req, res)=> {
    try{
        const passowrds = await Password.find({"archive": true, "category" : "banking"})
        res.json(passowrds)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/:id', async(req, res)=> {
    const id = req.params.id;
    try{
        const passowrds = await Password.findById(id)
        res.json(passowrds)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// POST

module.exports = router