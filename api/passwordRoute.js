const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const Password = require('./password')
const Cryptr = require('cryptr');

// encryption - decryption algos

const support_string_characters = "abcdefghijklmnopqrstuvwxyz";
const support_string_numbers = "0123456789";
const support_string_cap_characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const support_string_sp_characters = "!@#$%^&*()";
const mod = 5;

function encrypt(password,key){
    let encrypted_string = ""
    let encrypted_key = ""

    for(let i=0;i<password.length;i++){
        encrypted_string += i%2==0 ? support_string_sp_characters.charAt(i%9) : support_string_characters.charAt(i%25)
        encrypted_string += i%2==0 ? support_string_cap_characters.charAt(i%25) :  support_string_numbers.charAt(i%9);
        encrypted_string += String.fromCharCode(password.charAt(i).charCodeAt(0) + 4);
    }

    for(let i=0;i<key.length;i++){
        encrypted_key += i%2==0 ? support_string_sp_characters.charAt(i%9) : support_string_characters.charAt(i%25)
        encrypted_key += i%2==0 ? support_string_cap_characters.charAt(i%25) :  support_string_numbers.charAt(i%9);
        encrypted_key += String.fromCharCode(key.charAt(i).charCodeAt(0) + 4);
    }

    encrypted_string += encrypted_key;
    return encrypted_string;
}

function decrypt(password,key){
    let decrypted_string = "";
    let decrypted_key = "";
    let key_length = (key.length-1)*3 + 1;

    for(let i=0;i<password.length-key_length;i++){
        if((i+1)%3==0){
            decrypted_string += String.fromCharCode(password.charAt(i).charCodeAt(0) - 4);
        }
    }

    for(let i=password.length-key_length;i<password.length;i++){
        if((i+1)%3==0){
            decrypted_key += String.fromCharCode(password.charAt(i).charCodeAt(0) - 4);
        }
    }

    console.log(decrypted_key)

    return decrypted_key==key ? decrypted_string : "wrong_key";
}
  
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
    const encrypted_string = encrypt(req.body.password, req.body.key)
    console.log(encrypted_string)
    const passowrd = new Password({
        name: req.body.name,
        email: req.body.email,
        category: req.body.category,
        password: encrypted_string,
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
    const decrypted_string = decrypt(req.body.password, req.body.key)
    try{
        res.status(201).json(decrypted_string)
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