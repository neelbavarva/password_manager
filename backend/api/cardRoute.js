const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const Card = require('./card')

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

function encrypt(text, password) {
    const cipher = crypto.createCipher(algorithm, password);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encryptedText, password) {
    try {
        const decipher = crypto.createDecipher(algorithm, password);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (err) {
        return "wrong_key";
    }
}

router.get('/getCards', async(req, res)=> {
    try{
        const cards = await Card.find()
        res.json(cards)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.get('/getCards/:id', async(req, res)=> {
    const id = req.params.id;
    try{
        const cards = await Card.findById(id)
        res.json(cards)
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

router.post('/newCard', async(req, res) => {
    const encrypted_validTill = encrypt(req.body.validTill, req.body.key)
    const encrypted_cvv = encrypt(req.body.cvv, req.body.key)
    const card = new Card({
        bankName: req.body.bankName,
        cardName: req.body.cardName,
        number: req.body.number,
        validTill: encrypted_validTill,
        cvv: encrypted_cvv,
        visa: req.body.visa
    })
    try{
        const newCard = await card.save()
        res.status(201).json(newCard)
    } catch(err){
        res.status(400)
    }
})

router.delete('/deleteCard/:id',  async (req, res) => {
    const id = req.params.id;
    try {
      const n = await Card.deleteOne({_id: id})
      res.json({ message: 'Deleted Card' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})
  
  

module.exports = router