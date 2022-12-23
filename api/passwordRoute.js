const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const Password = require('./password')
const Cryptr = require('cryptr');
  
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

router.post('/decryptPassword', async(req, res)=> {
    const cryptr = new Cryptr(req.body.key);
    try{
        res.status(201).json(cryptr.decrypt(req.body.password))
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// POST

router.post('/', async(req, res) => {
    const cryptr = new Cryptr(req.body.key);
    const passowrd = new Password({
        name: req.body.name,
        email: req.body.email,
        category: req.body.category,
        password: cryptr.encrypt(req.body.password),
        archive: req.body.archive
    })
    try{
        const newPassword = await passowrd.save()
        res.status(201).json(newPassword)
    } catch(err){
        res.status(400)
    }
})

// DELETE

router.delete('/:id',  async (req, res) => {
    const id = req.params.id;
    try {
      const n = await Password.deleteOne({_id: id})
      res.json({ message: 'Deleted Password' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

module.exports = router