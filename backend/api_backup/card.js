const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    bankName:{
        type: String,
        required: true
    },
    cardName: {
        type: String
    },
    number:{
        type: String
    },
    validTill: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    visa: {
        type: Boolean
    }
})

module.exports = mongoose.model('Card', cardSchema)