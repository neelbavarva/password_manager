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

router.get('/getPasswords', async(req, res)=> {
    try{
        const passowrds = await Password.find({"archive": false})
        res.json(passowrds)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/getArchivePasswords', async(req, res)=> {
    try{
        const passowrds = await Password.find({"archive": true})
        res.json(passowrds)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/getNonBankingPasswords', async(req, res)=> {
    try{
        const passowrds = await Password.find({"archive": false, "category" : {$in: ['web-app', 'email', 'other']}})
        res.json(passowrds)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/getNonBankingArchivePasswords', async(req, res)=> {
    try{
        const passowrds = await Password.find({"archive": true, "category" : {$in: ['web-app', 'email', 'other']}})
        res.json(passowrds)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/getBankingPasswords', async(req, res)=> {
    try{
        const passowrds = await Password.find({"archive": false, "category" : "banking"})
        res.json(passowrds)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/getBankingArchivePasswords', async(req, res)=> {
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

router.post('/newPassword', async(req, res) => {
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

router.post('/decryptPassword', async(req, res)=> {
    const cryptr = new Cryptr(req.body.key);
    try{
        res.status(201).json(cryptr.decrypt(req.body.password))
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// PUT

router.put('/editPassword', async(req, res) => {
    Password.findByIdAndUpdate(req.body.id , {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
        archive: req.body.archive
    }).then(data=>{
        console.log("This is Data: "+data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

// DELETE

router.delete('/deletePassword/:id',  async (req, res) => {
    const id = req.params.id;
    try {
      const n = await Password.deleteOne({_id: id})
      res.json({ message: 'Deleted Password' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

module.exports = router