const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const Card = require('./card')

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
    const card = new Card({
        bankName: req.body.bankName,
        cardName: req.body.cardName,
        number: req.body.number,
        validTill: encrypt(req.body.validTill, req.body.key),
        cvv: encrypt(req.body.cvv, req.body.key),
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